import type {
    ActionFunctionArgs,
    LoaderFunctionArgs,
    MetaFunction
} from '@remix-run/node';
import { json, redirect } from '@remix-run/node';
import { Form, Link, useActionData, useSearchParams } from '@remix-run/react';
import { useEffect, useRef } from 'react';
import { Button } from '~/components/Button';
import { Input } from '~/components/Input';
import { Label } from '~/components/Label';
import { SiteLayout } from '~/components/SiteLayout';

import { createUser, getUserByEmail } from '~/models/user.server';
import { createUserSession, getUserId } from '~/session.server';
import { safeRedirect, validateEmail } from '~/utils/general.server';

export const loader = async ({ request }: LoaderFunctionArgs) => {
    const userId = await getUserId(request);
    if (userId) return redirect('/app/dashboard');
    return json({});
};

export const action = async ({ request }: ActionFunctionArgs) => {
    const formData = await request.formData();
    const email = String(formData.get('email'));
    const password = String(formData.get('password'));
    const redirectTo = safeRedirect(formData.get('redirectTo'), '/');

    if (!validateEmail(email)) {
        return json(
            { errors: { email: 'Email is invalid', password: null } },
            { status: 400 }
        );
    }

    if (typeof password !== 'string' || password.length === 0) {
        return json(
            { errors: { email: null, password: 'Password is required' } },
            { status: 400 }
        );
    }

    if (password.length < 8) {
        return json(
            { errors: { email: null, password: 'Password is too short' } },
            { status: 400 }
        );
    }

    const existingUser = await getUserByEmail(email);
    if (existingUser) {
        return json(
            {
                errors: {
                    email: 'A user already exists with this email',
                    password: null
                }
            },
            { status: 400 }
        );
    }

    const user = await createUser(email, password);

    return createUserSession({
        redirectTo,
        remember: false,
        request,
        userId: user.id
    });
};

export const meta: MetaFunction = () => [{ title: 'Sign Up' }];

export default function JoinRoute() {
    const [searchParams] = useSearchParams();
    const redirectTo = searchParams.get('redirectTo') ?? undefined;
    const actionData = useActionData<typeof action>();
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (actionData?.errors?.email) {
            emailRef.current?.focus();
        } else if (actionData?.errors?.password) {
            passwordRef.current?.focus();
        }
    }, [actionData]);

    return (
        <SiteLayout>
            <div className="mx-auto w-full max-w-md px-8 pt-8">
                <h1 className="font-bold text-4xl mb-8">Join</h1>
                <Form method="POST" className="space-y-6">
                    <div>
                        <Label htmlFor="email">Email address</Label>
                        <div className="mt-1">
                            <Input
                                id="email"
                                required
                                // eslint-disable-next-line jsx-a11y/no-autofocus
                                autoFocus={true}
                                name="email"
                                type="email"
                                autoComplete="email"
                                aria-invalid={
                                    actionData?.errors?.email ? true : undefined
                                }
                                aria-describedby="email-error"
                            />
                            {actionData?.errors?.email ? (
                                <div
                                    className="pt-1 text-red-700"
                                    id="email-error"
                                >
                                    {actionData.errors.email}
                                </div>
                            ) : null}
                        </div>
                    </div>

                    <div>
                        <Label htmlFor="password">Password</Label>
                        <div className="mt-1">
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="new-password"
                                aria-invalid={
                                    actionData?.errors?.password
                                        ? true
                                        : undefined
                                }
                                aria-describedby="password-error"
                            />
                            {actionData?.errors?.password ? (
                                <div
                                    className="pt-1 text-red-700"
                                    id="password-error"
                                >
                                    {actionData.errors.password}
                                </div>
                            ) : null}
                        </div>
                    </div>

                    <input type="hidden" name="redirectTo" value={redirectTo} />
                    <Button type="submit">Create Account</Button>
                    <div className="flex items-center justify-center">
                        <div className="text-center text-sm text-gray-500">
                            Already have an account?{' '}
                            <Link
                                className="text-amber-500"
                                to={{
                                    pathname: '/login',
                                    search: searchParams.toString()
                                }}
                            >
                                Log in
                            </Link>
                        </div>
                    </div>
                </Form>
            </div>
        </SiteLayout>
    );
}

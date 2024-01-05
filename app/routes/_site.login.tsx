import type {
    ActionFunctionArgs,
    LoaderFunctionArgs,
    MetaFunction
} from '@remix-run/node';
import { json, redirect } from '@remix-run/node';
import { Form, Link, useActionData, useSearchParams } from '@remix-run/react';
import { useEffect, useRef } from 'react';
import { Button } from '~/components/Button';
import { Checkbox } from '~/components/Checkbox';
import { Input } from '~/components/Input';
import { Label } from '~/components/Label';
import { SiteLayout } from '~/components/SiteLayout';
import { TEXT_LINK_COLORS } from '~/constants';

import { verifyLogin } from '~/models/user.server';
import { createUserSession, getUserId } from '~/session.server';
import { safeRedirect, validateEmail } from '~/utils/general.server';

export const loader = async ({ request }: LoaderFunctionArgs) => {
    const userId = await getUserId(request);
    if (userId) return redirect('/dashboard');

    return json({});
};

export const action = async ({ request }: ActionFunctionArgs) => {
    const formData = await request.formData();
    const email = formData.get('email');
    const password = formData.get('password');
    const redirectTo = safeRedirect(formData.get('redirectTo'), '/dashboard');
    const remember = formData.get('remember');

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

    const user = await verifyLogin(email, password);

    if (!user) {
        return json(
            { errors: { email: 'Invalid email or password', password: null } },
            { status: 400 }
        );
    }

    return createUserSession({
        redirectTo,
        remember: remember === 'on' ? true : false,
        request,
        userId: user.id
    });
};

export const meta: MetaFunction = () => [{ title: 'Login' }];

export default function LoginPage() {
    const [searchParams] = useSearchParams();
    const redirectTo = searchParams.get('redirectTo') || '/';
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
            <div className="flex flex-col justify-center">
                <div className="mx-auto w-full max-w-md p-8">
                    <h1 className="font-bold text-4xl mb-8">Login</h1>
                    <Form method="post" className="space-y-6">
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
                                        actionData?.errors?.email
                                            ? true
                                            : undefined
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
                                    autoComplete="current-password"
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

                        <input
                            type="hidden"
                            name="redirectTo"
                            value={redirectTo}
                        />
                        <Button type="submit">Log in</Button>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <Checkbox id="remember" name="remember" />
                                <Label htmlFor="remember" className="mb-0">
                                    Remember me
                                </Label>
                            </div>
                            <div className="text-center text-sm text-gray-500">
                                Don&apos;t have an account?{' '}
                                <Link
                                    className={TEXT_LINK_COLORS}
                                    to={{
                                        pathname: '/join',
                                        search: searchParams.toString()
                                    }}
                                >
                                    Sign up
                                </Link>
                            </div>
                        </div>
                    </Form>
                </div>
            </div>
        </SiteLayout>
    );
}

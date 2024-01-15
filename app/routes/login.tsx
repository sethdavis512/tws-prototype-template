import { useEffect, useRef } from 'react';
import type {
    ActionFunctionArgs,
    LoaderFunctionArgs,
    MetaFunction
} from '@remix-run/node';
import { json, redirect } from '@remix-run/node';
import { Form, Link, useActionData, useSearchParams } from '@remix-run/react';
import { Submission, useForm } from '@conform-to/react';
import { parse } from '@conform-to/zod';
import { z } from 'zod';

import { Button } from '~/components/Button';
import { Checkbox } from '~/components/Checkbox';
import { Input } from '~/components/Input';
import { Label } from '~/components/Label';
import { SiteLayout } from '~/components/SiteLayout';
import { TEXT_LINK_COLORS, Urls } from '~/constants';

import { verifyLogin } from '~/models/user.server';
import { createUserSession, getUserId } from '~/session.server';
import { safeRedirect } from '~/utils/general.server';

type LoginFormSubmission = Submission<{ email: string; password: string }>;

const schema = z.object({
    email: z
        .string({ required_error: 'Email is required' })
        .email('Email is invalid'),
    password: z.string({ required_error: 'Password is required' })
});

export const loader = async ({ request }: LoaderFunctionArgs) => {
    const userId = await getUserId(request);
    if (userId) return redirect(Urls.DASHBOARD);

    return json({});
};

export const action = async ({ request }: ActionFunctionArgs) => {
    const formData = await request.formData();
    const submission = parse(formData, { schema });

    if (submission.intent !== 'submit' || !submission.value) {
        return json(submission);
    }

    const redirectTo = safeRedirect(formData.get('redirectTo'), Urls.DASHBOARD);
    const remember = formData.get('remember');

    const user = await verifyLogin(
        submission.value.email,
        submission.value.password
    );

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
    const lastSubmission = useActionData<typeof action>();

    const [form, { email, password }] = useForm({
        lastSubmission: lastSubmission as LoginFormSubmission,
        onValidate({ formData }) {
            return parse(formData, { schema });
        }
    });

    const [searchParams] = useSearchParams();
    const redirectTo = searchParams.get('redirectTo') || '/';

    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (email.error) {
            emailRef.current?.focus();
        } else if (password.error) {
            passwordRef.current?.focus();
        }
    }, [email.error, password.error]);

    return (
        <SiteLayout>
            <div className="col-span-full">
                <div className="flex flex-col justify-center">
                    <div className="mx-auto w-full max-w-md p-8">
                        <h1 className="font-bold text-4xl mb-8">Login</h1>
                        <Form
                            method="post"
                            className="space-y-6"
                            {...form.props}
                        >
                            <div>
                                <Label htmlFor="email">Email address</Label>
                                <div className="mt-1">
                                    <Input
                                        id="email"
                                        required
                                        // eslint-disable-next-line jsx-a11y/no-autofocus
                                        autoFocus
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        aria-invalid={
                                            email.error ? true : undefined
                                        }
                                        aria-describedby="email-error"
                                    />
                                    {email.error ? (
                                        <div
                                            className="pt-1 text-red-700"
                                            id="email-error"
                                        >
                                            {email.error}
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
                                            password.error ? true : undefined
                                        }
                                        aria-describedby="password-error"
                                    />
                                    {password.error ? (
                                        <div
                                            className="pt-1 text-red-700"
                                            id="password-error"
                                        >
                                            {password.error}
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
                                            pathname: Urls.JOIN,
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
            </div>
        </SiteLayout>
    );
}

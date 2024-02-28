import type { ActionFunctionArgs, LoaderFunctionArgs } from '@remix-run/node';
import { json, redirect } from '@remix-run/node';
import {
    Form,
    isRouteErrorResponse,
    useActionData,
    useLoaderData,
    useRouteError
} from '@remix-run/react';
import { z } from 'zod';

import { Button } from '~/components/Button';
import { Input } from '~/components/Input';
import { Label } from '~/components/Label';
import { Urls } from '~/constants';
import { createProfile, getProfileByUsername } from '~/models/profile.server';
import { getSupabaseWithSessionAndHeaders } from '~/utils/supabase.server';
import invariant from 'tiny-invariant';
import { getUserDataFromSession } from '~/utils/general.server';

// Define a schema for your form
export const profileSchema = z.object({
    firstName: z.string().min(3).max(25),
    lastName: z.string().min(3).max(25),
    username: z.string().min(3).max(25)
});

export const loader = async ({ request }: LoaderFunctionArgs) => {
    const { headers, serverSession, supabase } =
        await getSupabaseWithSessionAndHeaders({
            request
        });

    if (!serverSession) {
        return redirect(Urls.LOGIN, { headers });
    }

    const { data: profile, error } = await getProfileByUsername({
        client: supabase,
        username: 'sethdavis512'
    });

    invariant(profile, 'Profile does not exist');

    return json({ profile, error }, { headers });
};

export async function action({ request }: ActionFunctionArgs) {
    const { headers, supabase, serverSession } =
        await getSupabaseWithSessionAndHeaders({
            request
        });
    invariant(serverSession, 'Server session does not exist');

    const formData = await request.formData();
    const payload = Object.fromEntries(formData);
    const result = profileSchema.safeParse(payload);
    const parseFails = !result.success;

    if (parseFails) {
        const error = result.error.flatten();

        return json(
            {
                payload,
                formErrors: error.formErrors,
                fieldErrors: error.fieldErrors
            },
            { headers }
        );
    }

    const { userId } = await getUserDataFromSession(serverSession);

    if (payload.intent === 'profile') {
        const { data, error } = await createProfile({
            client: supabase,
            username: result.data.username,
            firstName: result.data.firstName,
            lastName: result.data.lastName,
            userId
        });

        if (error) {
            return json(
                {
                    payload,
                    formErrors: [error.message ?? 'Something went wrong...']
                },
                { headers }
            );
        }

        return json({ payload, profile: data, formErrors: [] }, { headers });
    }

    return null;
}

export default function ProfileRoute() {
    const { profile } = useLoaderData<typeof loader>();
    const [firstProfile] = profile;

    const result = useActionData<typeof action>();

    return (
        <div className="p-8">
            <h1 className="text-4xl mb-4">Profile</h1>
            {result?.formErrors && <div>{result?.formErrors}</div>}
            <Form>
                <Label htmlFor="firstName">First name</Label>
                <Input
                    id="firstName"
                    type="text"
                    name="firstName"
                    className="mb-8"
                    defaultValue={
                        firstProfile.first_name ||
                        String(result?.payload.firstName)
                    }
                />
                <Label htmlFor="lastName">Last name</Label>
                <Input
                    id="lastName"
                    type="text"
                    name="lastName"
                    className="mb-8"
                    defaultValue={
                        firstProfile.last_name ||
                        String(result?.payload.lastName)
                    }
                />
                <Label htmlFor="username">Username</Label>
                <Input
                    id="username"
                    type="text"
                    name="username"
                    className="mb-8"
                    defaultValue={
                        firstProfile.username ||
                        String(result?.payload.username)
                    }
                />
                <Button type="submit" name="intent" value="profile">
                    Save profile
                </Button>
            </Form>
        </div>
    );
}

export function ErrorBoundary() {
    const error = useRouteError();

    if (isRouteErrorResponse(error)) {
        return (
            <>
                <h1>
                    {error.status} {error.statusText}
                </h1>
                <p>{error.data}</p>
            </>
        );
    } else if (error instanceof Error) {
        return (
            <>
                <h1>Error</h1>
                <p>{error.message}</p>
                <p>The stack trace is:</p>
                <pre>{error.stack}</pre>
            </>
        );
    } else {
        return <h1>Unknown Error</h1>;
    }
}

import type { LoaderFunctionArgs, MetaFunction } from '@remix-run/node';
import { json, redirect } from '@remix-run/node';
import { useOutletContext } from '@remix-run/react';

import { Button } from '~/components/Button';
import { SiteLayout } from '~/components/SiteLayout';
import { Urls } from '~/constants';

import { getSupabaseWithSessionAndHeaders } from '~/utils/supabase.server';
import { SupabaseOutletContext } from '~/utils/supabase';

export const meta: MetaFunction = () => [{ title: 'Login' }];

export const loader = async ({ request }: LoaderFunctionArgs) => {
    const { headers, serverSession } = await getSupabaseWithSessionAndHeaders({
        request
    });

    if (serverSession) {
        return redirect(Urls.DASHBOARD, { headers });
    }

    return json({ success: true }, { headers });
};

export default function LoginPage() {
    const { supabase, domainUrl } = useOutletContext<SupabaseOutletContext>();
    const redirectTo = `${domainUrl}/api/auth/callback`;

    const handleGitHubSignIn = async () => {
        await supabase.auth.signInWithOAuth({
            provider: 'github',
            options: {
                redirectTo
            }
        });
    };

    const handleGoogleSignIn = async () => {
        await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo
            }
        });
    };

    return (
        <SiteLayout>
            <div className="col-span-full">
                <div className="flex flex-col justify-center">
                    <div className="mx-auto w-full max-w-md p-8">
                        <h1 className="font-bold text-4xl mb-8">Login</h1>
                        <div className="flex flex-col gap-3">
                            <Button onPress={handleGitHubSignIn}>
                                Sign in with GitHub
                            </Button>
                            <Button onPress={handleGoogleSignIn}>
                                Sign in with Google
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </SiteLayout>
    );
}

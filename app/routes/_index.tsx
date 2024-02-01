import { LoaderFunctionArgs, json, redirect } from '@remix-run/node';
import { useOutletContext } from '@remix-run/react';
import { LinkButton } from '~/components/LinkButton';
import { SiteLayout } from '~/components/SiteLayout';
import { Urls } from '~/constants';
import { SupabaseOutletContext } from '~/utils/supabase';
import { getSupabaseWithSessionAndHeaders } from '~/utils/supabase.server';

export async function loader({ request }: LoaderFunctionArgs) {
    const { headers, serverSession } = await getSupabaseWithSessionAndHeaders({
        request
    });

    if (serverSession) {
        return redirect(Urls.DASHBOARD, { headers });
    }

    return json({ success: true }, { headers });
}

export default function IndexRoute() {
    const { isLoggedIn } = useOutletContext<SupabaseOutletContext>();

    return (
        <SiteLayout>
            <div className="col-span-full relative">
                <div className="relative flex flex-col items-center justify-center h-full">
                    <h1 className="text-primary-500 dark:text-primary-500 font-bold text-5xl md:text-8xl drop-shadow-2xl mb-10">
                        {`Welcome`}
                    </h1>
                    {isLoggedIn ? (
                        <LinkButton to={Urls.DASHBOARD}>
                            Go to dashboard
                        </LinkButton>
                    ) : (
                        <div className="flex gap-2">
                            <LinkButton to={Urls.JOIN}>Sign up</LinkButton>
                            <LinkButton to={Urls.LOGIN}>Log in</LinkButton>
                        </div>
                    )}
                </div>
            </div>
        </SiteLayout>
    );
}

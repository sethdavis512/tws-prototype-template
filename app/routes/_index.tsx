import { LoaderFunctionArgs, json, redirect } from '@remix-run/node';
import { SiteLayout } from '~/components/SiteLayout';
import { Urls } from '~/constants';
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
    return (
        <SiteLayout>
            <div className="col-span-full relative">
                <div className="relative flex flex-col items-center justify-center h-full">
                    <h1 className="text-primary-500 dark:text-primary-500 font-bold text-5xl md:text-8xl drop-shadow-2xl mb-10">
                        {`Welcome`}
                    </h1>
                </div>
            </div>
        </SiteLayout>
    );
}

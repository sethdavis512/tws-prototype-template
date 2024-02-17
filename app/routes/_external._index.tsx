import { LoaderFunctionArgs, json, redirect } from '@remix-run/node';
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
        <div className="col-span-full">
            <div className="flex flex-col items-center justify-center h-full">
                <h1 className="text-black dark:text-white font-bold text-5xl md:text-8xl drop-shadow-2xl mb-10">
                    {`Welcome`}
                </h1>
            </div>
        </div>
    );
}

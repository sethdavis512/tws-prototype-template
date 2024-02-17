import { LoaderFunctionArgs, json, redirect } from '@remix-run/node';
import { Outlet } from '@remix-run/react';
import { LeftNav } from '~/components/LeftNav';
import { Urls } from '~/constants';
import { getSupabaseWithSessionAndHeaders } from '~/utils/supabase.server';

export async function loader({ request }: LoaderFunctionArgs) {
    const { headers, serverSession } = await getSupabaseWithSessionAndHeaders({
        request
    });

    if (!serverSession) {
        return redirect(Urls.LOGIN, { headers });
    }

    return json({ success: true }, { headers });
}

export default function DashboardRoute() {
    return (
        <>
            <div className="px-4 col-span-12 md:col-span-4 lg:col-span-3">
                <LeftNav />
            </div>
            <div className="py-4 md:py-0 col-span-12 md:col-span-8 lg:col-span-9">
                <Outlet />
            </div>
        </>
    );
}

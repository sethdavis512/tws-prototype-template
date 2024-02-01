import { LoaderFunctionArgs, json, redirect } from '@remix-run/node';
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
    // const {} = useLoaderData<typeof loader>();

    return (
        <div className="p-4">
            <h1 className="text-4xl mb-4 font-bold">Dashboard</h1>
        </div>
    );
}

import { LoaderFunctionArgs, json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import invariant from 'tiny-invariant';
import { getProfileById } from '~/models/profile.server';
import { getUser } from '~/session.server';

export async function loader({ request }: LoaderFunctionArgs) {
    const user = await getUser(request);
    invariant(user?.profileId, 'Profile does not exist');

    const profile = await getProfileById(user.profileId);

    return json({
        profile
    });
}

export default function DashboardRoute() {
    const { profile } = useLoaderData<typeof loader>();

    return (
        <div className="p-4">
            <h1 className="text-4xl mb-4 font-bold">Dashboard</h1>
            {profile?.firstName && <p>Hi {profile?.firstName} 👋🏻</p>}
        </div>
    );
}

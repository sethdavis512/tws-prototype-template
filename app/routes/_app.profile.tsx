import type { LoaderFunctionArgs } from '@remix-run/node';
import { json, useLoaderData } from '@remix-run/react';
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

function ProfileListItem({ label, value }: { label: string; value: string }) {
    return (
        <li className="inline-flex gap-2 items-center border-b border-b-zinc-600 pt-2 pb-4">
            {label}
            {':'}
            <div className="rounded-xl bg-zinc-200 dark:bg-zinc-600 py-1 px-2">
                {value}
            </div>
        </li>
    );
}

export default function ProfileRoute() {
    const { profile } = useLoaderData<typeof loader>();

    if (!profile) {
        return <p>No profile available.</p>;
    }

    return (
        <div className="px-4">
            <h1 className="text-4xl mb-4 font-bold">Profile</h1>
            <ul className="flex flex-col gap-4">
                <ProfileListItem label="Username" value={profile.username} />
                {profile.firstName && (
                    <ProfileListItem
                        label="First name"
                        value={profile.firstName}
                    />
                )}
                {profile.lastName && (
                    <ProfileListItem
                        label="Last name"
                        value={profile.lastName}
                    />
                )}
                {profile.bio && (
                    <ProfileListItem label="Bio" value={profile.bio} />
                )}
            </ul>
        </div>
    );
}

import { useOutletContext } from '@remix-run/react';
import { LinkButton } from '~/components/LinkButton';
import { SiteLayout } from '~/components/SiteLayout';
import { OutletContextValue } from '~/root';

export default function IndexRoute() {
    const { user } = useOutletContext<OutletContextValue>();
    const isLoggedIn = user && user.id;

    return (
        <SiteLayout>
            <div className="col-span-full relative">
                <div className="relative flex flex-col items-center justify-center h-full">
                    <h1 className="text-primary-500 dark:text-primary-500 font-bold text-5xl md:text-8xl drop-shadow-2xl mb-10">
                        {`Howdy y'all 🤠`}
                    </h1>
                    {isLoggedIn ? (
                        <LinkButton to="/dashboard">Go to dashboard</LinkButton>
                    ) : (
                        <div className="flex gap-2">
                            <LinkButton to="/join">Sign up</LinkButton>
                            <LinkButton to="/login">Log in</LinkButton>
                        </div>
                    )}
                </div>
            </div>
        </SiteLayout>
    );
}

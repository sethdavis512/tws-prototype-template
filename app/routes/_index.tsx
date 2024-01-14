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
                <div className="absolute top-0 right-0 bottom-0 left-0 bg-cover bg-center bg-[url('https://res.cloudinary.com/setholito/image/upload/v1650167213/unsplash/mj-tangonan-wKfTNWaDYgs-unsplash.jpg')]"></div>
                <div className="absolute top-0 right-0 bottom-0 left-0 bg-gray-100 dark:bg-gray-900 opacity-85"></div>
                <div className="relative flex flex-col items-center justify-center z-10 h-full">
                    <h1 className="text-amber-500 dark:text-white font-bold text-5xl md:text-8xl drop-shadow-2xl mb-10">
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

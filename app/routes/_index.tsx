import { SiteLayout } from '~/components/SiteLayout';

export default function IndexRoute() {
    return (
        <SiteLayout>
            <div className="col-span-full relative">
                <div className="absolute top-0 right-0 bottom-0 left-0 bg-cover bg-center bg-[url('https://res.cloudinary.com/setholito/image/upload/v1650167213/unsplash/mj-tangonan-wKfTNWaDYgs-unsplash.jpg')]"></div>
                <div className="absolute top-0 right-0 bottom-0 left-0 bg-gray-900 opacity-85"></div>
                <div className="relative flex items-center justify-center z-10 h-full">
                    <h1 className="text-white font-bold text-5xl md:text-8xl font-['Leckerli_One'] drop-shadow-xl">
                        {`Howdy y'all 🤠`}
                    </h1>
                </div>
            </div>
        </SiteLayout>
    );
}

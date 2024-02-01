// import { LoaderFunctionArgs } from '@remix-run/node';
import { Outlet } from '@remix-run/react';
import { Footer } from '~/components/Footer';
import { Grid } from '~/components/Grid';
import { Header } from '~/components/Header';
import { LeftNav } from '~/components/LeftNav';

export default function AppRoute() {
    return (
        <Grid className="bg-gray-100 dark:bg-gray-800 h-screen grid-rows-[auto_auto_1fr_auto] md:grid-rows-[auto_1fr_auto]">
            <Header />
            <div className="px-4 col-span-12 md:col-span-4 lg:col-span-3">
                <LeftNav />
            </div>
            <div className="py-4 md:py-0 col-span-12 md:col-span-8 lg:col-span-9">
                <Outlet />
            </div>
            <Footer />
        </Grid>
    );
}

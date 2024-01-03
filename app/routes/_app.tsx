import { LoaderFunctionArgs } from '@remix-run/node';
import { Outlet } from '@remix-run/react';
import { Footer } from '~/components/Footer';
import { Grid } from '~/components/Grid';
import { Header } from '~/components/Header';
import { LeftNav } from '~/components/LeftNav';
import { requireUserId } from '~/session.server';

export async function loader({ request }: LoaderFunctionArgs) {
    await requireUserId(request);
    return null;
}

export default function AppRoute() {
    return (
        <Grid className="bg-zinc-100 dark:bg-zinc-800 h-screen grid-rows-[auto_auto_1fr_auto] md:grid-rows-[auto_1fr_auto]">
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

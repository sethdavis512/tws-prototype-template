import { Outlet } from '@remix-run/react';
import { Footer } from '~/components/Footer';
import { Grid } from '~/components/Grid';
import { Header } from '~/components/Header';

export default function SiteRoute() {
    return (
        <Grid className="bg-zinc-100 dark:bg-zinc-800 h-screen grid-rows-[auto_1fr_auto]">
            <Header />
            <div className="col-span-full md:col-start-2 md:col-span-10">
                <Outlet />
            </div>
            <Footer />
        </Grid>
    );
}

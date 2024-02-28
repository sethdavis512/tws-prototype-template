import { Outlet } from '@remix-run/react';

import { Footer } from '~/components/Footer';
import { Grid } from '~/components/Grid';
import { Header } from '~/components/Header';

export default function InternalLayoutRoute() {
    return (
        <Grid className="bg-gray-100 dark:bg-gray-800 h-screen grid-rows-[auto_1fr_auto]">
            <Header />
            <Outlet />
            <Footer />
        </Grid>
    );
}

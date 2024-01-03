import type { ReactNode } from 'react';

import { Grid } from './Grid';
import { Header } from './Header';
import { Footer } from './Footer';

interface SiteLayoutProps {
    children: ReactNode;
    className?: string;
}

export function SiteLayout({ children }: SiteLayoutProps) {
    return (
        <Grid className="bg-zinc-100 dark:bg-zinc-800 h-screen grid-rows-[auto_1fr_auto]">
            <Header />
            <div className="col-span-full">
                <div className="flex flex-col sm:flex-row gap-4 container mx-auto h-full">
                    <div className="flex-grow">{children}</div>
                </div>
            </div>
            <Footer />
        </Grid>
    );
}

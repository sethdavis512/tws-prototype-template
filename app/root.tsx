import type { LinksFunction, LoaderFunctionArgs } from '@remix-run/node';
import {
    Links,
    LiveReload,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
    json,
    useLoaderData
} from '@remix-run/react';
import { User } from '@prisma/client';

import stylesheet from '~/tailwind.css';
import { getUser } from '~/session.server';
import { getThemeSession } from '~/utils/theme.server';
import { Theme } from './utils/theme-provider';
import { BACKGROUND_COLORS } from './constants';

export interface OutletContextValue {
    theme: Theme;
    user: User;
}

export const links: LinksFunction = () => [
    { rel: 'stylesheet', href: stylesheet }
];

export const loader = async ({ request }: LoaderFunctionArgs) => {
    const themeSession = await getThemeSession(request);
    const user = await getUser(request);

    return json({
        theme: themeSession.getTheme(),
        user
    });
};

export default function App() {
    const data = useLoaderData<typeof loader>();

    return (
        <html lang="en" className={`h-full ${data.theme}`}>
            <head>
                <meta charSet="utf-8" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Leckerli+One&display=swap"
                    rel="stylesheet"
                />
                <Meta />
                <Links />
            </head>
            <body className={`min-h-full ${BACKGROUND_COLORS}`}>
                <Outlet context={{ theme: data.theme, user: data.user }} />
                <ScrollRestoration />
                <Scripts />
                <LiveReload />
            </body>
        </html>
    );
}

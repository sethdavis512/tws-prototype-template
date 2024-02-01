import type { LoaderFunctionArgs } from '@remix-run/node';
import {
    Links,
    LiveReload,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
    json,
    useLoaderData,
    useNavigate
} from '@remix-run/react';
import { RouterProvider } from 'react-aria-components';

import { getThemeSession } from '~/utils/theme.server';
import { BACKGROUND_COLORS } from '~/constants';
import {
    getSupabaseEnv,
    getSupabaseWithSessionAndHeaders
} from './utils/supabase.server';

import { useSupabase } from './utils/supabase';

import './tailwind.css';

export function links() {
    return [
        {
            rel: 'preconnect',
            href: 'https://fonts.googleapis.com'
        },
        {
            rel: 'preconnect',
            href: 'https://fonts.gstatic.com'
        }
    ];
}

export async function loader({ request }: LoaderFunctionArgs) {
    const themeSession = await getThemeSession(request);
    const { serverSession, headers } = await getSupabaseWithSessionAndHeaders({
        request
    });
    const domainUrl = process.env.DOMAIN_URL!;
    const env = getSupabaseEnv();

    return json(
        { serverSession, env, domainUrl, theme: themeSession.getTheme() },
        { headers }
    );
}

export default function App() {
    const { env, serverSession, domainUrl, theme } =
        useLoaderData<typeof loader>();
    const { supabase } = useSupabase({ env, serverSession });
    const navigate = useNavigate(); // https://react-spectrum.adobe.com/react-aria/routing.html#remix

    const htmlClassName = `h-full ${theme}`;
    const bodyClassName = `min-h-full ${BACKGROUND_COLORS}`;

    const isLoggedIn = !!serverSession;

    return (
        <html lang="en" className={htmlClassName}>
            <head>
                <meta charSet="utf-8" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <Meta />
                <Links />
            </head>
            <body className={bodyClassName}>
                <RouterProvider navigate={navigate}>
                    <Outlet
                        context={{ supabase, domainUrl, theme, isLoggedIn }}
                    />
                </RouterProvider>
                <ScrollRestoration />
                <Scripts />
                <LiveReload />
            </body>
        </html>
    );
}

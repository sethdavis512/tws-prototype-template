import {
    Link,
    useFetcher,
    useLocation,
    useOutletContext
} from '@remix-run/react';
import { DoorClosed, DoorOpen, Moon, Sun } from 'lucide-react';

import { BORDER_BOTTOM_COLORS } from '~/constants';
import { Button } from './Button';
import { IconButton } from './IconButton';
import { OutletContextValue } from '~/root';
import { Theme } from '~/utils/theme-provider';
import { LinkButton } from './LinkButton';

export function Header() {
    const location = useLocation();
    const { theme, user } = useOutletContext<OutletContextValue>();
    const logoutFetcher = useFetcher();
    const themeFetcher = useFetcher();
    const isThemeDark = theme === Theme.DARK;

    const isLoggedIn = user && user.id;
    const isOutsideApp = ['/'].includes(location.pathname);

    return (
        <header
            className={`bg-white dark:bg-zinc-700 col-span-full p-4 mb-4 ${BORDER_BOTTOM_COLORS}`}
        >
            <div className="flex flex-col md:flex-row justify-between items-center">
                <ul>
                    <li>
                        <Link to="/">{`<TechWithSeth/>`}</Link>
                    </li>
                </ul>
                <div className="flex flex-col sm:flex-row items-center gap-2">
                    {isLoggedIn && isOutsideApp && (
                        <LinkButton variant="ghost" to="/dashboard">
                            Dashboard
                        </LinkButton>
                    )}
                    {isLoggedIn ? (
                        <logoutFetcher.Form method="POST" action="/logout">
                            <Button
                                variant="ghost"
                                className="flex gap-2"
                                type="submit"
                            >
                                <DoorClosed />
                                Log out
                            </Button>
                        </logoutFetcher.Form>
                    ) : (
                        <Link to="/login" className="flex items-center gap-2">
                            <DoorOpen /> Log in
                        </Link>
                    )}
                    <themeFetcher.Form method="POST" action="/api/theme">
                        <IconButton
                            variant="ghost"
                            type="submit"
                            name="themeSelection"
                            value={isThemeDark ? Theme.LIGHT : Theme.DARK}
                            aria-label={`Toggle theme to ${
                                isThemeDark ? 'light' : 'dark'
                            } theme`}
                        >
                            <span className="sr-only">
                                Toggle to {isThemeDark ? 'light' : 'dark'} theme
                            </span>
                            {isThemeDark ? <Sun /> : <Moon />}
                        </IconButton>
                    </themeFetcher.Form>
                </div>
            </div>
        </header>
    );
}

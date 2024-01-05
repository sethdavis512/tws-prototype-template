import { NavLink } from '@remix-run/react';
import { Gauge, User } from 'lucide-react';
import { BORDER_COLORS } from '~/constants';

export function LeftNav() {
    const navLinkClassName = ({ isActive }: { isActive: boolean }): string =>
        `flex gap-2 py-2 px-3 rounded-lg ${
            isActive
                ? 'dark:text-zinc-800 bg-amber-500 hover:bg-amber-400 hover:dark:bg-amber-400'
                : 'hover:bg-zinc-100 hover:dark:bg-zinc-600'
        }`;

    const linkData = [
        { id: 1, to: '/dashboard', Icon: Gauge, text: 'Dashboard' },
        { id: 2, to: '/profile', Icon: User, text: 'Profile' }
    ];

    return (
        <div
            className={`p-4 bg-white dark:bg-zinc-700 rounded-lg ${BORDER_COLORS} mt-4`}
        >
            <ul className="space-y-4">
                {linkData.map(({ id, to, Icon, text }) => (
                    <li key={id}>
                        <NavLink to={to} className={navLinkClassName}>
                            <Icon />
                            {text}
                        </NavLink>
                    </li>
                ))}
            </ul>
        </div>
    );
}

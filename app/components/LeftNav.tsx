import { NavLink } from '@remix-run/react';
import { Gauge, User2 } from 'lucide-react';
import { BORDER_COLORS, Urls } from '~/constants';

export function LeftNav() {
    const navLinkClassName = ({ isActive }: { isActive: boolean }): string =>
        `flex gap-2 py-2 px-3 rounded-lg ${
            isActive
                ? 'dark:text-gray-800 bg-amber-500 hover:bg-amber-400 hover:dark:bg-amber-400'
                : 'hover:bg-gray-100 hover:dark:bg-gray-600'
        }`;

    const linkData = [
        { to: Urls.DASHBOARD, Icon: Gauge, text: 'Dashboard' },
        { to: Urls.PROFILE, Icon: User2, text: 'Profile' }
    ].map((item, index) => ({
        ...item,
        id: index
    }));

    return (
        <div
            className={`p-4 bg-white dark:bg-gray-700 rounded-lg ${BORDER_COLORS} mt-4`}
        >
            <ul className="space-y-4">
                {linkData.map(({ id, to, Icon, text }) => (
                    <li key={id}>
                        <NavLink to={to} className={navLinkClassName} end>
                            <Icon />
                            {text}
                        </NavLink>
                    </li>
                ))}
            </ul>
        </div>
    );
}

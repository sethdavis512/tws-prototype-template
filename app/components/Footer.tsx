import { BORDER_TOP_COLORS } from '~/constants';

const Footer = () => {
    return (
        <footer
            className={`bg-white dark:bg-gray-700 col-span-full row-span-2 pt-4 px-4 pb-12 ${BORDER_TOP_COLORS}`}
        >
            <ul>
                <li>Footer</li>
            </ul>
        </footer>
    );
};

export { Footer };

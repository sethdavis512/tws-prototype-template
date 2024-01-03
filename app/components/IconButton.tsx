import { type VariantProps } from 'cva';
import { Button, type ButtonProps } from 'react-aria-components';

import { cva, cx } from '~/utils/cva.config';

const iconButtonVariants = cva({
    base: [
        'inline-flex items-center justify-center rounded-md font-semibold outline-none transition-colors',
        // Focus
        'focus:ring-2 focus:ring-zinc-400 focus:ring-offset-2 dark:focus:ring-offset-zinc-900',
        // Disabled
        'disabled:pointer-events-none disabled:opacity-40'
    ],
    variants: {
        variant: {
            solid: [
                // Base
                'bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-900',
                // Hover
                'hover:bg-zinc-700 dark:hover:bg-zinc-200',
                // Focus
                'focus:bg-zinc-700 dark:focus:bg-zinc-200',
                // Open
                'open:bg-zinc-100 dark:open:bg-zinc-800'
            ],
            destructive: [
                // Base
                'bg-red-600 text-white',
                // Hover
                'hover:bg-red-600 dark:hover:bg-red-600',
                // Focus
                'focus:bg-red-600 dark:focus:bg-red-600',
                // Open
                ''
            ],
            outline: [
                // Base
                'border border-zinc-200 bg-transparent dark:border-zinc-700 dark:text-zinc-100',
                // Hover
                'hover:bg-zinc-100 dark:hover:bg-zinc-700',
                // Focus
                'focus:bg-zinc-100 dark:focus:bg-zinc-700',
                // Open
                ''
            ],
            subtle: [
                // Base
                'bg-zinc-100 text-zinc-900 dark:bg-zinc-700 dark:text-zinc-100',
                // Hover
                'hover:bg-zinc-200 dark:hover:bg-zinc-600',
                // Focus
                'focus:bg-zinc-200 dark:focus:bg-zinc-600',
                // Open
                ''
            ],
            ghost: [
                // Base
                'bg-transparent dark:text-zinc-100',
                // Hover
                'hover:bg-zinc-100 dark:hover:bg-zinc-800 dark:hover:text-zinc-100',
                // Focus
                'focus:bg-zinc-100 dark:focus:bg-zinc-800 dark:focus:text-zinc-100',
                // Open
                'open:bg-transparent dark:open:bg-transparent'
            ],
            link: [
                // Base
                'bg-transparent text-zinc-900 underline-offset-4 dark:bg-transparent dark:text-zinc-100',
                // Hover
                'hover:bg-transparent hover:underline dark:hover:bg-transparent',
                // Focus
                'focus:bg-transparent focus:underline dark:focus:bg-transparent',
                // Open
                ''
            ]
        },
        size: {
            lg: 'h-12 w-12 rounded-lg text-3xl',
            md: 'h-10 w-10 rounded-md text-2xl',
            sm: 'h-8 w-8 rounded px-1 text-xl',
            xs: 'h-6 w-6 rounded px-1 text-lg'
        }
    },
    defaultVariants: {
        variant: 'solid',
        size: 'md'
    }
});

export interface _IconButtonProps
    extends ButtonProps,
        VariantProps<typeof iconButtonVariants> {
    className?: string;
    'aria-label': string;
}

const _IconButton = ({
    className,
    variant,
    size,
    ...props
}: _IconButtonProps) => {
    return (
        <Button
            className={cx(
                iconButtonVariants({
                    variant,
                    size,
                    className
                })
            )}
            {...props}
        />
    );
};

export { _IconButton as IconButton, iconButtonVariants };

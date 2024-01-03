import { type VariantProps } from 'cva';
import { Button, type ButtonProps } from 'react-aria-components';

import { cva, cx } from '~/utils/cva.config';

const buttonVariants = cva({
    base: [
        'inline-flex items-center justify-center rounded-md font-semibold outline-none transition-colors',
        // Focus
        'focus:ring-2 focus:ring-zinc-400 focus:ring-offset-2 dark:focus:ring-zinc-400 dark:focus:ring-offset-zinc-900',
        // Disabled
        'disabled:pointer-events-none disabled:opacity-40'
    ],
    variants: {
        variant: {
            solid: 'bg-zinc-900 text-white hover:bg-zinc-700 open:bg-zinc-100 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200 dark:open:bg-zinc-800',
            destructive:
                'bg-red-600 text-white hover:bg-red-700 dark:hover:bg-red-700',
            outline:
                'border border-zinc-200 bg-transparent hover:bg-zinc-100 focus:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-100 dark:hover:bg-zinc-700 dark:focus:bg-zinc-700',
            subtle: 'bg-zinc-100 text-zinc-900 hover:bg-zinc-200 focus:bg-zinc-200 dark:bg-zinc-700 dark:text-zinc-100 dark:hover:bg-zinc-700 dark:focus:bg-zinc-700',
            ghost: 'bg-transparent hover:bg-zinc-100 focus:bg-zinc-100 open:bg-transparent dark:text-zinc-100 dark:hover:bg-zinc-800 dark:hover:text-zinc-100 dark:focus:bg-zinc-800 dark:focus:text-zinc-100 dark:open:bg-transparent',
            link: 'bg-transparent text-zinc-900 underline-offset-4 hover:bg-transparent hover:underline focus:bg-transparent focus:underline dark:bg-transparent dark:text-zinc-100 dark:hover:bg-transparent dark:focus:bg-transparent'
        },
        size: {
            lg: 'h-12 px-6 text-lg',
            md: 'h-10 px-4 text-base',
            sm: 'h-8 px-3 text-sm',
            xs: 'h-6 px-2 text-xs'
        }
    },
    defaultVariants: {
        variant: 'solid',
        size: 'md'
    }
});

export interface _ButtonProps
    extends ButtonProps,
        VariantProps<typeof buttonVariants> {
    className?: string;
}

const _Button = ({ className, variant, size, ...props }: _ButtonProps) => {
    return (
        <Button
            className={cx(
                buttonVariants({
                    variant,
                    size,
                    className
                })
            )}
            {...props}
        />
    );
};

export { _Button as Button, buttonVariants };

'use client';

import { type VariantProps } from 'cva';
import { Input, type InputProps } from 'react-aria-components';

import { cva, cx } from '~/utils/cva.config';

const inputVariants = cva({
    base: [
        'flex w-full border border-zinc-300 bg-transparent placeholder:text-zinc-400',
        // Focus
        'focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:ring-offset-2',
        // Dark
        'dark:border-zinc-700 dark:text-zinc-50 dark:focus:ring-zinc-400 dark:focus:ring-offset-zinc-900',
        // Disabled
        'disabled:cursor-not-allowed disabled:opacity-40',
        // Invalid
        'invalid:border-red-600 dark:invalid:border-red-400'
    ],
    variants: {
        size: {
            lg: 'h-12 rounded-lg px-4 text-lg',
            md: 'h-10 rounded-md px-4 text-base',
            sm: 'h-8 rounded px-3 text-sm',
            xs: 'h-6 rounded px-2 text-xs'
        },
        intent: {
            primary: '',
            secondary: '',
            success: '',
            info: '',
            warning: '',
            alert: ''
        }
    },
    defaultVariants: {
        size: 'md'
    }
});

export interface _InputProps
    extends Omit<InputProps, 'size'>,
        VariantProps<typeof inputVariants> {
    className?: string;
}

const _Input = ({ className, size, ...props }: _InputProps) => {
    return (
        <Input
            className={cx(
                inputVariants({
                    size,
                    className
                })
            )}
            {...props}
        />
    );
};

export { _Input as Input };

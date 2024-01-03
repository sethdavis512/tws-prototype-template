import type { ReactNode } from 'react';
import { cx } from '~/utils/cva.config';

interface GridProps {
    children: ReactNode;
    className?: string;
}

export function Grid({ children, className }: GridProps) {
    const gridClassName = cx('grid grid-cols-12', className);

    return <div className={gridClassName}>{children}</div>;
}

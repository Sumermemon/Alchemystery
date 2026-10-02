import * as React from 'react';
import { cn } from '@/lib/utils/cn';

export type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement>;

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, style, children, ...props }, ref) => {
    return (
      <select
        className={cn(
          'flex h-10 w-full items-center justify-between rounded-lg border px-3 py-2 text-sm outline-none transition-all appearance-none cursor-pointer',
          'focus:ring-2 focus:ring-[var(--color-gold)]/25 focus:border-[var(--color-gold)]',
          'disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        style={{
          background: 'var(--admin-input-bg, rgba(255,255,255,0.03))',
          borderColor: 'var(--admin-input-border, rgba(255,255,255,0.12))',
          color: 'var(--admin-input-text, var(--color-ivory))',
          ...style,
        }}
        ref={ref}
        {...props}
      >
        {children}
      </select>
    );
  }
);
Select.displayName = 'Select';

export { Select };

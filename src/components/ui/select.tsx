import * as React from 'react';
import { cn } from '@/lib/utils/cn';

export type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement>;

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <select
        className={cn(
          'flex h-10 w-full items-center justify-between rounded border px-3 py-2 text-sm outline-none transition-colors appearance-none',
          'bg-[rgba(255,255,255,0.02)] border-[rgba(255,255,255,0.1)] text-[var(--color-ivory)]',
          'focus:border-[rgba(201,168,76,0.5)] focus:bg-[rgba(255,255,255,0.04)]',
          'disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
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

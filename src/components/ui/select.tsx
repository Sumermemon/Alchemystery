import * as React from 'react';
import { cn } from '@/lib/utils/cn';

export type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement>;

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, style, children, ...props }, ref) => {
    return (
      <div className="relative w-full">
        <select
          className={cn(
            'flex h-10 w-full items-center justify-between rounded-lg border px-3 py-2 pr-9 text-sm outline-none transition-all cursor-pointer appearance-none',
            'focus:ring-2 focus:ring-[var(--color-gold)]/25 focus:border-[var(--color-gold)]',
            'disabled:cursor-not-allowed disabled:opacity-50',
            className
          )}
          style={{
            background: 'var(--admin-input-bg, #0d1224)',
            borderColor: 'var(--admin-input-border, rgba(255,255,255,0.12))',
            color: 'var(--admin-input-text, var(--color-ivory))',
            ...style,
          }}
          ref={ref}
          {...props}
        >
          {children}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-[var(--admin-muted,#8892AA)]">
          <svg
            className="h-4 w-4 fill-current opacity-70"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
    );
  }
);
Select.displayName = 'Select';

export { Select };

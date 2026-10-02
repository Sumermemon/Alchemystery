import * as React from 'react';
import { cn } from '@/lib/utils/cn';

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, style, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-10 w-full rounded-lg border px-3.5 py-2 text-sm font-sans outline-none transition-all duration-150',
          'focus:ring-2 focus:ring-[var(--color-gold)]/25 focus:border-[var(--color-gold)]',
          'disabled:cursor-not-allowed disabled:opacity-50',
          'file:border-0 file:bg-transparent file:text-sm file:font-medium',
          'placeholder:text-[var(--admin-input-placeholder,#94a3b8)]',
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
      />
    );
  }
);
Input.displayName = 'Input';

export { Input };

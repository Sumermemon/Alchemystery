import * as React from 'react';
import { cn } from '@/lib/utils/cn';

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-10 w-full rounded border px-3 py-2 text-sm text-[var(--color-ivory)] outline-none transition-colors',
          'bg-[rgba(255,255,255,0.02)] border-[rgba(255,255,255,0.1)]',
          'focus:border-[rgba(201,168,76,0.5)] focus:bg-[rgba(255,255,255,0.04)]',
          'disabled:cursor-not-allowed disabled:opacity-50',
          'file:border-0 file:bg-transparent file:text-sm file:font-medium',
          'placeholder:text-[var(--color-muted)]',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';

export { Input };

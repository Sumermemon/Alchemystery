import * as React from 'react';
import { cn } from '@/lib/utils/cn';

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          'flex min-h-[80px] w-full rounded border px-3 py-2 text-sm text-[var(--color-ivory)] outline-none transition-colors',
          'bg-[rgba(255,255,255,0.02)] border-[rgba(255,255,255,0.1)]',
          'focus:border-[rgba(201,168,76,0.5)] focus:bg-[rgba(255,255,255,0.04)]',
          'disabled:cursor-not-allowed disabled:opacity-50',
          'placeholder:text-[var(--color-muted)]',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = 'Textarea';

export { Textarea };

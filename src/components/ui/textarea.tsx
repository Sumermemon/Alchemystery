import * as React from 'react';
import { cn } from '@/lib/utils/cn';

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, style, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          'flex min-h-[80px] w-full rounded-lg border px-3.5 py-2.5 text-sm font-sans outline-none transition-all duration-150',
          'focus:ring-2 focus:ring-[var(--color-gold)]/25 focus:border-[var(--color-gold)]',
          'disabled:cursor-not-allowed disabled:opacity-50',
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
Textarea.displayName = 'Textarea';

export { Textarea };

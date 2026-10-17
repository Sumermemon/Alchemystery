import * as React from 'react';
import { cn } from '@/lib/utils/cn';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  asChild?: boolean;
}

export const buttonVariants = ({
  variant = 'primary',
  size = 'md',
  className,
}: {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
} = {}) =>
  cn(
    'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer select-none leading-none',
    {
      'bg-[var(--color-gold)] text-[#0B0F1E] font-semibold hover:opacity-95 shadow-sm active:scale-[0.98]': variant === 'primary',
      'border border-[var(--admin-border)] bg-[var(--admin-surface)] text-[var(--admin-text)] hover:bg-[var(--admin-surface-2)] shadow-sm': variant === 'secondary',
      'bg-red-50 text-red-700 hover:bg-red-100 border border-red-200 dark:bg-red-900/40 dark:text-red-300 dark:hover:bg-red-900/60 dark:border-red-800/50': variant === 'danger',
      'text-[var(--admin-muted)] hover:text-[var(--admin-text)] hover:bg-[var(--admin-surface-2)]': variant === 'ghost',
      'h-8 px-3 text-xs': size === 'sm',
      'h-10 px-4 py-2': size === 'md',
      'h-12 px-8 text-base': size === 'lg',
    },
    className
  );

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', asChild = false, children, ...props }, ref) => {
    const classes = buttonVariants({ variant, size, className });

    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children as React.ReactElement<any>, {
        className: cn(classes, (children as React.ReactElement<any>).props.className),
        ref,
        ...props,
      });
    }

    return (
      <button
        ref={ref}
        className={classes}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = 'Button';

export { Button };

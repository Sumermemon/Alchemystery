import * as React from 'react';
import { cn } from '@/lib/utils/cn';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
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
    'inline-flex items-center justify-center rounded text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50',
    {
      'bg-[var(--color-gold)] text-[#0B0F1E] hover:opacity-90': variant === 'primary',
      'border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.02)] text-[var(--color-ivory)] hover:bg-[rgba(255,255,255,0.05)]': variant === 'secondary',
      'bg-red-900/50 text-red-200 hover:bg-red-900/70 border border-red-900/50': variant === 'danger',
      'text-[var(--color-muted)] hover:text-[var(--color-ivory)] hover:bg-[rgba(255,255,255,0.05)]': variant === 'ghost',
      'h-8 px-3 text-xs': size === 'sm',
      'h-10 px-4 py-2': size === 'md',
      'h-12 px-8 text-base': size === 'lg',
    },
    className
  );

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={buttonVariants({ variant, size, className })}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button };

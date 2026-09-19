import * as React from 'react';
import { cn } from '@/lib/utils/cn';

const Badge = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & { variant?: 'default' | 'success' | 'warning' | 'destructive' | 'outline' }>(
  ({ className, variant = 'default', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors',
          {
            'bg-[var(--color-gold)] text-[#0B0F1E]': variant === 'default',
            'bg-emerald-900/30 text-emerald-400 border border-emerald-900/50': variant === 'success',
            'bg-amber-900/30 text-amber-400 border border-amber-900/50': variant === 'warning',
            'bg-red-900/30 text-red-400 border border-red-900/50': variant === 'destructive',
            'text-[var(--color-ivory)] border border-[rgba(255,255,255,0.1)]': variant === 'outline',
          },
          className
        )}
        {...props}
      />
    );
  }
);
Badge.displayName = 'Badge';

export { Badge };

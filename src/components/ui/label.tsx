import * as React from 'react';
import { cn } from '@/lib/utils/cn';

const Label = React.forwardRef<HTMLLabelElement, React.LabelHTMLAttributes<HTMLLabelElement>>(
  ({ className, style, ...props }, ref) => (
    <label
      ref={ref}
      className={cn(
        'text-xs font-semibold leading-none uppercase tracking-wider font-sans peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
        className
      )}
      style={{
        color: 'var(--admin-text, var(--color-ivory))',
        opacity: 0.9,
        ...style,
      }}
      {...props}
    />
  )
);
Label.displayName = 'Label';

export { Label };

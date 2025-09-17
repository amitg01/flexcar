import React, { forwardRef } from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'outlined';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hover?: boolean;
  children: React.ReactNode;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      variant = 'default',
      padding = 'md',
      hover = false,
      className = '',
      children,
      ...props
    },
    ref
  ) => {
    const baseClasses = 'rounded-lg transition-all duration-200';

    const variantClasses = {
      default: 'bg-white shadow-sm border border-gray-200',
      elevated: 'bg-white shadow-lg border border-gray-100',
      outlined: 'bg-white border-2 border-gray-200',
    };

    const paddingClasses = {
      none: '',
      sm: 'p-3',
      md: 'p-6',
      lg: 'p-8',
    };

    const hoverClasses = hover
      ? 'hover:shadow-xl hover:scale-[1.02] cursor-pointer'
      : '';

    return (
      <div
        ref={ref}
        className={`${baseClasses} ${variantClasses[variant]} ${paddingClasses[padding]} ${hoverClasses} ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

export default Card;

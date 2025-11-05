import { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  children: ReactNode;
}

export default function Button({ variant = 'primary', children, className = '', ...props }: ButtonProps) {
  const baseStyles = 'h-12 px-6 rounded-button text-button transition-all duration-smooth min-h-touch min-w-touch focus-vexto disabled:opacity-50 disabled:cursor-not-allowed font-medium';

  const variantStyles = {
    primary: 'bg-gradient-to-r from-vexto-primary to-vexto-accent text-white hover:shadow-glow active:scale-95',
    secondary: 'bg-vexto-white text-vexto-dark hover:bg-vexto-light border border-vexto-light hover:border-vexto-secondary hover:shadow-card active:scale-95',
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export default function Card({ children, className = '', hover = false, onMouseEnter, onMouseLeave }: CardProps) {
  const baseStyles = 'bg-white rounded-card shadow-card p-6 transition-all duration-smooth border border-vexto-light';
  const hoverStyles = hover ? 'hover:shadow-card-hover hover:-translate-y-1 hover:border-vexto-secondary/30' : '';

  return (
    <div
      className={`${baseStyles} ${hoverStyles} ${className}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </div>
  );
}

import { ReactNode } from 'react';

interface SectionProps {
  children: ReactNode;
  className?: string;
  background?: 'white' | 'gray';
}

export default function Section({ children, className = '', background = 'white' }: SectionProps) {
  const bgStyles = background === 'gray' ? 'bg-vexto-lightgray' : 'bg-white';

  return (
    <section className={`py-16 md:py-24 ${bgStyles} ${className}`}>
      <div className="max-w-container mx-auto px-6 md:px-8">
        {children}
      </div>
    </section>
  );
}

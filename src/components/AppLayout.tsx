import { ReactNode } from 'react';
import AppHeader from './AppHeader';
import AppFooter from './AppFooter';

interface AppLayoutProps {
  appTitle: string;
  appSubtitle?: string;
  rightButtons?: ReactNode;
  children: ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

const maxWidthClasses = {
  sm: 'max-w-3xl',
  md: 'max-w-4xl',
  lg: 'max-w-5xl',
  xl: 'max-w-6xl',
  full: 'max-w-7xl',
};

export default function AppLayout({
  appTitle,
  appSubtitle,
  rightButtons,
  children,
  maxWidth = 'lg',
}: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <AppHeader
        appTitle={appTitle}
        appSubtitle={appSubtitle}
        rightButtons={rightButtons}
      />
      <main className="flex-1 py-8">
        <div className={`${maxWidthClasses[maxWidth]} mx-auto px-6 md:px-8`}>
          <div className="bg-white rounded-lg shadow-sm p-6 md:p-8">
            {children}
          </div>
        </div>
      </main>
      <AppFooter />
    </div>
  );
}

import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

interface AppHeaderProps {
  appTitle: string;
  appSubtitle?: string;
  rightButtons?: React.ReactNode;
}

export default function AppHeader({ appTitle, appSubtitle, rightButtons }: AppHeaderProps) {
  return (
    <header className="bg-white/95 backdrop-blur-xl border-b border-gray-100 shadow-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link to="/" className="group relative">
              <div className="w-10 h-10 bg-gradient-to-br from-vexto-primary to-vexto-secondary rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-105 group-hover:rotate-3">
                <span className="text-white font-bold text-lg">V</span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-vexto-secondary/30 to-vexto-accent/30 rounded-xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
            </Link>
            <div className="border-l border-gray-200 pl-6">
              <h1 className="text-2xl font-bold text-gray-900 tracking-tight">{appTitle}</h1>
              {appSubtitle && (
                <p className="text-sm text-gray-600 mt-0.5 tracking-wide">{appSubtitle}</p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-4">
            {rightButtons}
            <Link
              to="/"
              className="group flex items-center gap-2 text-gray-600 hover:text-vexto-primary transition-all duration-300 text-sm font-medium px-3 py-2 rounded-lg hover:bg-vexto-light/50"
            >
              <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform duration-300" />
              <span className="hidden sm:inline tracking-wide">Back to Vexto</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

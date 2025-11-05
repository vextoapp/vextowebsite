import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isLandingPage = location.pathname === '/';

  const scrollToSection = (sectionId: string) => {
    if (!isLandingPage) {
      window.location.href = `/#${sectionId}`;
      return;
    }
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  const handleLogoClick = () => {
    if (isLandingPage) {
      scrollToSection('hero');
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-b border-gray-100 shadow-sm transition-all duration-smooth">
      <div className="max-w-container mx-auto px-6 md:px-8">
        <div className="flex items-center justify-between h-16">
          <Link
            to="/"
            className="flex items-center gap-3 cursor-pointer group relative"
            onClick={handleLogoClick}
          >
            <div className="relative">
              <img
                src="/vexto-logo.svg"
                alt="Vexto Logo"
                className="h-10 w-10 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-vexto-secondary/20 to-vexto-accent/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-vexto-dark via-vexto-primary to-vexto-secondary bg-clip-text text-transparent group-hover:from-vexto-secondary group-hover:via-vexto-primary group-hover:to-vexto-accent transition-all duration-500">
              Vexto
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {isLandingPage ? (
              <button
                onClick={() => scrollToSection('apps')}
                className="relative px-4 py-2 text-sm font-medium text-gray-700 hover:text-vexto-primary transition-colors duration-300 group"
              >
                <span className="relative z-10 tracking-wide">Apps</span>
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-vexto-secondary to-vexto-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              </button>
            ) : (
              <Link
                to="/#apps"
                className="relative px-4 py-2 text-sm font-medium text-gray-700 hover:text-vexto-primary transition-colors duration-300 group"
              >
                <span className="relative z-10 tracking-wide">Apps</span>
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-vexto-secondary to-vexto-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              </Link>
            )}
            <Link
              to="/blog"
              className="relative px-4 py-2 text-sm font-medium text-gray-700 hover:text-vexto-primary transition-colors duration-300 group"
            >
              <span className="relative z-10 tracking-wide">Blog</span>
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-vexto-secondary to-vexto-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            </Link>
            <Link
              to="/about"
              className="relative px-4 py-2 text-sm font-medium text-gray-700 hover:text-vexto-secondary transition-colors duration-300 group"
            >
              <span className="relative z-10 tracking-wide">About</span>
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-vexto-accent to-vexto-secondary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            </Link>
            <Link
              to="/faq"
              className="relative px-4 py-2 text-sm font-medium text-gray-700 hover:text-vexto-secondary transition-colors duration-300 group"
            >
              <span className="relative z-10 tracking-wide">FAQ</span>
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-vexto-accent to-vexto-secondary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            </Link>
            <Link
              to="/contact"
              className="relative px-4 py-2 text-sm font-medium text-gray-700 hover:text-vexto-secondary transition-colors duration-300 group"
            >
              <span className="relative z-10 tracking-wide">Contact</span>
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-vexto-accent to-vexto-secondary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            </Link>
          </div>

          <button
            className="md:hidden min-h-touch min-w-touch flex items-center justify-center text-vexto-dark hover:text-vexto-primary transition-colors duration-smooth"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-xl border-t border-gray-100 shadow-lg animate-fade-in">
          <div className="px-6 py-6 space-y-2">
            {isLandingPage ? (
              <button
                onClick={() => scrollToSection('apps')}
                className="block w-full text-left text-sm font-medium text-gray-700 hover:text-vexto-primary hover:bg-vexto-light/50 transition-all duration-300 py-3 px-4 rounded-lg animate-menu-stagger"
                style={{ animationDelay: '0ms' }}
              >
                Apps
              </button>
            ) : (
              <Link
                to="/#apps"
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full text-left text-sm font-medium text-gray-700 hover:text-vexto-primary hover:bg-vexto-light/50 transition-all duration-300 py-3 px-4 rounded-lg animate-menu-stagger"
                style={{ animationDelay: '0ms' }}
              >
                Apps
              </Link>
            )}
            <Link
              to="/blog"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full text-left text-sm font-medium text-gray-700 hover:text-vexto-primary hover:bg-vexto-light/50 transition-all duration-300 py-3 px-4 rounded-lg animate-menu-stagger"
              style={{ animationDelay: '50ms' }}
            >
              Blog
            </Link>
            <Link
              to="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full text-left text-sm font-medium text-gray-700 hover:text-vexto-secondary hover:bg-vexto-light/50 transition-all duration-300 py-3 px-4 rounded-lg animate-menu-stagger"
              style={{ animationDelay: '100ms' }}
            >
              About
            </Link>
            <Link
              to="/faq"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full text-left text-sm font-medium text-gray-700 hover:text-vexto-secondary hover:bg-vexto-light/50 transition-all duration-300 py-3 px-4 rounded-lg animate-menu-stagger"
              style={{ animationDelay: '150ms' }}
            >
              FAQ
            </Link>
            <Link
              to="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full text-left text-sm font-medium text-gray-700 hover:text-vexto-secondary hover:bg-vexto-light/50 transition-all duration-300 py-3 px-4 rounded-lg animate-menu-stagger"
              style={{ animationDelay: '200ms' }}
            >
              Contact
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

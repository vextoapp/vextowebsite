import { useState, useEffect } from 'react';
import { Github, Linkedin, ArrowUp, Send } from 'lucide-react';
import XIcon from './XIcon';
import { Link } from 'react-router-dom';
import EmailSignupForm from './EmailSignupForm';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <footer className="relative bg-gradient-to-br from-vexto-dark-slate-blue via-vexto-dark-slate-blue to-[#3a1d5f] text-white py-16 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNiIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDMpIi8+PC9nPjwvc3ZnPg==')] opacity-30"></div>

        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-vexto-secondary/30 to-transparent"></div>

        <div className="relative max-w-container mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-12 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4 group cursor-pointer">
                <img
                  src="/vexto-logo.svg"
                  alt="Vexto Logo"
                  className="h-12 w-12 transition-all duration-slower group-hover:scale-110 group-hover:drop-shadow-[0_0_8px_rgba(18,194,227,0.5)]"
                />
                <span className="text-2xl font-bold bg-gradient-to-r from-white to-vexto-secondary bg-clip-text text-transparent">Vexto</span>
              </div>
              <p className="text-white/90 text-sm mb-6 leading-relaxed">
                Simplicity in Every Click
              </p>
              <p className="text-white/70 text-xs leading-relaxed max-w-sm">
                Building elegant, minimalist applications that enhance your digital life without the complexity.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-white">Product</h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link
                    to="/#apps"
                    className="group relative text-white/80 hover:text-white transition-colors duration-smooth inline-block"
                  >
                    <span>Apps</span>
                    <span className="absolute bottom-0 left-0 w-0 h-px bg-gradient-to-r from-vexto-secondary to-vexto-primary group-hover:w-full transition-all duration-slower"></span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/blog"
                    className="group relative text-white/80 hover:text-white transition-colors duration-smooth inline-block"
                  >
                    <span>Blog</span>
                    <span className="absolute bottom-0 left-0 w-0 h-px bg-gradient-to-r from-vexto-secondary to-vexto-primary group-hover:w-full transition-all duration-slower"></span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about"
                    className="group relative text-white/80 hover:text-white transition-colors duration-smooth inline-block"
                  >
                    <span>About</span>
                    <span className="absolute bottom-0 left-0 w-0 h-px bg-gradient-to-r from-vexto-secondary to-vexto-primary group-hover:w-full transition-all duration-slower"></span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/faq"
                    className="group relative text-white/80 hover:text-white transition-colors duration-smooth inline-block"
                  >
                    <span>FAQ</span>
                    <span className="absolute bottom-0 left-0 w-0 h-px bg-gradient-to-r from-vexto-secondary to-vexto-primary group-hover:w-full transition-all duration-slower"></span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="group relative text-white/80 hover:text-white transition-colors duration-smooth inline-block"
                  >
                    <span>Contact</span>
                    <span className="absolute bottom-0 left-0 w-0 h-px bg-gradient-to-r from-vexto-secondary to-vexto-primary group-hover:w-full transition-all duration-slower"></span>
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-white">Legal</h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link
                    to="/privacy"
                    className="group relative text-white/80 hover:text-white transition-colors duration-smooth inline-block"
                  >
                    <span>Privacy Policy</span>
                    <span className="absolute bottom-0 left-0 w-0 h-px bg-gradient-to-r from-vexto-secondary to-vexto-primary group-hover:w-full transition-all duration-slower"></span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/terms"
                    className="group relative text-white/80 hover:text-white transition-colors duration-smooth inline-block"
                  >
                    <span>Terms of Service</span>
                    <span className="absolute bottom-0 left-0 w-0 h-px bg-gradient-to-r from-vexto-secondary to-vexto-primary group-hover:w-full transition-all duration-slower"></span>
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-white">Connect</h4>
              <div className="flex gap-3 mb-6">
                <a
                  href="https://x.com/vextoapp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative p-2 rounded-lg bg-white/5 text-white/70 hover:text-vexto-secondary hover:bg-white/10 transition-all duration-slower backdrop-blur-sm"
                  aria-label="X"
                >
                  <XIcon size={20} className="relative z-10" />
                  <span className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-slower bg-gradient-to-br from-vexto-secondary/20 to-transparent"></span>
                </a>
                <a
                  href="https://github.com/vextoapp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative p-2 rounded-lg bg-white/5 text-white/70 hover:text-vexto-secondary hover:bg-white/10 transition-all duration-slower backdrop-blur-sm"
                  aria-label="GitHub"
                >
                  <Github size={20} className="relative z-10" />
                  <span className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-slower bg-gradient-to-br from-vexto-secondary/20 to-transparent"></span>
                </a>
                <a
                  href="https://www.linkedin.com/company/vextoapps"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative p-2 rounded-lg bg-white/5 text-white/70 hover:text-vexto-secondary hover:bg-white/10 transition-all duration-slower backdrop-blur-sm"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={20} className="relative z-10" />
                  <span className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-slower bg-gradient-to-br from-vexto-secondary/20 to-transparent"></span>
                </a>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <div className="max-w-md">
              <h4 className="font-semibold mb-3 text-white text-sm">Stay Updated</h4>
              <p className="text-white/70 text-xs mb-4">Get notified about new apps and updates</p>
              <EmailSignupForm variant="footer" />
            </div>
          </div>

          <div className="border-t border-white/10 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/70">
              <div className="flex items-center gap-2">
                <p>&copy; {currentYear} Vexto. All rights reserved.</p>
              </div>
              <div className="flex items-center gap-6 text-xs">
                <Link to="/blog" className="hover:text-white transition-colors duration-smooth">Blog</Link>
                <Link to="/faq" className="hover:text-white transition-colors duration-smooth">FAQ</Link>
                <Link to="/privacy" className="hover:text-white transition-colors duration-smooth">Privacy</Link>
                <Link to="/terms" className="hover:text-white transition-colors duration-smooth">Terms</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 p-3 rounded-full bg-gradient-to-br from-vexto-secondary to-vexto-primary text-white shadow-lg hover:shadow-glow-turquoise transition-all duration-slower z-50 ${
          showBackToTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        } hover:scale-110 active:scale-95`}
        aria-label="Back to top"
      >
        <ArrowUp size={20} />
      </button>
    </>
  );
}

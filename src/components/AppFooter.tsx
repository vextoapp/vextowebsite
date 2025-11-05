import { Share2, MessageSquare } from 'lucide-react';

export default function AppFooter() {
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: document.title,
        url: window.location.href,
      }).catch(() => {});
    }
  };

  return (
    <footer className="bg-white border-t border-gray-200 py-6">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="flex items-center justify-center gap-6 text-sm">
          <button
            onClick={handleShare}
            className="flex items-center gap-2 text-gray-600 hover:text-vexto-blue transition-smooth"
          >
            <Share2 size={16} />
            <span>Share</span>
          </button>
          <a
            href="#feedback"
            className="flex items-center gap-2 text-gray-600 hover:text-vexto-blue transition-smooth"
          >
            <MessageSquare size={16} />
            <span>Feedback</span>
          </a>
        </div>
        <div className="text-center mt-4 text-xs text-gray-500">
          <p>&copy; {new Date().getFullYear()} Vexto. Simplicity in Every Click.</p>
        </div>
      </div>
    </footer>
  );
}

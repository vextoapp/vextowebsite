import { ExternalLink } from 'lucide-react';
import Modal from './Modal';
import Button from './Button';
import { App } from '../lib/supabase';
import { trackAppLaunch } from '../utils/analytics';

interface AppDetailsModalProps {
  app: App | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function AppDetailsModal({ app, isOpen, onClose }: AppDetailsModalProps) {
  if (!app) return null;

  const handleLaunch = () => {
    trackAppLaunch(app.id, app.name);
    window.open(app.url, '_blank', 'noopener,noreferrer');
  };

  const getStatusBadge = () => {
    const badges = {
      active: null,
      beta: { text: 'Beta', color: 'bg-warning text-white' },
      coming_soon: { text: 'Coming Soon', color: 'bg-gray-400 text-white' },
      new: { text: 'New', color: 'bg-success text-white' },
    };

    const badge = badges[app.status];
    if (!badge) return null;

    return (
      <span className={`text-xs font-medium px-2 py-1 rounded ${badge.color}`}>
        {badge.text}
      </span>
    );
  };

  const isDisabled = app.status === 'coming_soon';

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="space-y-6">
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 bg-gradient-to-br from-vexto-primary/20 to-vexto-secondary/20 rounded-xl flex items-center justify-center text-3xl flex-shrink-0">
            {app.icon}
          </div>
          <div className="flex-grow">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-2xl font-bold text-vexto-dark">{app.name}</h3>
              {getStatusBadge()}
            </div>
            <p className="text-vexto-slate leading-relaxed">
              {app.description}
            </p>
          </div>
        </div>

        {app.features && app.features.length > 0 && (
          <div>
            <h4 className="text-lg font-semibold text-vexto-dark mb-4">Key Features</h4>
            <ul className="space-y-3">
              {app.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="w-6 h-6 bg-vexto-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-vexto-primary text-sm font-bold">✓</span>
                  </span>
                  <span className="text-vexto-slate-light leading-relaxed">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="pt-4 border-t border-gray-200">
          <Button
            onClick={handleLaunch}
            disabled={isDisabled}
            className="w-full flex items-center justify-center gap-2"
          >
            {isDisabled ? 'Coming Soon' : 'Launch App'}
            {!isDisabled && <ExternalLink size={18} />}
          </Button>
        </div>
      </div>
    </Modal>
  );
}

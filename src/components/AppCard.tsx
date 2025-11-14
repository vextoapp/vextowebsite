import { ExternalLink, Info } from 'lucide-react';
import { useState } from 'react';
import Card from './Card';
import Button from './Button';
import AppDetailsModal from './AppDetailsModal';
import { App } from '../lib/supabase';
import { trackAppLaunch } from '../utils/analytics';

interface AppCardProps {
  app: App;
}

export default function AppCard({ app }: AppCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const handleLaunch = () => {
    trackAppLaunch(app.id, app.name);
    window.open(app.url, '_blank', 'noopener,noreferrer');
  };

  const handleInfoClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsModalOpen(true);
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
    <>
      <Card
        hover={!isDisabled}
        className="flex flex-col h-full relative"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        <div className="flex items-start justify-between mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-vexto-secondary/20 to-vexto-primary/20 rounded-lg flex items-center justify-center text-2xl transition-transform duration-smooth group-hover:scale-110 overflow-hidden">
            {app.icon.startsWith('/') || app.icon.includes('.') ? (
              <img
                src={app.icon}
                alt={`${app.name} icon`}
                className="w-full h-full object-contain p-1.5"
              />
            ) : (
              <span>{app.icon}</span>
            )}
          </div>
          <div className="flex items-center gap-2">
            {getStatusBadge()}
            <button
              onClick={handleInfoClick}
              className="p-2 rounded-lg hover:bg-vexto-light text-vexto-slate hover:text-vexto-primary transition-all duration-smooth focus:outline-none focus:ring-2 focus:ring-vexto-primary focus:ring-offset-2"
              aria-label={`View details about ${app.name}`}
              title="View details"
            >
              <Info size={18} />
            </button>
          </div>
        </div>

        {showTooltip && app.features && app.features.length > 0 && (
          <div className="hidden md:block absolute top-full left-0 right-0 mt-2 bg-white border border-vexto-light rounded-lg shadow-xl p-4 z-10 animate-fade-in">
            <p className="text-sm font-semibold text-vexto-dark mb-2">Quick Preview:</p>
            <ul className="space-y-1">
              {app.features.slice(0, 3).map((feature, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-vexto-slate-light">
                  <span className="text-vexto-primary mt-0.5">•</span>
                  <span>{feature}</span>
                </li>
              ))}
              {app.features.length > 3 && (
                <li className="text-sm text-vexto-secondary font-medium pt-1">
                  +{app.features.length - 3} more features
                </li>
              )}
            </ul>
          </div>
        )}

      <h3 className="mb-2">{app.name}</h3>

      <p className="text-vexto-slate mb-4 flex-grow">
        {app.description}
      </p>

      {app.features && app.features.length > 0 && (
        <ul className="space-y-2 mb-6">
          {app.features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2 text-sm text-vexto-slate-light">
              <span className="text-vexto-blue mt-1">•</span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      )}

        <Button
          onClick={handleLaunch}
          disabled={isDisabled}
          className="w-full flex items-center justify-center gap-2"
        >
          {isDisabled ? 'Coming Soon' : 'Launch App'}
          {!isDisabled && <ExternalLink size={16} />}
        </Button>
      </Card>

      <AppDetailsModal
        app={app}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}

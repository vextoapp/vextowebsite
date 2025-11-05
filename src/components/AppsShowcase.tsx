import Section from './Section';
import AppCard from './AppCard';
import { useApps } from '../hooks/useApps';

export default function AppsShowcase() {
  const { apps, loading, error } = useApps();

  return (
    <Section background="gray" id="apps">
      <div className="text-center mb-12">
        <h2 className="mb-4">Explore Our Micro-Apps</h2>
        <p className="text-xl text-vexto-slate max-w-2xl mx-auto">
          Each app is crafted with care to solve one problem exceptionally well. Simple, focused, and powerful.
        </p>
      </div>

      {loading && (
        <div className="text-center py-12">
          <div className="inline-block w-8 h-8 border-4 border-vexto-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-vexto-slate">Loading apps...</p>
        </div>
      )}

      {error && (
        <div className="text-center py-12">
          <p className="text-error">Failed to load apps. Please try again later.</p>
        </div>
      )}

      {!loading && !error && apps.length === 0 && (
        <div className="text-center py-12">
          <p className="text-vexto-slate">No apps available at the moment.</p>
        </div>
      )}

      {!loading && !error && apps.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {apps.map((app) => (
            <AppCard key={app.id} app={app} />
          ))}
        </div>
      )}
    </Section>
  );
}

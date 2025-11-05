import Section from './Section';
import Card from './Card';
import { Clock } from 'lucide-react';

interface ComingSoonApp {
  name: string;
  description: string;
  icon: string;
}

export default function ComingSoon() {
  const comingSoonApps: ComingSoonApp[] = [
    {
      name: "Women's Health App",
      description: "Track your cycle, simply and privately.",
      icon: "💖",
    },
    {
      name: "Recipe Collector",
      description: "Collate recipes from any platform, all in one place.",
      icon: "🍳",
    },
    {
      name: "Smart Family Calendar",
      description: "The all-in-one calendar designed for modern families.",
      icon: "📅",
    },
  ];

  return (
    <Section background="white" id="coming-soon">
      <div className="text-center mb-12">
        <div className="w-16 h-16 bg-gradient-to-br from-vexto-dark-turquoise/20 to-vexto-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <Clock size={32} className="text-vexto-dark-turquoise" />
        </div>
        <h2 className="mb-4">Coming Soon</h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          A sneak peek at the next wave of simple, powerful tools.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {comingSoonApps.map((app, index) => (
          <Card key={index} className="text-center">
            <div className="text-5xl mb-4">{app.icon}</div>
            <h3 className="mb-3 text-lg">{app.name}</h3>
            <p className="text-gray-600 text-sm">{app.description}</p>
            <div className="mt-6 inline-flex items-center gap-2 text-sm text-vexto-secondary font-medium">
              <Clock size={16} />
              <span>In Development</span>
            </div>
          </Card>
        ))}
      </div>
    </Section>
  );
}

import { Zap, Shield, Boxes } from 'lucide-react';
import Section from './Section';
import Card from './Card';

export default function Features() {
  const features = [
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Built with performance in mind. Every app loads instantly and responds to your actions without delay.',
      color: 'primary',
    },
    {
      icon: Shield,
      title: 'Privacy First',
      description: 'Your data belongs to you. We prioritize security and privacy in every aspect of our platform.',
      color: 'secondary',
    },
    {
      icon: Boxes,
      title: 'Modular Design',
      description: 'Use only what you need. Each micro-app works independently, giving you complete flexibility.',
      color: 'accent',
    },
  ];

  return (
    <Section background="white" id="features">
      <div className="text-center mb-12">
        <h2 className="mb-4">Why Choose Vexto?</h2>
        <p className="text-xl text-vexto-slate max-w-2xl mx-auto">
          We believe great tools should get out of your way and let you focus on what matters.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          const colorClasses = {
            primary: { bg: 'bg-vexto-primary/10', hover: 'group-hover:bg-vexto-primary', icon: 'text-vexto-primary' },
            secondary: { bg: 'bg-vexto-secondary/10', hover: 'group-hover:bg-vexto-secondary', icon: 'text-vexto-secondary' },
            accent: { bg: 'bg-vexto-accent/10', hover: 'group-hover:bg-vexto-accent', icon: 'text-vexto-accent' },
          }[feature.color];
          return (
            <Card key={index} className="text-center group" hover>
              <div className={`w-16 h-16 ${colorClasses.bg} rounded-full flex items-center justify-center mx-auto mb-4 ${colorClasses.hover} group-hover:shadow-glow transition-all duration-smooth`}>
                <Icon size={32} className={`${colorClasses.icon} group-hover:text-white transition-colors duration-smooth`} />
              </div>
              <h3 className="mb-3">{feature.title}</h3>
              <p className="text-vexto-slate-light">{feature.description}</p>
            </Card>
          );
        })}
      </div>

      <div className="mt-16 bg-gradient-to-br from-vexto-light to-vexto-secondary/10 rounded-card p-8 md:p-12 text-center shadow-card border border-vexto-light">
        <h3 className="mb-4">Built for Everyone</h3>
        <p className="text-vexto-slate max-w-2xl mx-auto">
          Whether you're a professional managing projects, a student organizing notes, or someone who just wants simple tools that work, Vexto has something for you. No learning curve, no bloat, just tools that do what they promise.
        </p>
      </div>
    </Section>
  );
}

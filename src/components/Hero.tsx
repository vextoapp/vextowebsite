import { Sparkles } from 'lucide-react';
import Section from './Section';

export default function Hero() {
  return (
    <Section className="pt-32 md:pt-40" background="white" id="hero">
      <div className="text-center max-w-4xl mx-auto animate-fade-in">
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-vexto-primary/10 to-vexto-secondary/10 px-4 py-2 rounded-full mb-6 shadow-subtle hover:shadow-glow transition-all duration-smooth">
          <Sparkles size={16} className="text-vexto-primary" />
          <span className="text-sm font-medium text-vexto-dark">
            Making things simpler is harder
          </span>
        </div>

        <h1 className="mb-6">
          Simplicity in Every Click
        </h1>

        <p className="text-xl text-vexto-slate mb-4 max-w-2xl mx-auto font-medium">
          Micro apps that make your daily tasks effortless.
        </p>

        <p className="text-lg text-vexto-slate-light mb-16 max-w-2xl mx-auto">
          At Vexto, we believe making things simpler is harder. That's why we craft micro apps that do one thing perfectly—helping you get things done faster.
        </p>

        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="group">
            <div className="text-3xl font-bold text-vexto-primary mb-2 group-hover:scale-110 transition-transform duration-smooth">6+</div>
            <div className="text-sm text-vexto-slate">Micro-Apps</div>
          </div>
          <div className="group">
            <div className="text-3xl font-bold text-vexto-secondary mb-2 group-hover:scale-110 transition-transform duration-smooth">100%</div>
            <div className="text-sm text-vexto-slate">Free to Use</div>
          </div>
          <div className="group">
            <div className="text-3xl font-bold text-vexto-accent mb-2 group-hover:scale-110 transition-transform duration-smooth">Fast</div>
            <div className="text-sm text-vexto-slate">Performance</div>
          </div>
          <div className="group">
            <div className="text-3xl font-bold text-vexto-dark-turquoise mb-2 group-hover:scale-110 transition-transform duration-smooth">Simple</div>
            <div className="text-sm text-vexto-slate">Interface</div>
          </div>
        </div>
      </div>
    </Section>
  );
}

import { Target, Heart, Lightbulb } from 'lucide-react';
import Section from './Section';

export default function About() {
  return (
    <Section background="gray" id="about">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="mb-4">Why Simplicity Matters</h2>
          <p className="text-xl text-vexto-slate max-w-2xl mx-auto">
            We believe great tools should get out of your way and let you focus on what matters.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="text-center group">
            <div className="w-16 h-16 bg-vexto-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-vexto-primary group-hover:shadow-glow transition-all duration-smooth">
              <Target size={32} className="text-vexto-primary group-hover:text-white transition-colors duration-smooth" />
            </div>
            <h3 className="mb-3 text-lg">One Purpose, Perfectly Executed</h3>
            <p className="text-vexto-slate-light text-sm">
              Every app solves one problem exceptionally well, without unnecessary features that get in the way.
            </p>
          </div>

          <div className="text-center group">
            <div className="w-16 h-16 bg-vexto-accent/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-vexto-accent group-hover:shadow-glow transition-all duration-smooth">
              <Heart size={32} className="text-vexto-accent group-hover:text-white transition-colors duration-smooth" />
            </div>
            <h3 className="mb-3 text-lg">No Learning Curve Required</h3>
            <p className="text-vexto-slate-light text-sm">
              Beautiful interfaces that feel intuitive from the first click. Start using them immediately, no tutorials needed.
            </p>
          </div>

          <div className="text-center group">
            <div className="w-16 h-16 bg-vexto-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-vexto-secondary group-hover:shadow-glow transition-all duration-smooth">
              <Lightbulb size={32} className="text-vexto-secondary group-hover:text-white transition-colors duration-smooth" />
            </div>
            <h3 className="mb-3 text-lg">Works Instantly, Every Time</h3>
            <p className="text-vexto-slate-light text-sm">
              Fast, reliable, and always available. No setup, no configuration—just open and use.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-card p-8 md:p-12 shadow-card border border-vexto-light">
          <h3 className="mb-4">The Vexto Story</h3>
          <div className="space-y-4 text-vexto-slate">
            <p>
              In a world of bloated software and overcomplicated interfaces, we saw an opportunity to do things differently. Vexto was born from the belief that powerful tools don't have to be complex.
            </p>
            <p>
              We spent countless hours removing features, simplifying workflows, and refining interfaces. Because we know that making things simpler is harder than adding more. But it's worth it.
            </p>
            <p>
              Today, Vexto is an ecosystem of micro-apps that each do one thing brilliantly. Whether you need to track time, take notes, or manage tasks, we've built tools that respect your time and intelligence.
            </p>
            <p className="font-medium text-vexto-dark">
              Welcome to simplicity. Welcome to Vexto.
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}

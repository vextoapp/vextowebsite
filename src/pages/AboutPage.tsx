import { Target, Heart, Lightbulb, Zap, Shield, Clock } from 'lucide-react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import Section from '../components/Section';
import { trackPageView } from '../utils/analytics';

export default function AboutPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
    trackPageView();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <main className="pt-16">
        <Section background="white">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="mb-6">About Vexto</h1>
            <p className="text-2xl text-gray-600 mb-8">
              Making things simpler is harder
            </p>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              In a world of bloated software and overcomplicated interfaces, we believe there's a better way.
            </p>
          </div>
        </Section>

        <Section background="gray">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-card p-8 md:p-12 mb-12">
              <h2 className="mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-600 text-lg">
                <p>
                  Vexto was born from a simple observation: most software tries to do too much. Feature bloat, endless menus, and complex workflows have become the norm. But we asked ourselves—what if tools could be different?
                </p>
                <p>
                  We started with a bold idea: create micro-apps that each do one thing brilliantly. No feature creep. No unnecessary complexity. Just focused tools that respect your time and intelligence.
                </p>
                <p>
                  The hardest part wasn't adding features—it was deciding what to leave out. We spent countless hours removing buttons, simplifying workflows, and refining interfaces. Because we know that making things simpler is harder than making them complex.
                </p>
                <p>
                  Today, Vexto is an ecosystem of single-purpose tools. Whether you need to focus, take notes, or find the perfect color, we've built apps that get out of your way and let you work.
                </p>
                <p className="font-medium text-vexto-dark text-xl pt-4">
                  Welcome to simplicity. Welcome to Vexto.
                </p>
              </div>
            </div>

            <h2 className="mb-8 text-center">The Micro-Apps Philosophy</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="bg-white rounded-card p-6">
                <div className="w-12 h-12 bg-vexto-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Target size={24} className="text-vexto-primary" />
                </div>
                <h3 className="mb-3 text-lg">Single Purpose</h3>
                <p className="text-gray-600">
                  Every app solves one problem exceptionally well. No feature bloat, no distractions—just what you need, when you need it.
                </p>
              </div>

              <div className="bg-white rounded-card p-6">
                <div className="w-12 h-12 bg-vexto-secondary/10 rounded-lg flex items-center justify-center mb-4">
                  <Zap size={24} className="text-vexto-secondary" />
                </div>
                <h3 className="mb-3 text-lg">Lightning Fast</h3>
                <p className="text-gray-600">
                  Built for speed. Our apps load instantly and respond immediately. No loading screens, no waiting—just pure efficiency.
                </p>
              </div>

              <div className="bg-white rounded-card p-6">
                <div className="w-12 h-12 bg-vexto-accent/10 rounded-lg flex items-center justify-center mb-4">
                  <Heart size={24} className="text-vexto-accent" />
                </div>
                <h3 className="mb-3 text-lg">No Learning Curve</h3>
                <p className="text-gray-600">
                  Intuitive interfaces that make sense from the first click. Start using them immediately—no tutorials, no manuals required.
                </p>
              </div>

              <div className="bg-white rounded-card p-6">
                <div className="w-12 h-12 bg-vexto-dark-turquoise/10 rounded-lg flex items-center justify-center mb-4">
                  <Shield size={24} className="text-vexto-dark-turquoise" />
                </div>
                <h3 className="mb-3 text-lg">Privacy First</h3>
                <p className="text-gray-600">
                  Your data belongs to you. Many of our apps store data locally on your device, with no server storage required.
                </p>
              </div>

              <div className="bg-white rounded-card p-6">
                <div className="w-12 h-12 bg-vexto-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Lightbulb size={24} className="text-vexto-primary" />
                </div>
                <h3 className="mb-3 text-lg">Always Available</h3>
                <p className="text-gray-600">
                  Work offline, work online—it doesn't matter. Our apps are designed to be reliable and accessible whenever you need them.
                </p>
              </div>

              <div className="bg-white rounded-card p-6">
                <div className="w-12 h-12 bg-vexto-accent/10 rounded-lg flex items-center justify-center mb-4">
                  <Clock size={24} className="text-vexto-accent" />
                </div>
                <h3 className="mb-3 text-lg">Respect Your Time</h3>
                <p className="text-gray-600">
                  No setup, no configuration, no accounts to create. Just open an app and start working. It's that simple.
                </p>
              </div>
            </div>
          </div>
        </Section>

        <Section background="white">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="mb-6">Our Values</h2>
            <div className="space-y-6 text-left">
              <div className="border-l-4 border-vexto-primary pl-6">
                <h3 className="mb-2 text-lg">Simplicity Over Complexity</h3>
                <p className="text-gray-600">
                  We believe the best tools are the ones you don't have to think about. Every feature we add must justify its existence.
                </p>
              </div>

              <div className="border-l-4 border-vexto-primary pl-6">
                <h3 className="mb-2 text-lg">Speed Over Features</h3>
                <p className="text-gray-600">
                  A fast, focused tool beats a slow, feature-rich one every time. We optimize for performance and responsiveness.
                </p>
              </div>

              <div className="border-l-4 border-vexto-primary pl-6">
                <h3 className="mb-2 text-lg">Privacy Over Profits</h3>
                <p className="text-gray-600">
                  We don't sell your data. We don't track your behavior. We build tools that respect your privacy and put you in control.
                </p>
              </div>

              <div className="border-l-4 border-vexto-primary pl-6">
                <h3 className="mb-2 text-lg">Design Over Decoration</h3>
                <p className="text-gray-600">
                  Beautiful design serves a purpose. Every pixel, every interaction is intentional and focused on helping you work better.
                </p>
              </div>
            </div>
          </div>
        </Section>

        <Section background="gray">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="mb-6">Ready to Experience Simplicity?</h2>
            <p className="text-xl text-gray-600 mb-8">
              Join thousands of users who have discovered that powerful tools don't have to be complicated.
            </p>
            <Link
              to="/"
              className="inline-block bg-gradient-to-r from-vexto-primary to-vexto-accent text-white px-8 py-4 rounded-button font-medium hover:shadow-glow transition-smooth"
            >
              Explore Our Apps
            </Link>
          </div>
        </Section>
      </main>
      <Footer />
    </div>
  );
}

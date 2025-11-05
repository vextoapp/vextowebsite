import Navigation from '../components/Navigation';
import Hero from '../components/Hero';
import AppsShowcase from '../components/AppsShowcase';
import ComingSoon from '../components/ComingSoon';
import Features from '../components/Features';
import About from '../components/About';
import Footer from '../components/Footer';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <main>
        <Hero />
        <AppsShowcase />
        <ComingSoon />
        <Features />
        <About />
      </main>
      <Footer />
    </div>
  );
}

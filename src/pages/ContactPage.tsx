import { useState, FormEvent, useEffect } from 'react';
import { Mail, Send, CheckCircle, Github, Linkedin } from 'lucide-react';
import XIcon from '../components/XIcon';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import Section from '../components/Section';
import Input from '../components/Input';
import Button from '../components/Button';
import { submitContactForm } from '../utils/analytics';
import { trackPageView } from '../utils/analytics';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
    trackPageView();
  }, []);

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) {
      setError('Please enter your name');
      return;
    }

    if (!email.trim()) {
      setError('Please enter your email address');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    if (!message.trim()) {
      setError('Please enter a message');
      return;
    }

    if (message.trim().length < 10) {
      setError('Message must be at least 10 characters long');
      return;
    }

    setLoading(true);

    const result = await submitContactForm({
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
      source: 'contact_page',
    });

    setLoading(false);

    if (result.success) {
      setSuccess(true);
      setName('');
      setEmail('');
      setMessage('');
    } else {
      setError(result.error || 'Failed to submit. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <main className="pt-16">
        <Section background="white" className="!pb-8">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-vexto-accent/20 to-vexto-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Mail size={32} className="text-vexto-accent" />
            </div>
            <h1 className="mb-6">Get in Touch</h1>
            <p className="text-xl text-gray-600 mb-8">
              Have a question, suggestion, or just want to say hello? We'd love to hear from you.
            </p>
          </div>
        </Section>

        <Section background="gray" className="!pt-8">
          <div className="max-w-2xl mx-auto">
            {!success ? (
              <div className="bg-white rounded-card p-8 md:p-12">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Name
                    </label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      disabled={loading}
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={loading}
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={6}
                      placeholder="Tell us what's on your mind..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      disabled={loading}
                      className="w-full px-4 py-3 border border-gray-300 rounded-button focus:outline-none focus:ring-2 focus:ring-vexto-primary focus:border-transparent transition-smooth disabled:bg-gray-100 disabled:cursor-not-allowed resize-none"
                    />
                  </div>

                  {error && (
                    <div className="p-4 bg-error/10 border border-error/20 rounded-button text-error text-sm">
                      {error}
                    </div>
                  )}

                  <Button type="submit" disabled={loading} className="w-full">
                    <Send size={18} className="mr-2" />
                    {loading ? 'Sending...' : 'Send Message'}
                  </Button>
                </form>
              </div>
            ) : (
              <div className="bg-white rounded-card p-8 md:p-12 text-center">
                <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle size={32} className="text-success" />
                </div>

                <h2 className="mb-4">Message Sent!</h2>

                <p className="text-xl text-gray-600 mb-6">
                  Thank you for reaching out. We'll get back to you as soon as possible.
                </p>

                <button
                  onClick={() => setSuccess(false)}
                  className="text-vexto-primary hover:underline transition-smooth"
                >
                  Send another message
                </button>
              </div>
            )}
          </div>
        </Section>

        <Section background="white">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="mb-4">Other Ways to Reach Us</h2>
              <p className="text-gray-600">
                Prefer email? You can reach us directly at{' '}
                <a
                  href="mailto:vextoapp@proton.me"
                  className="text-vexto-primary hover:underline"
                >
                  vextoapp@proton.me
                </a>
              </p>
            </div>

            <div className="bg-gray-50 rounded-card p-8">
              <h3 className="mb-4 text-center">Connect With Us</h3>
              <div className="flex justify-center gap-6">
                <a
                  href="https://x.com/vextoapp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-2 text-gray-600 hover:text-vexto-secondary transition-smooth"
                  aria-label="X"
                >
                  <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-sm">
                    <XIcon size={24} />
                  </div>
                  <span className="text-sm">X</span>
                </a>
                <a
                  href="https://github.com/vextoapp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-2 text-gray-600 hover:text-vexto-secondary transition-smooth"
                  aria-label="GitHub"
                >
                  <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-sm">
                    <Github size={24} />
                  </div>
                  <span className="text-sm">GitHub</span>
                </a>
                <a
                  href="https://www.linkedin.com/company/vextoapps"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-2 text-gray-600 hover:text-vexto-secondary transition-smooth"
                  aria-label="LinkedIn"
                >
                  <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-sm">
                    <Linkedin size={24} />
                  </div>
                  <span className="text-sm">LinkedIn</span>
                </a>
              </div>
            </div>
          </div>
        </Section>
      </main>
      <Footer />
    </div>
  );
}

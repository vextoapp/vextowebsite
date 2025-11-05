import { useState, FormEvent } from 'react';
import { Mail, CheckCircle, AlertCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';
import Button from './Button';
import Input from './Input';

type SubmissionState = 'idle' | 'submitting' | 'success' | 'error';

interface EmailSignupFormProps {
  source?: string;
  variant?: 'default' | 'footer';
}

export default function EmailSignupForm({ source = 'landing_cta', variant = 'default' }: EmailSignupFormProps) {
  const [email, setEmail] = useState('');
  const [state, setState] = useState<SubmissionState>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setState('error');
      setErrorMessage('Please enter a valid email address');
      return;
    }

    setState('submitting');
    setErrorMessage('');

    try {
      const { error } = await supabase
        .from('email_signups')
        .insert([
          {
            email: email.toLowerCase().trim(),
            source,
            subscribed: true
          }
        ]);

      if (error) {
        if (error.code === '23505') {
          setState('error');
          setErrorMessage('This email is already subscribed!');
        } else {
          setState('error');
          setErrorMessage('Something went wrong. Please try again.');
        }
      } else {
        setState('success');
        setEmail('');
      }
    } catch (err) {
      setState('error');
      setErrorMessage('Unable to connect. Please try again later.');
    }
  };

  if (state === 'success') {
    return (
      <div className={variant === 'default' ? 'max-w-md mx-auto' : ''}>
        <div className={`flex items-center gap-3 p-4 rounded-lg animate-fade-in ${
          variant === 'footer'
            ? 'bg-white/10 backdrop-blur-sm border border-white/20'
            : 'bg-green-50 border border-green-200'
        }`}>
          <CheckCircle size={20} className={`flex-shrink-0 ${variant === 'footer' ? 'text-vexto-secondary' : 'text-green-600'}`} />
          <div className="text-left">
            <p className={`font-medium text-sm ${variant === 'footer' ? 'text-white' : 'text-green-900'}`}>
              Thank you for subscribing!
            </p>
            <p className={`text-xs mt-1 ${variant === 'footer' ? 'text-vexto-slate-light' : 'text-green-700'}`}>
              We'll keep you updated on new apps and features.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={variant === 'default' ? 'max-w-md mx-auto' : ''}>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className={`flex gap-2 ${variant === 'footer' ? 'flex-row' : 'flex-col sm:flex-row'}`}>
          <div className="flex-1">
            <Input
              type="email"
              placeholder={variant === 'footer' ? 'your@email.com' : 'Enter your email'}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (state === 'error') {
                  setState('idle');
                  setErrorMessage('');
                }
              }}
              disabled={state === 'submitting'}
              className={`w-full ${
                variant === 'footer'
                  ? 'bg-white/10 border-white/20 text-white placeholder:text-vexto-slate-light focus:border-vexto-secondary focus:ring-vexto-secondary/20 backdrop-blur-sm'
                  : ''
              }`}
              aria-label="Email address"
              required
            />
          </div>
          <Button
            type="submit"
            disabled={state === 'submitting' || !email.trim()}
            className={`flex items-center justify-center gap-2 ${
              variant === 'footer'
                ? 'px-4 bg-gradient-to-r from-vexto-secondary to-vexto-primary hover:shadow-glow-turquoise'
                : 'sm:w-auto w-full'
            }`}
          >
            {state === 'submitting' ? (
              <>
                <Mail size={16} className="animate-pulse" />
                {variant === 'default' && <span>Subscribing...</span>}
              </>
            ) : (
              <>
                <Mail size={16} />
                {variant === 'default' && <span>Subscribe</span>}
              </>
            )}
          </Button>
        </div>

        {state === 'error' && errorMessage && (
          <div className={`flex items-start gap-2 p-3 rounded-lg animate-fade-in ${
            variant === 'footer'
              ? 'bg-red-500/10 backdrop-blur-sm border border-red-400/30'
              : 'bg-red-50 border border-red-200'
          }`}>
            <AlertCircle size={16} className={`flex-shrink-0 mt-0.5 ${variant === 'footer' ? 'text-red-300' : 'text-red-600'}`} />
            <p className={`text-xs ${variant === 'footer' ? 'text-red-200' : 'text-red-700'}`}>{errorMessage}</p>
          </div>
        )}

        {variant === 'default' && (
          <p className="text-sm text-vexto-slate text-center">
            We respect your privacy. Unsubscribe at any time.
          </p>
        )}

        {variant === 'footer' && (
          <p className="text-xs text-white/60 mt-1">
            We respect your privacy. Unsubscribe at any time.
          </p>
        )}
      </form>
    </div>
  );
}

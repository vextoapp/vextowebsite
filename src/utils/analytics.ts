import { supabase, AnalyticsEvent, EmailSignup } from '../lib/supabase';

export async function trackEvent(event: AnalyticsEvent): Promise<void> {
  try {
    const { error } = await supabase
      .from('analytics')
      .insert({
        event_type: event.event_type,
        app_id: event.app_id || null,
        metadata: event.metadata || {},
      });

    if (error) {
      console.error('Failed to track event:', error);
    }
  } catch (err) {
    console.error('Error tracking event:', err);
  }
}

export async function trackPageView(): Promise<void> {
  await trackEvent({
    event_type: 'page_view',
    metadata: {
      path: window.location.pathname,
      referrer: document.referrer,
      timestamp: new Date().toISOString(),
    },
  });
}

export async function trackAppLaunch(appId: string, appName: string): Promise<void> {
  await trackEvent({
    event_type: 'app_launch',
    app_id: appId,
    metadata: {
      app_name: appName,
      timestamp: new Date().toISOString(),
    },
  });
}

export async function trackCTAClick(ctaLocation: string): Promise<void> {
  await trackEvent({
    event_type: 'cta_click',
    metadata: {
      location: ctaLocation,
      timestamp: new Date().toISOString(),
    },
  });
}

export async function submitEmailSignup(signup: EmailSignup): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabase
      .from('email_signups')
      .insert({
        email: signup.email,
        source: signup.source || 'unknown',
      });

    if (error) {
      if (error.code === '23505') {
        return { success: false, error: 'This email is already registered' };
      }
      return { success: false, error: error.message };
    }

    await trackEvent({
      event_type: 'email_signup',
      metadata: {
        source: signup.source,
        timestamp: new Date().toISOString(),
      },
    });

    return { success: true };
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Failed to submit email',
    };
  }
}

export interface ContactSubmission {
  name: string;
  email: string;
  message: string;
  source?: string;
}

export async function submitContactForm(submission: ContactSubmission): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabase
      .from('contact_submissions')
      .insert({
        name: submission.name,
        email: submission.email,
        message: submission.message,
        source: submission.source || 'contact_page',
      });

    if (error) {
      return { success: false, error: error.message };
    }

    await trackEvent({
      event_type: 'cta_click',
      metadata: {
        location: 'contact_form_submission',
        timestamp: new Date().toISOString(),
      },
    });

    return { success: true };
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Failed to submit contact form',
    };
  }
}

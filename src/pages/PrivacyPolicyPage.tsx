import { useEffect } from 'react';
import { Shield } from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import Section from '../components/Section';
import { trackPageView } from '../utils/analytics';

export default function PrivacyPolicyPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
    trackPageView();
  }, []);

  const lastUpdated = 'October 21, 2025';

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <main className="pt-16">
        <Section background="white">
          <div className="max-w-4xl mx-auto text-center">
            <div className="w-16 h-16 bg-vexto-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Shield size={32} className="text-vexto-primary" />
            </div>
            <h1 className="mb-4">Privacy Policy</h1>
            <p className="text-gray-600 mb-2">Last Updated: {lastUpdated}</p>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              At Vexto, your privacy is our priority. We believe in transparency and putting you in control of your data.
            </p>
          </div>
        </Section>

        <Section background="gray">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-card p-8 md:p-12 space-y-8">
              <div>
                <h2 className="mb-4">Our Commitment to Privacy</h2>
                <p className="text-gray-600 text-lg mb-4">
                  Vexto is built on the principle of simplicity and respect for users. This extends to how we handle your personal information. We collect minimal data, use it only for essential purposes, and never sell or share it with third parties.
                </p>
                <p className="text-gray-600 text-lg">
                  Many of our apps are designed to work entirely on your device, meaning your data stays with you—where it belongs.
                </p>
              </div>

              <div className="border-t border-gray-200 pt-8">
                <h2 className="mb-4">What Information We Collect</h2>
                <div className="space-y-4 text-gray-600">
                  <div>
                    <h3 className="text-lg font-medium text-vexto-dark mb-2">Website Analytics</h3>
                    <p>
                      We collect basic analytics data to understand how our website is used, including:
                    </p>
                    <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                      <li>Pages visited and time spent on our website</li>
                      <li>Browser type and device information</li>
                      <li>Referral sources</li>
                      <li>General location information (country/city level)</li>
                    </ul>
                    <p className="mt-2">
                      This data is aggregated and anonymous. We use it to improve our website and user experience.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-vexto-dark mb-2">Email Signups</h3>
                    <p>
                      If you choose to subscribe to our newsletter or updates, we collect:
                    </p>
                    <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                      <li>Your email address</li>
                      <li>Signup date and source page</li>
                    </ul>
                    <p className="mt-2">
                      We use this information solely to send you updates about new apps and features. You can unsubscribe at any time.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-vexto-dark mb-2">Contact Forms</h3>
                    <p>
                      When you contact us through our contact form, we collect:
                    </p>
                    <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                      <li>Your name and email address</li>
                      <li>The message you send us</li>
                      <li>Date and time of submission</li>
                    </ul>
                    <p className="mt-2">
                      This information is used only to respond to your inquiry and provide support.
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-8">
                <h2 className="mb-4">App-Specific Privacy Information</h2>
                <div className="space-y-6 text-gray-600">
                  <div className="bg-vexto-light rounded-lg p-6 border border-vexto-light">
                    <h3 className="text-lg font-medium text-vexto-dark mb-2">Vexto Notes</h3>
                    <p className="font-medium text-vexto-secondary mb-2">All data stays on your device.</p>
                    <p>
                      Vexto Notes stores all your notes locally in your browser's storage. We do not have access to your notes, and they are never sent to our servers. Your notes remain completely private and under your control.
                    </p>
                    <p className="mt-2 text-sm italic">
                      Note: Clearing your browser data will delete your notes. Consider exporting important notes regularly.
                    </p>
                  </div>

                  <div className="bg-vexto-light rounded-lg p-6 border border-vexto-light">
                    <h3 className="text-lg font-medium text-vexto-dark mb-2">Vexto Focus</h3>
                    <p className="font-medium text-vexto-secondary mb-2">All data stays on your device.</p>
                    <p>
                      Vexto Focus stores your timer preferences and session history locally in your browser. No data is transmitted to our servers.
                    </p>
                  </div>

                  <div className="bg-vexto-light rounded-lg p-6 border border-vexto-light">
                    <h3 className="text-lg font-medium text-vexto-dark mb-2">Vexto Colors</h3>
                    <p className="font-medium text-vexto-secondary mb-2">All data stays on your device.</p>
                    <p>
                      Vexto Colors stores your color history and favorites locally in your browser. No color data is sent to our servers.
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-8">
                <h2 className="mb-4">How We Use Your Information</h2>
                <div className="space-y-3 text-gray-600">
                  <p>We use the information we collect only for these purposes:</p>
                  <ul className="list-disc list-inside ml-4 space-y-2">
                    <li>To improve our website and apps based on usage patterns</li>
                    <li>To communicate with you about updates and new features (only if you opted in)</li>
                    <li>To respond to your support requests and inquiries</li>
                    <li>To ensure the security and proper functioning of our services</li>
                  </ul>
                  <p className="mt-4 font-medium text-vexto-dark">
                    We will never sell, rent, or share your personal information with third parties for marketing purposes.
                  </p>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-8">
                <h2 className="mb-4">Data Storage and Security</h2>
                <div className="space-y-3 text-gray-600">
                  <p>
                    We take reasonable measures to protect your information from unauthorized access, alteration, or destruction. Our infrastructure uses industry-standard security practices:
                  </p>
                  <ul className="list-disc list-inside ml-4 space-y-2">
                    <li>All data transmitted to our servers is encrypted using HTTPS</li>
                    <li>We use secure, reputable hosting services with strong security measures</li>
                    <li>Access to user data is strictly limited to essential personnel only</li>
                    <li>We regularly review and update our security practices</li>
                  </ul>
                  <p className="mt-4">
                    However, no method of transmission over the internet is 100% secure. While we strive to protect your information, we cannot guarantee absolute security.
                  </p>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-8">
                <h2 className="mb-4">Third-Party Services</h2>
                <div className="space-y-3 text-gray-600">
                  <p>
                    Vexto uses minimal third-party services to operate:
                  </p>
                  <ul className="list-disc list-inside ml-4 space-y-2">
                    <li>
                      <strong>Supabase:</strong> We use Supabase for database and backend services. They have their own privacy policy governing data handling.
                    </li>
                    <li>
                      <strong>Hosting Provider:</strong> Our website is hosted on secure, enterprise-grade infrastructure.
                    </li>
                  </ul>
                  <p className="mt-4">
                    We carefully vet all third-party services to ensure they meet our privacy and security standards.
                  </p>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-8">
                <h2 className="mb-4">Your Rights and Choices</h2>
                <div className="space-y-3 text-gray-600">
                  <p>You have complete control over your data:</p>
                  <ul className="list-disc list-inside ml-4 space-y-2">
                    <li>
                      <strong>Access:</strong> You can request a copy of any personal data we have about you
                    </li>
                    <li>
                      <strong>Correction:</strong> You can request corrections to any inaccurate information
                    </li>
                    <li>
                      <strong>Deletion:</strong> You can request deletion of your data at any time
                    </li>
                    <li>
                      <strong>Opt-Out:</strong> You can unsubscribe from emails using the link in any message
                    </li>
                    <li>
                      <strong>Local Data:</strong> For apps that store data locally, you can clear your data through your browser settings
                    </li>
                  </ul>
                  <p className="mt-4">
                    To exercise any of these rights, contact us at{' '}
                    <a href="mailto:vextoapp@proton.me" className="text-vexto-primary hover:underline">
                      vextoapp@proton.me
                    </a>
                    .
                  </p>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-8">
                <h2 className="mb-4">Cookies and Local Storage</h2>
                <div className="space-y-3 text-gray-600">
                  <p>
                    Our website and apps use browser storage technologies to function properly:
                  </p>
                  <ul className="list-disc list-inside ml-4 space-y-2">
                    <li>
                      <strong>Essential Storage:</strong> Required for apps like Vexto Notes to save your data locally
                    </li>
                    <li>
                      <strong>Analytics:</strong> Used to remember your preferences and understand how you use our site
                    </li>
                  </ul>
                  <p className="mt-4">
                    You can control or delete cookies through your browser settings. Note that disabling storage may affect app functionality.
                  </p>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-8">
                <h2 className="mb-4">Children's Privacy</h2>
                <div className="text-gray-600">
                  <p>
                    Vexto is not directed at children under 13 years of age. We do not knowingly collect personal information from children. If you believe a child has provided us with personal information, please contact us immediately.
                  </p>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-8">
                <h2 className="mb-4">Changes to This Policy</h2>
                <div className="text-gray-600">
                  <p>
                    We may update this privacy policy from time to time to reflect changes in our practices or legal requirements. We will notify you of any material changes by posting the new policy on this page and updating the "Last Updated" date.
                  </p>
                  <p className="mt-4">
                    Continued use of Vexto after changes indicates your acceptance of the updated policy.
                  </p>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-8">
                <h2 className="mb-4">Contact Us</h2>
                <div className="text-gray-600">
                  <p>
                    If you have questions about this privacy policy or how we handle your data, please reach out:
                  </p>
                  <div className="mt-4 space-y-2">
                    <p>
                      <strong>Email:</strong>{' '}
                      <a href="mailto:vextoapp@proton.me" className="text-vexto-primary hover:underline">
                        vextoapp@proton.me
                      </a>
                    </p>
                    <p>
                      <strong>Contact Form:</strong>{' '}
                      <a href="/contact" className="text-vexto-primary hover:underline">
                        vexto.app/contact
                      </a>
                    </p>
                  </div>
                  <p className="mt-6 text-sm italic">
                    We're committed to addressing your privacy concerns and will respond to all inquiries promptly.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Section>
      </main>
      <Footer />
    </div>
  );
}

import { useEffect } from 'react';
import { FileText } from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import Section from '../components/Section';
import { trackPageView } from '../utils/analytics';

export default function TermsOfServicePage() {
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
            <div className="w-16 h-16 bg-vexto-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <FileText size={32} className="text-vexto-accent" />
            </div>
            <h1 className="mb-4">Terms of Service</h1>
            <p className="text-gray-600 mb-2">Last Updated: {lastUpdated}</p>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Please read these terms carefully before using Vexto's services.
            </p>
          </div>
        </Section>

        <Section background="gray">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-card p-8 md:p-12 space-y-8">
              <div>
                <h2 className="mb-4">Agreement to Terms</h2>
                <p className="text-gray-600 text-lg">
                  By accessing or using Vexto's website and applications ("Services"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our Services.
                </p>
              </div>

              <div className="border-t border-gray-200 pt-8">
                <h2 className="mb-4">Description of Services</h2>
                <div className="space-y-3 text-gray-600">
                  <p>
                    Vexto provides free web-based productivity applications, including but not limited to:
                  </p>
                  <ul className="list-disc list-inside ml-4 space-y-2">
                    <li>Vexto Notes - A simple note-taking application</li>
                    <li>Vexto Focus - A productivity timer application</li>
                    <li>Vexto Colors - A color palette tool</li>
                  </ul>
                  <p className="mt-4">
                    These Services are provided free of charge and are intended for personal and professional use.
                  </p>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-8">
                <h2 className="mb-4">Use of Services</h2>
                <div className="space-y-3 text-gray-600">
                  <p>You agree to use our Services only for lawful purposes and in accordance with these Terms. You agree not to:</p>
                  <ul className="list-disc list-inside ml-4 space-y-2">
                    <li>Use the Services in any way that violates applicable laws or regulations</li>
                    <li>Attempt to gain unauthorized access to any part of the Services</li>
                    <li>Interfere with or disrupt the Services or servers</li>
                    <li>Use automated systems to access the Services without permission</li>
                    <li>Transmit viruses, malware, or other malicious code</li>
                    <li>Attempt to reverse engineer or decompile any part of the Services</li>
                  </ul>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-8">
                <h2 className="mb-4">Service Provided "AS IS"</h2>
                <div className="space-y-3 text-gray-600">
                  <p className="font-medium text-vexto-dark">
                    THE SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED.
                  </p>
                  <p>
                    Vexto makes no guarantees regarding:
                  </p>
                  <ul className="list-disc list-inside ml-4 space-y-2">
                    <li>The availability, reliability, or uptime of the Services</li>
                    <li>The accuracy, completeness, or usefulness of any information</li>
                    <li>That the Services will be uninterrupted, secure, or error-free</li>
                    <li>That defects will be corrected</li>
                    <li>That the Services will meet your specific requirements</li>
                  </ul>
                  <p className="mt-4">
                    You use the Services at your own risk and discretion.
                  </p>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-8">
                <h2 className="mb-4">Limitation of Liability</h2>
                <div className="space-y-3 text-gray-600">
                  <p className="font-medium text-vexto-dark">
                    TO THE MAXIMUM EXTENT PERMITTED BY LAW, VEXTO SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER INCURRED DIRECTLY OR INDIRECTLY, OR ANY LOSS OF DATA, USE, OR OTHER INTANGIBLE LOSSES.
                  </p>
                  <p className="mt-4">
                    This includes but is not limited to damages resulting from:
                  </p>
                  <ul className="list-disc list-inside ml-4 space-y-2">
                    <li>Use or inability to use the Services</li>
                    <li>Loss of data or content stored using the Services</li>
                    <li>Unauthorized access to or alteration of your data</li>
                    <li>Service interruptions or errors</li>
                    <li>Any bugs, viruses, or malicious code transmitted through the Services</li>
                    <li>Any conduct or content of third parties</li>
                  </ul>
                  <p className="mt-4 font-medium">
                    Our total liability to you for any claims arising from or related to these Terms or the Services shall not exceed $10 USD.
                  </p>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-8">
                <h2 className="mb-4">User Responsibilities</h2>
                <div className="space-y-3 text-gray-600">
                  <p>You are solely responsible for:</p>
                  <ul className="list-disc list-inside ml-4 space-y-2">
                    <li>All content you create, store, or share using our Services</li>
                    <li>Maintaining backups of any important data or content</li>
                    <li>Your use of the Services and any consequences thereof</li>
                    <li>Maintaining the security of your device and browser</li>
                    <li>Any damages to your device or data loss that may result from using the Services</li>
                  </ul>
                  <p className="mt-4 bg-amber-50 border border-amber-200 rounded-lg p-4">
                    <strong className="text-amber-800">Important:</strong> Many of our applications store data locally in your browser. Clearing your browser data will delete this information permanently. We are not responsible for any data loss.
                  </p>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-8">
                <h2 className="mb-4">Intellectual Property</h2>
                <div className="space-y-3 text-gray-600">
                  <p>
                    All rights, title, and interest in the Services, including all software, designs, text, graphics, logos, and other content (excluding user-generated content), are owned by Vexto and are protected by copyright, trademark, and other intellectual property laws.
                  </p>
                  <p>
                    You retain all rights to any content you create using our Services. However, you grant Vexto a non-exclusive license to host and display such content solely for the purpose of providing the Services to you.
                  </p>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-8">
                <h2 className="mb-4">Third-Party Links and Services</h2>
                <div className="space-y-3 text-gray-600">
                  <p>
                    Our Services may contain links to third-party websites or services that are not owned or controlled by Vexto. We are not responsible for the content, privacy policies, or practices of any third-party sites or services.
                  </p>
                  <p>
                    You acknowledge and agree that Vexto shall not be liable for any damage or loss caused by your use of any third-party content, goods, or services.
                  </p>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-8">
                <h2 className="mb-4">Modifications and Termination</h2>
                <div className="space-y-3 text-gray-600">
                  <p>
                    Vexto reserves the right to:
                  </p>
                  <ul className="list-disc list-inside ml-4 space-y-2">
                    <li>Modify, suspend, or discontinue any part of the Services at any time without notice</li>
                    <li>Update these Terms of Service at any time</li>
                    <li>Refuse service to anyone for any reason</li>
                    <li>Impose limits on certain features or restrict access to parts of the Services</li>
                  </ul>
                  <p className="mt-4">
                    Changes to these Terms will be effective immediately upon posting. Your continued use of the Services after changes indicates acceptance of the modified Terms.
                  </p>
                  <p className="mt-4 font-medium text-vexto-charcoal">
                    We are not liable to you or any third party for any modification, suspension, or discontinuation of the Services.
                  </p>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-8">
                <h2 className="mb-4">No Guarantees</h2>
                <div className="space-y-3 text-gray-600">
                  <p>
                    Vexto provides these Services free of charge as a convenience. We make no commitments regarding:
                  </p>
                  <ul className="list-disc list-inside ml-4 space-y-2">
                    <li>Continued availability of any Service or feature</li>
                    <li>Response times for support requests</li>
                    <li>Data backup or recovery</li>
                    <li>Compatibility with specific devices or browsers</li>
                    <li>Future updates or improvements</li>
                  </ul>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-8">
                <h2 className="mb-4">Indemnification</h2>
                <div className="space-y-3 text-gray-600">
                  <p>
                    You agree to indemnify, defend, and hold harmless Vexto, its affiliates, and their respective officers, directors, employees, and agents from and against any claims, liabilities, damages, losses, costs, or expenses (including reasonable attorneys' fees) arising out of or in any way connected with:
                  </p>
                  <ul className="list-disc list-inside ml-4 space-y-2">
                    <li>Your access to or use of the Services</li>
                    <li>Your violation of these Terms</li>
                    <li>Your violation of any rights of another party</li>
                    <li>Any content you submit or transmit through the Services</li>
                  </ul>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-8">
                <h2 className="mb-4">Privacy</h2>
                <div className="space-y-3 text-gray-600">
                  <p>
                    Your use of the Services is also governed by our Privacy Policy. Please review our{' '}
                    <a href="/privacy" className="text-vexto-primary hover:underline">
                      Privacy Policy
                    </a>
                    {' '}to understand how we collect and use information.
                  </p>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-8">
                <h2 className="mb-4">Governing Law and Disputes</h2>
                <div className="space-y-3 text-gray-600">
                  <p>
                    These Terms shall be governed by and construed in accordance with the laws of the United States, without regard to its conflict of law provisions.
                  </p>
                  <p>
                    Any disputes arising from these Terms or your use of the Services shall be resolved through binding arbitration in accordance with the rules of the American Arbitration Association, rather than in court, except that you may assert claims in small claims court if your claims qualify.
                  </p>
                  <p className="mt-4 font-medium">
                    You waive any right to participate in a class action lawsuit or class-wide arbitration.
                  </p>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-8">
                <h2 className="mb-4">Severability</h2>
                <div className="text-gray-600">
                  <p>
                    If any provision of these Terms is found to be unenforceable or invalid, that provision shall be limited or eliminated to the minimum extent necessary so that these Terms shall otherwise remain in full force and effect.
                  </p>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-8">
                <h2 className="mb-4">Entire Agreement</h2>
                <div className="text-gray-600">
                  <p>
                    These Terms, together with our Privacy Policy, constitute the entire agreement between you and Vexto regarding the use of the Services and supersede any prior agreements.
                  </p>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-8">
                <h2 className="mb-4">Contact Us</h2>
                <div className="text-gray-600">
                  <p>
                    If you have questions about these Terms of Service, please contact us:
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
                    We will make reasonable efforts to respond to your inquiries, but cannot guarantee response times or resolutions.
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

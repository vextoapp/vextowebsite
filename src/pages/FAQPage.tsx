import { useEffect, useState } from 'react';
import { Search, HelpCircle } from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import Section from '../components/Section';
import FAQItem from '../components/FAQItem';
import { useFAQ } from '../hooks/useFAQ';
import { trackPageView } from '../utils/analytics';
import { setPageMetadata, addFAQStructuredData, removeFAQStructuredData } from '../utils/seo';

export default function FAQPage() {
  const { faqs, loading, error } = useFAQ();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [openItemId, setOpenItemId] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    trackPageView();

    setPageMetadata({
      title: 'Frequently Asked Questions',
      description: 'Find answers to common questions about Vexto micro-apps, privacy, technical requirements, and our philosophy of simplicity.',
      url: 'https://vexto.app/faq',
      type: 'website'
    });

    return () => {
      removeFAQStructuredData();
    };
  }, []);

  useEffect(() => {
    if (faqs.length > 0) {
      addFAQStructuredData(faqs.map(faq => ({
        question: faq.question,
        answer: faq.answer
      })));
    }
  }, [faqs]);

  const categories = ['All', ...Array.from(new Set(faqs.map(faq => faq.category)))];

  const filteredFAQs = faqs.filter(faq => {
    const matchesCategory = selectedCategory === 'All' || faq.category === selectedCategory;
    const matchesSearch = searchQuery === '' ||
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.search_keywords.some(keyword => keyword.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  const groupedFAQs = filteredFAQs.reduce((acc, faq) => {
    if (!acc[faq.category]) {
      acc[faq.category] = [];
    }
    acc[faq.category].push(faq);
    return acc;
  }, {} as Record<string, typeof faqs>);

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <main className="pt-16">
        <Section background="white">
          <div className="max-w-4xl mx-auto text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-vexto-primary/20 to-vexto-secondary/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <HelpCircle size={32} className="text-vexto-primary" />
            </div>
            <h1 className="mb-6">Frequently Asked Questions</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Find answers to common questions about Vexto, our apps, and how we work.
            </p>
          </div>
        </Section>

        <Section background="gray">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <div className="relative mb-6">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search FAQs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-lg border border-gray-200 focus:border-vexto-primary focus:ring-2 focus:ring-vexto-primary/20 outline-none transition-all duration-300 text-gray-900 placeholder-gray-400"
                />
              </div>

              <div className="flex flex-wrap gap-2">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                      selectedCategory === category
                        ? 'bg-gradient-to-r from-vexto-primary to-vexto-secondary text-white shadow-lg'
                        : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {loading && (
              <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                <div className="inline-block w-8 h-8 border-4 border-vexto-primary border-t-transparent rounded-full animate-spin"></div>
                <p className="mt-4 text-gray-600">Loading FAQs...</p>
              </div>
            )}

            {error && (
              <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                <p className="text-red-600">Failed to load FAQs. Please try again later.</p>
              </div>
            )}

            {!loading && !error && filteredFAQs.length === 0 && (
              <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                <p className="text-gray-600">No FAQs found matching your search.</p>
              </div>
            )}

            {!loading && !error && filteredFAQs.length > 0 && (
              <div className="space-y-8">
                {selectedCategory === 'All' ? (
                  Object.entries(groupedFAQs).map(([category, categoryFAQs]) => (
                    <div key={category}>
                      <h2 className="text-2xl font-bold mb-4 text-vexto-dark">{category}</h2>
                      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                        {categoryFAQs.map(faq => (
                          <FAQItem
                            key={faq.id}
                            question={faq.question}
                            answer={faq.answer}
                            isOpen={openItemId === faq.id}
                            onToggle={() => setOpenItemId(openItemId === faq.id ? null : faq.id)}
                          />
                        ))}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                    {filteredFAQs.map(faq => (
                      <FAQItem
                        key={faq.id}
                        question={faq.question}
                        answer={faq.answer}
                        isOpen={openItemId === faq.id}
                        onToggle={() => setOpenItemId(openItemId === faq.id ? null : faq.id)}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}

            <div className="mt-12 bg-gradient-to-br from-vexto-light to-vexto-secondary/10 rounded-lg p-8 text-center">
              <h3 className="text-xl font-bold mb-3 text-vexto-dark">Still have questions?</h3>
              <p className="text-gray-600 mb-6">
                Can't find what you're looking for? We're here to help.
              </p>
              <a
                href="/contact"
                className="inline-block bg-gradient-to-r from-vexto-primary to-vexto-accent text-white px-8 py-4 rounded-button font-medium hover:shadow-glow transition-all duration-300"
              >
                Contact Us
              </a>
            </div>
          </div>
        </Section>
      </main>
      <Footer />
    </div>
  );
}

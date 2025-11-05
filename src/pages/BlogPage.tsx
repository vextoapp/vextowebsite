import { useEffect, useState } from 'react';
import { BookOpen, Filter } from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import Section from '../components/Section';
import BlogCard from '../components/BlogCard';
import { useBlogPosts, useBlogCategories } from '../hooks/useBlog';
import { trackPageView } from '../utils/analytics';
import { setPageMetadata } from '../utils/seo';

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const { posts, loading: postsLoading, error: postsError } = useBlogPosts(selectedCategory);
  const { categories, loading: categoriesLoading } = useBlogCategories();

  useEffect(() => {
    window.scrollTo(0, 0);
    trackPageView();

    setPageMetadata({
      title: 'Blog',
      description: 'Insights on simplicity, productivity, and building better tools. Learn about the philosophy behind Vexto and how we create focused micro-apps.',
      url: 'https://vexto.app/blog',
      type: 'website'
    });
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <main className="pt-16">
        <Section background="white">
          <div className="max-w-4xl mx-auto text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-vexto-primary/20 to-vexto-secondary/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <BookOpen size={32} className="text-vexto-primary" />
            </div>
            <h1 className="mb-6">Blog</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Insights on simplicity, productivity, and building better tools.
            </p>
          </div>
        </Section>

        <Section background="gray">
          <div className="max-w-6xl mx-auto">
            {!categoriesLoading && categories.length > 0 && (
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <Filter size={20} className="text-gray-600" />
                  <span className="font-medium text-gray-700">Filter by category:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedCategory('')}
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                      selectedCategory === ''
                        ? 'bg-gradient-to-r from-vexto-primary to-vexto-secondary text-white shadow-lg'
                        : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                    }`}
                  >
                    All Posts
                  </button>
                  {categories.map(category => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.slug)}
                      className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                        selectedCategory === category.slug
                          ? 'bg-gradient-to-r from-vexto-primary to-vexto-secondary text-white shadow-lg'
                          : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                      }`}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {postsLoading && (
              <div className="text-center py-12">
                <div className="inline-block w-8 h-8 border-4 border-vexto-primary border-t-transparent rounded-full animate-spin"></div>
                <p className="mt-4 text-gray-600">Loading posts...</p>
              </div>
            )}

            {postsError && (
              <div className="text-center py-12">
                <p className="text-red-600">Failed to load blog posts. Please try again later.</p>
              </div>
            )}

            {!postsLoading && !postsError && posts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-600">No blog posts available yet. Check back soon!</p>
              </div>
            )}

            {!postsLoading && !postsError && posts.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map(post => (
                  <BlogCard key={post.id} post={post} />
                ))}
              </div>
            )}
          </div>
        </Section>
      </main>
      <Footer />
    </div>
  );
}

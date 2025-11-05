import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, Clock, ArrowLeft, Tag } from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import Section from '../components/Section';
import { useBlogPost, useBlogPosts } from '../hooks/useBlog';
import { trackPageView } from '../utils/analytics';
import { setPageMetadata, addBlogPostStructuredData, removeBlogStructuredData } from '../utils/seo';
import BlogCard from '../components/BlogCard';

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const { post, loading, error } = useBlogPost(slug || '');
  const { posts: recentPosts } = useBlogPosts();

  useEffect(() => {
    window.scrollTo(0, 0);
    trackPageView();

    return () => {
      removeBlogStructuredData();
    };
  }, [slug]);

  useEffect(() => {
    if (post) {
      setPageMetadata({
        title: post.title,
        description: post.excerpt,
        url: `https://vexto.app/blog/${post.slug}`,
        image: post.featured_image_url || undefined,
        type: 'article'
      });

      addBlogPostStructuredData({
        title: post.title,
        excerpt: post.excerpt,
        author: post.author,
        published_at: post.published_at,
        updated_at: post.updated_at,
        url: `https://vexto.app/blog/${post.slug}`,
        image: post.featured_image_url || undefined
      });
    }
  }, [post]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const renderContent = (content: string) => {
    return content.split('\n').map((line, index) => {
      if (line.startsWith('# ')) {
        return <h1 key={index} className="text-4xl font-bold mb-6 mt-8 text-vexto-dark">{line.substring(2)}</h1>;
      } else if (line.startsWith('## ')) {
        return <h2 key={index} className="text-3xl font-bold mb-4 mt-8 text-vexto-dark">{line.substring(3)}</h2>;
      } else if (line.startsWith('### ')) {
        return <h3 key={index} className="text-2xl font-bold mb-3 mt-6 text-vexto-dark">{line.substring(4)}</h3>;
      } else if (line.startsWith('- ')) {
        return <li key={index} className="ml-6 mb-2 text-gray-700 leading-relaxed">{line.substring(2)}</li>;
      } else if (line.startsWith('```')) {
        return null;
      } else if (line.trim() === '') {
        return <br key={index} />;
      } else {
        return <p key={index} className="mb-4 text-gray-700 leading-relaxed text-lg">{line}</p>;
      }
    });
  };

  const relatedPosts = recentPosts
    .filter(p => p.id !== post?.id && p.category_id === post?.category_id)
    .slice(0, 3);

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Navigation />
        <main className="pt-16">
          <Section background="white">
            <div className="text-center py-12">
              <div className="inline-block w-8 h-8 border-4 border-vexto-primary border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-4 text-gray-600">Loading post...</p>
            </div>
          </Section>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-white">
        <Navigation />
        <main className="pt-16">
          <Section background="white">
            <div className="text-center py-12">
              <h1 className="text-3xl font-bold mb-4 text-vexto-dark">Post Not Found</h1>
              <p className="text-gray-600 mb-8">The blog post you're looking for doesn't exist.</p>
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-vexto-primary to-vexto-accent text-white px-6 py-3 rounded-button font-medium hover:shadow-glow transition-all duration-300"
              >
                <ArrowLeft size={20} />
                Back to Blog
              </Link>
            </div>
          </Section>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <main className="pt-16">
        <Section background="white">
          <div className="max-w-4xl mx-auto">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-vexto-primary hover:text-vexto-secondary transition-colors duration-300 mb-8 group"
            >
              <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform duration-300" />
              Back to Blog
            </Link>

            {post.category && (
              <div className="mb-4">
                <span className="inline-block px-4 py-2 bg-vexto-primary/10 text-vexto-primary text-sm font-medium rounded-full">
                  {post.category.name}
                </span>
              </div>
            )}

            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-vexto-dark leading-tight">
              {post.title}
            </h1>

            <div className="flex items-center gap-6 text-gray-600 mb-8 pb-8 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <Calendar size={18} />
                <span>{formatDate(post.published_at)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={18} />
                <span>{post.reading_time_minutes} min read</span>
              </div>
              <span className="text-gray-600">By {post.author}</span>
            </div>

            {post.featured_image_url && (
              <div className="mb-12 rounded-lg overflow-hidden shadow-lg">
                <img
                  src={post.featured_image_url}
                  alt={post.title}
                  className="w-full h-auto"
                />
              </div>
            )}

            <article className="prose prose-lg max-w-none mb-12">
              {renderContent(post.content)}
            </article>

            {post.tags && post.tags.length > 0 && (
              <div className="flex items-center gap-3 flex-wrap py-6 border-t border-gray-200">
                <Tag size={18} className="text-gray-400" />
                {post.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </Section>

        {relatedPosts.length > 0 && (
          <Section background="gray">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-vexto-dark">Related Posts</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedPosts.map(relatedPost => (
                  <BlogCard key={relatedPost.id} post={relatedPost} />
                ))}
              </div>
            </div>
          </Section>
        )}

        <Section background="white">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4 text-vexto-dark">Stay Updated</h2>
            <p className="text-gray-600 mb-6">
              Get notified about new blog posts and app releases.
            </p>
            <Link
              to="/#signup"
              className="inline-block bg-gradient-to-r from-vexto-primary to-vexto-accent text-white px-8 py-4 rounded-button font-medium hover:shadow-glow transition-all duration-300"
            >
              Subscribe to Newsletter
            </Link>
          </div>
        </Section>
      </main>
      <Footer />
    </div>
  );
}

import { Calendar, Clock, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { BlogPostWithCategory } from '../hooks/useBlog';

interface BlogCardProps {
  post: BlogPostWithCategory;
}

export default function BlogCard({ post }: BlogCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <article className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group">
      <Link to={`/blog/${post.slug}`} className="block">
        {post.featured_image_url && (
          <div className="aspect-video bg-gradient-to-br from-vexto-primary/10 to-vexto-secondary/10 overflow-hidden">
            <img
              src={post.featured_image_url}
              alt={post.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        )}

        <div className="p-6">
          {post.category && (
            <div className="mb-3">
              <span className="inline-block px-3 py-1 bg-vexto-primary/10 text-vexto-primary text-xs font-medium rounded-full">
                {post.category.name}
              </span>
            </div>
          )}

          <h3 className="text-xl font-bold mb-3 text-vexto-dark group-hover:text-vexto-primary transition-colors duration-300">
            {post.title}
          </h3>

          <p className="text-gray-600 mb-4 line-clamp-3">
            {post.excerpt}
          </p>

          <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
            <div className="flex items-center gap-1">
              <Calendar size={16} />
              <span>{formatDate(post.published_at)}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock size={16} />
              <span>{post.reading_time_minutes} min read</span>
            </div>
          </div>

          {post.tags && post.tags.length > 0 && (
            <div className="flex items-center gap-2 flex-wrap">
              <Tag size={14} className="text-gray-400" />
              {post.tags.slice(0, 3).map((tag, index) => (
                <span key={index} className="text-xs text-gray-500">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </Link>
    </article>
  );
}

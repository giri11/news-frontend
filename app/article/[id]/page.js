import { detailService } from '@/lib/articleServices';
import { fetchTopHeadlines } from '@/lib/apiClient';
import { formatDistanceToNow } from 'date-fns';
import Link from 'next/link';
import ArticleCard from '@/components/ArticleCard';

export default async function ArticleDetailPage({ params }) {
  // Await params in Next.js 15
  const { id } = await params;
  const articleIndex = parseInt(id);
  
  // Fetch articles to get the one we want
  const data = await detailService.getById(id);
  const otherArticles = await fetchTopHeadlines('general');
  const articles = otherArticles.data || [];
  const article = data;
  
  if (!article) {
    return (
      <main className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold text-slate-900 mb-4">Article Not Found</h1>
        <Link href="/" className="text-blue-600 hover:underline">
          Return to Home
        </Link>
      </main>
    );
  }

  const timeAgo = formatDistanceToNow(new Date(article.createdAt), {
    addSuffix: true,
  });

  // Get related articles (exclude current one)
  const relatedArticles = articles
    .filter((_, index) => index !== articleIndex)
    .slice(0, 3);

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      {/* Back Button */}
      <Link 
        href="/" 
        className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6 font-medium"
      >
        ← Back to Home
      </Link>

      {/* Article Header */}
      <article className="bg-white rounded-xl shadow-lg overflow-hidden mb-12">
        {/* Featured Image */}
        <div className="relative h-96 bg-slate-100">
          <img
            src={article.pathImage || '/placeholder.jpg'}
            alt={article.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Article Content */}
        <div className="p-8 md:p-12">
          {/* Meta Info */}
          <div className="flex items-center gap-4 mb-6 text-sm">
            <span className="inline-block bg-blue-600 text-white px-4 py-1 rounded-full font-bold uppercase tracking-wide">
              {article.author}
            </span>
            <span className="text-slate-500">{timeAgo}</span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
            {article.title}
          </h1>

          {/* Author */}
          {article.author && (
            <p className="text-slate-600 mb-6">
              By <span className="font-semibold">{article.author}</span>
            </p>
          )}

          {/* Description/Summary */}
          {article.description && (
            <p className="text-xl text-slate-700 mb-8 leading-relaxed border-l-4 border-blue-600 pl-6 italic">
              {article.description}
            </p>
          )}
content nya ini
          {/* Main Content */}
          {article.content && (
            <div className="prose prose-lg max-w-none mb-8">
              <p className="text-slate-800 leading-relaxed">
                {article.content}
              </p>
            </div>
          )}

          {/* Read Original Article Button */}
          <div className="mt-8 pt-8 border-t border-slate-200">
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Read Full Article on {article.author} →
            </a>
          </div>
        </div>
      </article>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-6 flex items-center gap-3">
            <span className="w-1 h-10 bg-blue-600 rounded"></span>
            Related Articles
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedArticles.map((relatedArticle, index) => (
              <ArticleCard 
                key={index} 
                article={relatedArticle} 
                index={articles.indexOf(relatedArticle)} 
              />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
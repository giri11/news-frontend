import { formatDistanceToNow } from 'date-fns';
import Link from 'next/link';

export default function ArticleCard({ article, index }) {
  const timeAgo = formatDistanceToNow(new Date(article.createdAt), {
    addSuffix: true,
  });

  const imageSrc = article.pathImage || '/placeholder.jpg';

  return (
    <Link href={`/article/${article.id}`}>
      <article className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group cursor-pointer">
        <div className="relative h-56 overflow-hidden bg-slate-100">
          <img
            src={imageSrc}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        </div>
        
        <div className="p-6">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
              {article.author}
            </span>
            <span className="text-xs text-slate-400">•</span>
            <span className="text-xs text-slate-500">{timeAgo}</span>
          </div>
          
          <h3 className="text-xl font-bold text-slate-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors leading-tight">
            {article.title}
          </h3>
          
          {article.description && (
            <p className="text-slate-600 text-sm mb-4 line-clamp-3 leading-relaxed">
              {article.description}
            </p>
          )}
          
          <span className="inline-flex items-center text-sm font-semibold text-blue-600 group-hover:text-blue-700 transition-colors">
            Read more →
          </span>
        </div>
      </article>
    </Link>
  );
}
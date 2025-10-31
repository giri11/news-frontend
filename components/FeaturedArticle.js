import { formatDistanceToNow } from 'date-fns';
import Link from 'next/link';

export default function FeaturedArticle({ article }) {
  if (!article) return null;

  const timeAgo = formatDistanceToNow(new Date(article.createdAt), {
    addSuffix: true,
  });

  const imageSrc = article.pathImage || '/placeholder.jpg';

  return (
    <Link href={`/article/${article.id}`}>
      <article className="relative rounded-2xl overflow-hidden shadow-xl group cursor-pointer mb-12">
        <div className="relative h-[450px]">
          <img
            src={imageSrc}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
          
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <span className="inline-block bg-red-600 text-white px-4 py-1 rounded-full text-xs font-bold mb-4">
              FEATURED
            </span>
            
            <h2 className="text-4xl font-bold text-white mb-4 leading-tight">
              {article.title}
            </h2>
            
            {article.description && (
              <p className="text-slate-200 text-lg mb-4 max-w-3xl">
                {article.description}
              </p>
            )}
            
            <div className="flex items-center gap-4 text-sm text-slate-300">
              <span className="font-semibold">{article.author}</span>
              <span>•</span>
              <span>{timeAgo}</span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
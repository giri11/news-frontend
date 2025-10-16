import Image from 'next/image';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';

export default function HeroSection({ article }) {
  if (!article) return null;

  const timeAgo = formatDistanceToNow(new Date(article.createdAt), {
    addSuffix: true,
  });

  return (
    <article className="relative mb-8 group cursor-pointer">
      <div className="relative h-[500px] rounded-2xl overflow-hidden">
        <Image
          src={article.pathImage || '/placeholder.jpg'}
          alt={article.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <span className="inline-block bg-blue-600 px-3 py-1 rounded-full text-xs font-semibold mb-3">
            FEATURED
          </span>
          
          <h2 className="text-4xl font-bold mb-3 leading-tight">
            {article.title}
          </h2>
          
          <p className="text-gray-200 text-lg mb-4 line-clamp-2">
            {article.description}
          </p>
          
          <div className="flex items-center gap-4 text-sm">
            <span className="font-medium">{article.author}</span>
            <span className="text-gray-300">{timeAgo}</span>
          </div>
        </div>
      </div>
    </article>
  );
}
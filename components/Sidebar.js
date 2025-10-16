import { formatDistanceToNow } from 'date-fns';

export default function Sidebar({ articles }) {
  return (
    <aside className="sticky top-24">
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <span className="text-red-500">🔥</span>
          Trending Now
        </h3>
        
        <div className="space-y-4">
          {articles.map((article, index) => {
            const timeAgo = formatDistanceToNow(new Date(article.createdAt), {
              addSuffix: true,
            });
            
            return (
              <article key={index} className="border-b border-gray-100 pb-4 last:border-0">
                <div className="flex items-start gap-3">
                  <span className="text-2xl font-bold text-gray-300">
                    {(index + 1).toString().padStart(2, '0')}
                  </span>
                  <div>
                    <h4 className="font-semibold text-sm text-gray-900 mb-1 line-clamp-2 hover:text-blue-600 cursor-pointer">
                      {article.title}
                    </h4>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <span>{article.author}</span>
                      <span>·</span>
                      <span>{timeAgo}</span>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
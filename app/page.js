// import { fetchTopHeadlines } from '@/lib/api';
import { fetchTopHeadlines } from '@/lib/apiClient';
import FeaturedArticle from '@/components/FeaturedArticle';
import ArticleCard from '@/components/ArticleCard';

export const revalidate = 3600;

export default async function Home() {
  const data = await fetchTopHeadlines();
  const articles = data.data || [];
  
  const featuredArticle = articles[0];
  const regularArticles = articles.slice(1, 13);

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      {featuredArticle && <FeaturedArticle article={featuredArticle} index={0} />}
      
      <section>
        <h2 className="text-3xl font-bold text-slate-900 mb-8 flex items-center gap-3">
          <span className="w-1 h-10 bg-blue-600 rounded"></span>
          Latest News
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {regularArticles.map((article, index) => (
            <ArticleCard key={index} article={article} index={index + 1} />
          ))}
        </div>
      </section>
    </main>
  );
}
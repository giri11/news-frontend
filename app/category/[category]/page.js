import { fetchTopHeadlines } from '@/lib/apiClient';
import ArticleCard from '@/components/ArticleCard';

export default async function CategoryPage({ params }) {
  // Await params in Next.js 15
  const { category } = await params;
  const data = await fetchTopHeadlines(category);
  const articles = data.data || [];

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-slate-900 mb-8 capitalize flex items-center gap-3">
        <span className="w-2 h-12 bg-blue-600 rounded"></span>
        {category} News
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article, index) => (
          <ArticleCard key={index} article={article} index={index} />
        ))}
      </div>
    </main>
  );
}
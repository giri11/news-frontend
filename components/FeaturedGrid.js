import ArticleCard from './ArticleCard';

export default function FeaturedGrid({ articles }) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <span className="w-1 h-8 bg-blue-600 rounded"></span>
        Latest Stories
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {articles.map((article, index) => (
          <ArticleCard key={index} article={article} />
        ))}
      </div>
    </div>
  );
}
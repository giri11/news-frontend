import Link from 'next/link';
import CategoryNav from '@/components/CategoryNav';

export default function Header() {
  return (
    <header className="bg-white border-b shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-6">
        <Link href="/">
          <h1 className="text-4xl font-bold text-center">
            <span className="text-blue-600">KUAD</span>
          </h1>
          <h1 className="text-center">
            <span className="text-slate-500 mt-2">(Aku Ada Aku Bisa)</span>
          </h1>
        </Link>
        <p className="text-center text-sm text-slate-500 mt-2">
          {new Date().toLocaleDateString('en-US', { 
            weekday: 'long', 
            month: 'long', 
            day: 'numeric',
            year: 'numeric'
          })}
        </p>
      </div>
      {/* <CategoryNav /> */}
    </header>
  );
}
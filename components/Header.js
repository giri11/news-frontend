import Link from 'next/link';
import CategoryNav from '@/components/CategoryNav';

export default function Header() {
  return (
    <header className="bg-white fixed top-0 left-0 right-0 z-50 shadow-sm">
      {/* Top bar with logo and date */}
      <div className="border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <div className="flex flex-col">
              <h1 className="text-3xl font-bold">
                <span className="text-blue-600">KUAD</span>
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">(Aku Ada Aku Bisa)</p>
            </div>
          </Link>
          
          {/* Date */}
          <div className="hidden md:block">
            <p className="text-sm text-slate-600 font-medium">
              {new Date().toLocaleDateString('en-US', {
                weekday: 'long',
                month: 'long',
                day: 'numeric',
                year: 'numeric'
              })}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation bar */}
      <CategoryNav />
    </header>
  );
}
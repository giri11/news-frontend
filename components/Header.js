import Link from 'next/link';
import CategoryNav from '@/components/CategoryNav';

export default function Header() {
  return (
    <header className="bg-white fixed top-0 left-0 right-0 z-50 shadow-sm">
      {/* Top bar with logo and date */}
      <div className="border-b border-slate-200 bg-gradient-to-r from-blue-50 via-white to-blue-50">
        <div className="max-w-7xl mx-auto px-4 py-6">
          {/* Centered Logo with eye-catching design */}
          <Link href="/" className="block text-center group">
            <div className="inline-flex flex-col items-center">
              <h1 className="text-5xl font-black tracking-tight">
                <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 bg-clip-text text-transparent hover:from-blue-700 hover:via-blue-600 hover:to-cyan-600 transition-all duration-300">
                  KUAD
                </span>
              </h1>
              <p className="text-sm text-slate-600 mt-1 font-medium italic tracking-wide">
                (Aku Ada Aku Bisa)
              </p>
              <div className="h-1 w-24 bg-gradient-to-r from-transparent via-blue-500 to-transparent mt-2 group-hover:w-32 transition-all duration-300"></div>
            </div>
          </Link>
          
          {/* Date */}
          <div className="text-center mt-3">
            <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">
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
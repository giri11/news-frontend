'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const categories = [
  { name: 'All News', href: '/', value: 'general' },
  { name: 'Event', href: '/category/event', value: 'event' },
  { name: 'Health', href: '/category/health', value: 'health' },
];

export default function CategoryNav() {
  const pathname = usePathname();

  return (
    <nav className="bg-white border-b sticky top-[140px] z-40 shadow-sm">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex gap-2 overflow-x-auto py-3">
          {categories.map((cat) => {
            const isActive = pathname === cat.href;
            
            return (
              <Link
                key={cat.value}
                href={cat.href}
                className={`px-5 py-2 text-sm font-medium whitespace-nowrap rounded-full transition-all ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {cat.name}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
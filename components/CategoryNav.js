'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { fetchCategories } from '@/lib/apiClient';

// const categories = [
//   { name: 'All News', href: '/', value: 'general' },
//   { name: 'Event', href: '/category/event', value: 'event' },
//   { name: 'Health', href: '/category/health', value: 'health' },
// ];

export default function CategoryNav() {
  const pathname = usePathname();
  const [categories, setCategories] = useState([]); // Initialize with empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const response = await fetchCategories();
      const data = Array.isArray(response?.data) ? response.data : [];

      // Add "All News" as the first category
      const allNewsCategory = {
        id: 0,
        name: 'general',
        slug: '',
        displayName: 'All News'
      };

      // Normalize other categories from API
      const normalized = data
        .filter(cat => cat?.name !== 'general') // Remove any existing general category
        .map((cat, idx) => {
          const name = cat?.name || '';
          const slug = cat?.slug ?? name;
          const displayName = cat?.displayName ?? (String(name).charAt(0).toUpperCase() + String(name).slice(1));
          return {
            id: cat?.id ?? idx + 1, // Start from 1 since All News is 0
            name,
            slug,
            displayName,
            ...cat,
          };
        });

      setCategories([allNewsCategory, ...normalized]);
    } catch (error) {
      console.error('Error loading categories:', error);
      setError(error.message);
      // Fallback to default categories if API fails
      setCategories(getDefaultCategories());
    } finally {
      setLoading(false);
    }
  };

  const getDefaultCategories = () => {
    return [
      { id: 1, name: 'general', displayName: 'All News', slug: '' },    ];
  };

  const getCategoryHref = (category) => {
    if (category.name === 'general' || category.slug === '') {
      return '/';
    }
    return `/category/${category.slug || category.name}`;
  };

  const isActive = (category) => {
    const href = getCategoryHref(category);
    return pathname === href;
  };

  if (loading) {
    return (
    <nav className="bg-white border-b shadow-sm">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex gap-2 overflow-x-auto py-2.5 scrollbar-hide">
            <div className="px-4 py-1.5 bg-slate-100 text-slate-400 rounded-full text-sm">
              Loading...
            </div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="bg-white border-b sticky top-[68px] z-40 shadow-sm">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center">
          {/* Fixed "All News" category */}
          {categories?.[0] && (
            <div className="flex-none mr-2">
              <Link
                href={getCategoryHref(categories[0])}
                className={`px-4 py-1.5 text-sm font-medium whitespace-nowrap rounded-full transition-all ${
                  isActive(categories[0])
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {categories[0].displayName}
              </Link>
            </div>
          )}
          
          {/* Scrollable categories */}
          <div className="flex gap-2 overflow-x-auto py-2.5 scrollbar-hide">
            {categories && categories.length > 1 ? (
              categories.slice(1).map((cat) => (
              <Link
                key={cat.id}
                href={getCategoryHref(cat)}
                className={`px-4 py-1.5 text-sm font-medium whitespace-nowrap rounded-full transition-all ${
                  isActive(cat)
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {cat.displayName}
              </Link>
            ))
          ) : (
            <div className="px-4 py-1.5 bg-red-50 text-red-600 rounded-full text-sm">
              No categories available
            </div>
          )}
          </div>
        </div>
      </div>
    </nav>
  );
}
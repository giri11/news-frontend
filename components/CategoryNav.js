'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { fetchCategories } from '@/lib/apiClient';

export default function CategoryNav() {
  const pathname = usePathname();
  const [categories, setCategories] = useState([]);
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
        .filter(cat => cat?.name !== 'general')
        .map((cat, idx) => {
          const name = cat?.name || '';
          const slug = cat?.slug ?? name;
          const displayName = cat?.displayName ?? (String(name).charAt(0).toUpperCase() + String(name).slice(1));
          return {
            id: cat?.id ?? idx + 1,
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
      setCategories(getDefaultCategories());
    } finally {
      setLoading(false);
    }
  };

  const getDefaultCategories = () => {
    return [
      { id: 1, name: 'general', displayName: 'All News', slug: '' },
    ];
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
      <nav className="bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex gap-8 py-3.5">
              <div className="h-5 w-20 bg-slate-200 rounded animate-pulse"></div>
              <div className="h-5 w-20 bg-slate-200 rounded animate-pulse"></div>
              <div className="h-5 w-20 bg-slate-200 rounded animate-pulse"></div>
            </div>
            <div className="h-9 w-20 bg-slate-200 rounded animate-pulse"></div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Categories - Left side */}
          <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide flex-1">
            {categories && categories.length > 0 ? (
              categories.map((cat) => (
                <Link
                  key={cat.id}
                  href={getCategoryHref(cat)}
                  className={`px-4 py-3.5 text-sm font-medium whitespace-nowrap transition-all relative ${
                    isActive(cat)
                      ? 'text-blue-600'
                      : 'text-slate-700 hover:text-blue-600'
                  }`}
                >
                  {cat.displayName}
                  {isActive(cat) && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"></span>
                  )}
                </Link>
              ))
            ) : (
              <div className="px-4 py-3.5 text-sm text-red-600">
                No categories available
              </div>
            )}
          </div>

          {/* Login button - Right side */}
          <div className="flex-shrink-0 ml-4">
            <Link
              href="/login"
              className="px-5 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors duration-200 shadow-sm hover:shadow-md"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
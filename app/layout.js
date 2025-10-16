import './globals.css';
import Header from '@/components/Header';
import CategoryNav from '@/components/CategoryNav';

export const metadata = {
  title: 'kuad',
  description: 'Your source for breaking news and in-depth stories',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-slate-50 antialiased">
        <Header />
        <CategoryNav />
        {children}
        
        <footer className="bg-slate-900 text-white mt-20 py-12">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <p className="text-slate-400">
              © {new Date().getFullYear()} kuad. All rights reserved.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
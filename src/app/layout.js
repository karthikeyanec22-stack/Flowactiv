import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import ThemeProvider from '@/components/ThemeProvider';
import GlobalErrorHandler from '@/components/GlobalErrorHandler';

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-plus-jakarta',
  display: 'swap',
});

export const metadata = {
  title: 'Flowactiv — Building Scalable Digital Products',
  description: 'We design, develop, and launch powerful web and mobile applications.',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={plusJakarta.variable} suppressHydrationWarning>
      <body className="min-h-screen flex flex-col justify-between antialiased bg-[#f4f6fa] dark:bg-[#02050e] text-slate-900 dark:text-white font-sans transition-colors duration-300" suppressHydrationWarning>
        <GlobalErrorHandler />
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <Navbar />
          <main className="grow bg-[#f4f6fa] dark:bg-[#02050e] transition-colors duration-300">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
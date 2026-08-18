import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 bg-[#f4f6fa] dark:bg-[#02050e] text-slate-950 dark:text-white transition-colors duration-500">
      <h1 className="text-6xl font-black text-cyan-600 dark:text-cyan-400 mb-2">404</h1>
      <h2 className="text-2xl font-bold mb-4">Page Not Found</h2>
      <p className="text-slate-600 dark:text-slate-400 text-sm max-w-md mb-8">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/"
        className="px-6 py-3 rounded-full bg-slate-950 dark:bg-cyan-400 text-white dark:text-slate-950 font-black text-xs uppercase tracking-widest hover:bg-cyan-600 dark:hover:bg-cyan-300 transition-colors shadow-lg"
      >
        Back to Home
      </Link>
    </div>
  );
}

import Preloader from '@/components/Preloader';
import HashScrollHandler from '@/components/HashScrollHandler';
import HeroSection from '@/components/HeroSection';
import ProductsSection from '@/components/ProductsSection';
import Services from '@/components/Services';
import Excellence from '@/components/Excellence';
import Features from '@/components/Features';
import GlobalRecognition from '@/components/GlobalRecognition';
import CaseStudiesSection from '@/components/CaseStudiesSection';
import Testimonial from '@/components/Testimonial';
import FaqSection from '@/components/FaqSection';
import FooterSection from '@/components/FooterSection';

export default function HomePage() {
  return (
    <div className="relative min-h-screen bg-[#f4f6fa] dark:bg-[#02050e] text-slate-900 dark:text-white transition-colors duration-500">
      <HashScrollHandler />
      <Preloader />
      <main className="relative z-10 bg-[#f4f6fa] dark:bg-[#02050e] shadow-[0_30px_70px_rgba(0,0,0,0.5)] transition-colors duration-500 pb-1">
        <HeroSection />
        <ProductsSection />
        <Services />
        <Excellence />
        <Features />
        <GlobalRecognition />
        <CaseStudiesSection />
        <Testimonial />
        <FaqSection />
      </main>
      <FooterSection />
    </div>
  );
}
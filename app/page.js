import BlogSection from '../component/BlogSection';
import Gallery from '../component/Gallery';
import Hero from '../component/Hero';
import Preferences from '../component/Preferences';
import Swipe from '../component/Swipe';
import VendorSection from '../component/VendorSection';

export default function Home() {
  return (
    <div className=''>
      <Hero />
      <Preferences />
      <BlogSection />
      <VendorSection />
      <Gallery />
      <Swipe />
    </div>
  );
}

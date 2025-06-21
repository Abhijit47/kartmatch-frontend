import BlogSection from '../components/BlogSection';
import Gallery from '../components/Gallery';
import Hero from '../components/Hero';
import Preferences from '../components/Preferences';
import Swipe from '../components/Swipe';
import VendorSection from '../components/VendorSection';

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

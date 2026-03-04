import Hero from '../components/sections/Hero';
import AboutPreview from '../components/sections/AboutPreview';
import Categories from '../components/sections/Categories';
import WhyUs from '../components/sections/WhyUs';
import Gallery from '../components/sections/Gallery';
import CtaBanner from '../components/sections/CtaBanner';

export default function Home() {
  return (
    <>
      <Hero />
      <AboutPreview />
      <Categories />
      <WhyUs />
      <Gallery />
      <CtaBanner />
    </>
  );
}

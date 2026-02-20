import HeroSection from '@/components/HeroSection';
import ProductsPreview from '@/components/ProductsPreview';
import CapabilitiesPreview from '@/components/CapabilitiesPreview';
import AboutSection from '@/components/AboutSection';
import WhySitco from '@/components/WhySitco';

export default function Home() {
  return (
    <>
      <HeroSection />
      <ProductsPreview />
      <CapabilitiesPreview />
      <AboutSection />
      <WhySitco />
    </>
  );
}

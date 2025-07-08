import SubNavbar from "../../components/SubNavbar";
import HeroBanner from "../../components/HeroBanner";
import MapsCarousel from "../../components/MapsCarousel";
import DiscountSection from "../../components/DiscountSection";
import MapsGrid from "../../components/MapsGrid";
import CategoryCarousel from "../../components/CategoryCarousel";

export default function HomePage() {
  return (
    <main>
      <SubNavbar />
      <HeroBanner />
      <MapsCarousel />
      <DiscountSection />
      <CategoryCarousel />
      <MapsGrid />
    </main>
  );
}

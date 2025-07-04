import Navbar from "../components/Navbar";
import SubNavbar from "../components/SubNavbar";
import HeroBanner from "../components/HeroBanner";
import MapsCarousel from "../components/MapsCarousel";
import DiscountSection from "../components/DiscountSection";
import MapsGrid from "../components/MapsGrid";
import CategoryCarousel from "../components/CategoryCarousel";

export default function HomePage() {
  return (
    <div>
      <main className="bg-[url('/assets/bg_gray.webp')] bg-repeat bg-[length:400px] min-h-screen text-white">
        <Navbar />
        <div className="max-w-[1200px] mx-auto px-4">
          <SubNavbar />
          <HeroBanner />
          <MapsCarousel />
          <DiscountSection />
          <CategoryCarousel />
          <MapsGrid />
        </div>
      </main>
    </div>
  );
}

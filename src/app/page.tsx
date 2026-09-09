import HeroSection from "@/components/sections/HeroSection";
import DumStorySection from "@/components/sections/DumStorySection";
import HomeShowcaseSection from "@/components/sections/HomeShowcaseSection";
import TheDumFoodSection from "@/components/sections/TheDumFoodSection";
import ReelsSection from "@/components/sections/ReelsSection";
import ReserveExperienceSection from "@/components/sections/ReserveExperienceSection";
import MapSection from "@/components/sections/MapSection";

export default function Home() {
  return (
    <main className="w-full flex-1 flex flex-col">
      {/* 1. Hero Section - "Timed to Perfection" */}
      <HeroSection />

      {/* 2. The Dum Story */}
      <DumStorySection />

      {/* 3. Category Showcase (Food / Beverages / Sheesha tabs) */}
      <HomeShowcaseSection />

      {/* 4. The Dum Food */}
      <TheDumFoodSection />

      {/* 5. Reels */}
      <ReelsSection />

      {/* 6. Reserve an Experience (target of the #experience anchors) */}
      <ReserveExperienceSection />

      {/* 7. Location / Map */}
      <MapSection />

      {/* Target Anchor Points for Navigation Links */}
      <div id="privacy" className="sr-only" aria-hidden="true" />
      <div id="terms" className="sr-only" aria-hidden="true" />
      <div id="cookies" className="sr-only" aria-hidden="true" />
      <div id="cancellation" className="sr-only" aria-hidden="true" />
    </main>
  );
}

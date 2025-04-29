import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import ReadyToGrowBusiness from "@/components/ReadyToGrowBusiness";
import CustomerStarts from "@/components/CustomerStarts";
import MarketAnalysis from "@/components/MarketAnalysis";
import PlanYourBusiness from "@/components/PlanYourBusiness";
import Seo from "@/components/Seo";
import Features from "@/components/Features";

export default function Home() {
  return (
    <>
      <main className="text-gray-900 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-24 py-8 sm:py-10 md:py-16 lg:py-20 max-w-7xl mx-auto">
          <Hero />
          <Features />
          <MarketAnalysis />
          <PlanYourBusiness />
          <Seo />
          <CustomerStarts />
          <ReadyToGrowBusiness />
      </main>
      <Footer />
    </>
  );
}

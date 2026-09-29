import HeroSection from "../components/home/HeroSection";
import QuickAccessSection from "../components/home/QuickAccessSection";
import StatisticsSection from "../components/home/StatisticsSection";
import FeaturedOpportunities from "../components/home/FeaturedOpportunities";
import DigitalServicesSection from "../components/home/DigitalServicesSection";
import FeaturedBusinesses from "../components/home/FeaturedBusinesses";
import UpcomingEvents from "../components/home/UpcomingEvents";
import CommunityUpdates from "../components/home/CommunityUpdates";
import TestimonialsSection from "../components/home/TestimonialsSection";
import AccessChannelsSection from "../components/home/AccessChannelsSection";
import HowItWorks from "../components/home/HowItWorks";
import WhyGarissaConnect from "../components/home/WhyGarissaConnect";
import CallToAction from "../components/home/CallToAction";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <QuickAccessSection />
      <StatisticsSection />
      <FeaturedOpportunities />
      <DigitalServicesSection />
      <FeaturedBusinesses />
      <UpcomingEvents />
      <CommunityUpdates />
      <TestimonialsSection />
      <AccessChannelsSection />
      <HowItWorks />
      <WhyGarissaConnect />
      <CallToAction />
    </main>
  );
}
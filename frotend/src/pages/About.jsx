import AboutHero from "../components/about/AboutHero";
import MissionVision from "../components/about/MissionVision";
import OurStory from "../components/about/OurStory";
import WhatWeDo from "../components/about/WhatWeDo";
import OurValues from "../components/about/OurValues";
import JourneySection from "../components/about/JourneySection";
import ImpactStats from "../components/about/ImpactStats";
import TeamSection from "../components/about/TeamSection";
import PartnersSection from "../components/about/PartnersSection";
import AboutCTA from "../components/about/AboutCTA";

export default function About() {
  return (
    <main>
      <AboutHero />
      <MissionVision />
      <OurStory />
      <WhatWeDo />
      <OurValues />
      <JourneySection />
      <ImpactStats />
      <TeamSection />
      <PartnersSection />
      <AboutCTA />
    </main>
  );
}
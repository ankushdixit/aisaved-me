/**
 * Landing Page - AI Saved Me
 *
 * Main landing page showcasing the platform's value proposition
 * through victory counter, live story ticker, featured stories,
 * and clear navigation to encourage exploration and submissions.
 */

import { Navbar, Footer } from "@/components/ui";
import {
  Hero,
  HeroCTA,
  VictoryTicker,
  FeaturedStory,
  CategoryCards,
  Features,
  HowItWorks,
  Testimonials,
  FinalCTA,
} from "@/components/landing";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        {/* Dark Hero Section */}
        <Hero />
        <VictoryTicker />
        <HeroCTA />

        {/* Light Content Sections */}
        <FeaturedStory />
        <CategoryCards />

        {/* Features Section */}
        <Features />

        {/* How It Works */}
        <HowItWorks />

        {/* Social Proof */}
        <Testimonials />

        {/* Final CTA */}
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}

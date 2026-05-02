import { createFileRoute } from "@tanstack/react-router"
import { Navbar } from "@/components/home/Navbar"
import { HeroSection } from "@/components/home/HeroSection"
import { WhyTransparency } from "@/components/home/WhyTransparency"
import { AIChatPromo } from "@/components/home/AIChatPromo"
import { RecentProjects } from "@/components/home/RecentProjects"
import { CTASection } from "@/components/home/CTASection"
import { Footer } from "@/components/home/Footer"

export const Route = createFileRoute("/")({ 
  component: LandingPage 
})

function LandingPage() {
  return (
    <div className="min-h-screen">
      {/* Fixed Navbar */}
      <Navbar />
      
      {/* Hero Section - bg-background (#fff5ee) */}
      <HeroSection />
      
      {/* Why Transparency - bg-muted (white) */}
      <WhyTransparency />
      
      {/* AI Chat Promo - bg-foreground (dark - inversión total) */}
      <AIChatPromo />
      
      {/* Recent Projects - bg-background (#fff5ee) */}
      <RecentProjects />
      
      {/* CTA Section - bg-muted (white) */}
      <CTASection />
      
      {/* Footer - bg-background with top border */}
      <Footer />
    </div>
  )
}

// Made with Bob

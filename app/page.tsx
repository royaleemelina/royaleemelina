import HeroSection from './components/HeroSection'
import FeaturesSection from './components/FeaturesSection'
import VenuesSection from './components/VenuesSection'
import AboutUsSection from './components/AboutUsSection'

export default function Home() {
  return (
    <main>
      <HeroSection />
      <AboutUsSection />
      <FeaturesSection />
      <VenuesSection />
      {/* <ContactsSection /> */}
      {/* <FloatingButton /> */}
    </main>
  )
}

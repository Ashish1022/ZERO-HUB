import { CTASection } from '@/modules/home/ui/sections/cta'
import { FeaturesSection } from '@/modules/home/ui/sections/features'
import { HeroSection } from '@/modules/home/ui/sections/hero'
import { PricingSection } from '@/modules/home/ui/sections/pricing'

const page = () => {
  return (
    <div className='container mx-auto px-4 lg:px-6'>
      <HeroSection />
      <FeaturesSection />
      <PricingSection />
      <CTASection />
    </div>
  )
}

export default page
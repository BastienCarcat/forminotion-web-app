import React from 'react'
import HomeLayoutSectionCTA from './Sections/CTA'
import HomeLayoutSectionGuide from './Sections/Guide'
import HomeLayoutSectionPricing from './Sections/Pricing'
import HomeLayoutSectionTestimonials from './Sections/Testimonials'
import HomeLayoutSectionContact from './Sections/Contact'

const HomeLayout = () => {
  return (
    <div className="w-full overflow-hidden">
      <div
        id="cta"
        className="relative w-full md:py-32 pt-32 pb-16 after:content-[''] after:bg-primary-150 after:-bottom-[10%] after:-inset-x-[10%] after:-top-1/2 after:absolute after:-z-10 after:transform after:-rotate-[8deg] after:-skew-y-0 after:-skew-x-[8deg]"
      >
        <HomeLayoutSectionCTA />
      </div>

      <div id="guide" className="pt-36 pb-28">
        <HomeLayoutSectionGuide />
      </div>

      <div
        id="testimonials"
        className="relative w-full md:py-32 py-16 after:content-[''] after:bg-secondary after:-inset-y-0 after:-inset-x-[10%] after:absolute after:-z-10 after:transform after:rotate-[8deg] after:skew-y-0 after:skew-x-[8deg]"
      >
        <HomeLayoutSectionTestimonials />
      </div>

      <div id="pricing" className="py-28">
        <HomeLayoutSectionPricing />
      </div>

      {/*<div className="relative w-full md:py-32 py-16 after:content-[''] after:bg-primary-150 after:-inset-y-0 after:-inset-x-[10%] after:absolute after:-z-10 after:transform after:-rotate-[8deg] after:-skew-y-0 after:-skew-x-[8deg]">*/}
      {/*<HomeLayoutSectionFAQ />*/}
      {/*</div>*/}
      <div id="contact" className="py-12">
        <HomeLayoutSectionContact />
      </div>
    </div>
  )
}

HomeLayout.propTypes = {}

export default HomeLayout

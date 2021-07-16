import React from 'react'
import PageWrapper from '../components/PageWrapper'
import Hero from '../sections/landing/Hero'
import Services from '../sections/landing/Services'
import FeaturedJobs from '../sections/landing/FeaturedJobs'
import Slider from '../sections/landing/Slider'
import Blog from '../sections/landing/Blog'

const IndexPage = () => {
  return (
    <>
      <PageWrapper
        headerConfig={{
          bgClass: 'dynamic-sticky-bg'
        }}
      >
        <Hero />
        <Services />
        <FeaturedJobs />
        <Blog />
        <Slider />
      </PageWrapper>
    </>
  )
}
export default IndexPage

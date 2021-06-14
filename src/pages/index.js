import React from 'react'
import PageWrapper from '../components/PageWrapper'
import Hero from '../sections/landing3/Hero'
import Services from '../sections/landing3/Services'
import FeaturedJobs from '../sections/landing3/FeaturedJobs'
import Slider from '../sections/landing3/Slider'
import Blog from '../sections/landing2/Blog'
import { useAuth } from '../context/AuthContext'

const IndexPage = () => {
  const { authUser } = useAuth()
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

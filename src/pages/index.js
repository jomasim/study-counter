import React from "react";
import PageWrapper from "../components/PageWrapper";
import Hero from "../sections/landing3/Hero";
import Services from "../sections/landing3/Services";
import FeaturedJobs from "../sections/landing3/FeaturedJobs";
//import Content1 from "../sections/landing3/Content1";
//import Content2 from "../sections/landing3/Content2";
import Slider from "../sections/landing3/Slider";
// import Pricing from "../sections/landing3/Pricing";
import Blog from "../sections/landing2/Blog";


const IndexPage = () => {
  return (
    <>
      <PageWrapper
        headerConfig={{
          bgClass: "dynamic-sticky-bg",
        }}
      >
        <Hero />
        <Services />
        <FeaturedJobs />
        <Blog />        
        <Slider />        
      </PageWrapper>
    </>
  );
};
export default IndexPage;

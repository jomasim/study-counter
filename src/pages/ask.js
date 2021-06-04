import React, { useState } from 'react'
import { Collapse } from 'react-bootstrap'
import PageWrapper from '../components/PageWrapper'
import EditorComponent from '../components/EditorComponent'

const Faq = () => {
  const [openItem, setOpenItem] = useState(1)
  return (
    <>
      <PageWrapper>
        <div className='jobDetails-section bg-default pt-md-30 pt-sm-25 pt-23 pb-md-27 pb-sm-20 pb-17'>
          <div className='container'>
            <div className='row'>
              <div
                className='col-xl-8 col-md-7 pr-xl-15'
                data-aos='fade-right'
                data-aos-duration='1000'
              >
                <div className=''>
                  <h3 className='font-size-9 font-weight-bold mb-7 mb-lg-13'>
                    Ask Question
                  </h3>
                  <EditorComponent />
                </div>
              </div>
              <div
                className='col-xl-4 col-md-11'
                data-aos='fade-left'
                data-aos-duration='1000'
              >
                <div className='faq-content pt-lg-4 pt-6'>
                  <div
                    className='accordion rounded-10 border-green border-top-5 pl-1'
                    id='accordionExample'
                  >
                    <div className='border-bottom overflow-hidden'>
                      <div className='mb-0 border-bottom-0' id='heading2-1'>
                        <button
                          className='btn-reset font-size-5 font-weight-semibold text-left px-0 pb-6 pt-7 accordion-trigger arrow-icon w-100 border-left-0 border-right-0 focus-reset mt-n2'
                          type='button'
                          onClick={() => setOpenItem(1)}
                          aria-expanded={openItem === 1}
                        >
                          How does the studycounter.com work?
                        </button>
                      </div>
                      <Collapse in={openItem === 1}>
                        <div className='pr-7'>
                          <div className='mt-n3 font-size-4 text-gray font-weight-normal pb-7 pr-7 pt-6'>
                            Study Counter offers flexible ways to create, track
                            and manage your order. Out of experience we highly
                            recommend chatting with our support team or any
                            tutor to discus the details of your assignment
                            before creating an orders. That ensures your are
                            familair with the study counter working process.
                          </div>
                        </div>
                      </Collapse>
                    </div>
                    <div className='border-bottom overflow-hidden'>
                      <div className='mb-0 border-bottom-0' id='heading2-4'>
                        <button
                          className='btn-reset font-size-5 font-weight-semibold text-left px-0 pb-6 pt-7 accordion-trigger arrow-icon w-100 border-left-0 border-right-0 focus-reset mt-n2'
                          type='button'
                          onClick={() => setOpenItem(4)}
                          aria-expanded={openItem === 4}
                        >
                          How can I create an order?
                        </button>
                      </div>
                      <Collapse in={openItem === 4}>
                        <div className='pr-7'>
                          <div className='mt-n3 font-size-4 text-gray font-weight-normal pb-7 pr-7 pt-6'>
                            Currently we reccomend creating your order through
                            our social media channels, especially facebook. That
                            way you will have the advantage of realtime chat
                            with our tutors or support to help you easily create
                            your order.
                          </div>
                        </div>
                      </Collapse>
                    </div>
                    <div className='border-bottom overflow-hidden'>
                      <div className='mb-0 border-bottom-0' id='heading2-9'>
                        <button
                          className='btn-reset font-size-5 font-weight-semibold text-left px-0 pb-6 pt-7 accordion-trigger arrow-icon w-100 border-left-0 border-right-0 focus-reset mt-n2'
                          type='button'
                          onClick={() => setOpenItem(9)}
                          aria-expanded={openItem === 9}
                        >
                          What are the tutor rates?
                        </button>
                      </div>
                      <Collapse in={openItem === 9}>
                        <div className='cpr-7'>
                          <div className='mt-n3 font-size-4 text-gray font-weight-normal pb-7 pr-7 pt-6'>
                            Each tutor session or assignment has its unique
                            requirements that may necesitate customized pricing
                            but the evarage rate is $15-20/Hr.
                          </div>
                        </div>
                      </Collapse>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </PageWrapper>
    </>
  )
}
export default Faq

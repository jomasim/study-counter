import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Pagination from 'react-pagination-library'
import 'react-pagination-library/build/css/index.css'
import { Button } from 'react-bootstrap'
import { Collapse } from 'react-bootstrap'
import PageWrapper from '../components/PageWrapper'
import QuestionCard from '../components/QuestionCard'
import server from '../utils/api'

const Loader = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: #fff;
  z-index: 9999999999;
  opacity: 1;
  visibility: visible;
  transition: all 1s ease-out 0.5s;
  &.inActive {
    opacity: 0;
    visibility: hidden;
  }
`

const Explore = () => {
  const [openItem, setOpenItem] = useState(1)
  const [data, setData] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [paginationData, setPaginationData] = useState({})
  const [loading, setLoading] = useState(false)

  const fetchData = () => {
    setLoading(true)
    const api = server()
    api
      .get(`/question/?page=${currentPage}&limit=10`)
      .then(res => {
        setData(res.data.questions)
        setPaginationData({
          count: res.data.count || 0,
          nextPage: res.data.nextPage || 1,
          prevPage: res.data.prevPage || 1,
          page: res.data.page || 1
        })
        setLoading(false)
      })
      .catch(err => {
        console.log(err)
        setLoading(false)
      })
  }

  useEffect(() => {
    fetchData()
  }, [currentPage])

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
                <div className='border-bottom overflow-hidden'>
                  <h3 className='font-size-9 font-weight-bold mb-7 mb-lg-13'>
                    Explore Questions
                  </h3>
                  <div
                    style={{ marginBottom: '30px' }}
                    className='border-bottom overflow-hidden'
                  >
                    <form
                      action='/'
                      className='search-form'
                      data-aos='fade-right'
                      data-aos-duration='1000'
                      data-aos-dealy='1200'
                    >
                      <div className='filter-search-form-2 bg-white rounded-sm shadow-4 pr-8 py-8 pl-6'>
                        <div className='filter-inputs'>
                          <div className='form-group position-relative'>
                            <input
                              className='form-control focus-reset pl-13'
                              type='text'
                              id='keyword'
                              placeholder='Type question title, keywords'
                            />
                            <span className='h-100 w-px-50 pos-abs-tl d-flex align-items-center justify-content-center font-size-6'>
                              <i className='icon icon-zoom-2 text-primary font-weight-bold'></i>
                            </span>
                          </div>
                        </div>
                        <div className='button-block'>
                          <Button className='line-height-reset h-100 btn-submit w-100 text-uppercase'>
                            Search
                          </Button>
                        </div>
                      </div>
                    </form>
                  </div>
                  <div data-aos='fade-up' data-aos-duration='1000'>
                    {loading && <Loader />}
                    {!loading &&
                      data &&
                      data.map((question, index) => (
                        <div style={{ marginBottom: '20px' }} key={index}>
                          <QuestionCard question={question} />
                        </div>
                      ))}
                  </div>
                </div>
                <div>
                  <Pagination
                    currentPage={currentPage}
                    totalPages={paginationData.count}
                    changeCurrentPage={setCurrentPage}
                    theme='square-i'
                  />
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
export default Explore

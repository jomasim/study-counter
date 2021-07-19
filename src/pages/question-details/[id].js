import React, { useEffect, useState } from 'react'
import server from '../../utils/api'
import { useAuth } from '../../context/AuthContext'
import { useRouter } from 'next/router'
import Link from 'next/link'
import PageWrapper from '../../components/PageWrapper'
import renderHTML from 'react-render-html'
import Skeleton from 'react-loading-skeleton'
import CEditor from '../../components/CEditor'

import iconD from '../../assets/image/svg/icon-dolor.svg'

const JobDetails = () => {
  const [answer, setAnswer] = useState({})
  const [question, setQuestion] = useState({})
  const { token } = useAuth()
  const router = useRouter()
  const { id } = router.query
  useEffect(() => {
    const api = server(token)
    if (id) {
      api.get(`/question/${id}`).then(res => {
        setQuestion(res.data)
      })
    }
  }, [id])
  return (
    <>
      <PageWrapper headerConfig={{ button: 'profile' }}>
        <div className='jobDetails-section bg-default-1 pt-28 pt-lg-27 pb-xl-25 pb-12'>
          <div className='container'>
            {question && (
              <div className='row justify-content-center'>
                {/* <!-- back Button --> */}
                <div className='col-xl-10 col-lg-11 mt-4 ml-xxl-32 ml-xl-15 dark-mode-texts'>
                  <div className='mb-9'>
                    <Link href='/tutor/home'>
                      <a className='d-flex align-items-center ml-4'>
                        <i className='icon icon-small-left bg-white circle-40 mr-5 font-size-7 text-black font-weight-bold shadow-8'></i>
                        <span className='text-uppercase font-size-3 font-weight-bold text-gray'>
                          Back to job board
                        </span>
                      </a>
                    </Link>
                  </div>
                </div>
                {/* <!-- back Button End --> */}
                <div className='col-xl-9 col-lg-11 mb-8 px-xxl-15 px-xl-0'>
                  <div className='bg-white rounded-4 border border-mercury shadow-9'>
                    {/* <!-- Single Featured Job --> */}
                    <div className='pt-9 pl-sm-9 pl-5 pr-sm-9 pr-5 pb-8 border-bottom border-width-1 border-default-color light-mode-texts'>
                      <div className='row'>
                        <div className='col-md-12'>
                          <div className='media align-items-center'>
                            <div>
                              {question && (
                                <h3 className='font-size-6 mb-0'>
                                  {question.title}
                                </h3>
                              )}

                              <span className='font-size-3 text-gray line-height-2'>
                                19 June 2020
                              </span>
                            </div>
                            {/* <!-- media texts end --> */}
                          </div>
                          {/* <!-- media end --> */}
                        </div>
                      </div>
                      <div className='row pt-9'>
                        <div className='col-12'>
                          {/* <!-- card-btn-group start --> */}
                          <div className='card-btn-group'>
                            <Link href='/#'>
                              <a className='btn btn-green text-uppercase btn-medium rounded-3 w-180 mr-4 mb-5'>
                                Save job
                              </a>
                            </Link>
                          </div>
                          {/* <!-- card-btn-group end --> */}
                        </div>
                      </div>
                    </div>
                    {/* <!-- End Single Featured Job --> */}
                    <div className='job-details-content pt-8 pl-sm-9 pl-6 pr-sm-9 pr-6 pb-10 border-bottom border-width-1 border-default-color light-mode-texts'>
                      <div className='row mb-7'>
                        <div className='col-md-4 mb-md-0 mb-6'>
                          <div className='media justify-content-md-start'>
                            <div className='image mr-5'>
                              <img src={iconD} alt='' />
                            </div>
                            <p className='font-weight-semibold font-size-5 text-black-2 mb-0'>
                              80-90K
                            </p>
                          </div>
                        </div>
                        <div className='col-md-4 mb-md-0 mb-6'>
                          <div className='media justify-content-md-start'>
                            <div className='image mr-5'>
                              <img src={iconD} alt='' />
                            </div>
                            {question && (
                              <p className='font-weight-semibold font-size-5 text-black-2 mb-0'>
                                {question.status}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className='col-md-4 mb-md-0 mb-6'>
                          <div className='media justify-content-md-start'>
                            <div className='image mr-5'>
                              <img src={iconD} alt='' />
                            </div>
                            {question.answers && (
                              <p className='font-weight-semibold font-size-5 text-black-2 mb-0'>
                                Answered({question.answers.length || 0})
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className='row'>
                        <div className='col-md-4 mb-lg-0 mb-10'>
                          <div className=''>
                            <span className='font-size-4 d-block mb-4 text-gray'>
                              Subject
                            </span>
                            <h6 className='font-size-5 text-black-2 font-weight-semibold mb-9'>
                              {question.subject_code}
                            </h6>
                          </div>
                          <div className='tags'>
                            <p className='font-size-4 text-gray mb-3'>
                              Required Skills
                            </p>

                            <ul className='d-flex list-unstyled flex-wrap pr-sm-25 pr-md-0'>
                              {question.tags &&
                                question.tags.map((tag, index) => (
                                  <li
                                    key={index}
                                    className='bg-regent-opacity-15 mr-3 h-px-33 text-center flex-all-center rounded-3 px-5 font-size-3 text-black-2 mt-2'
                                  >
                                    {tag}
                                  </li>
                                ))}
                            </ul>
                          </div>
                        </div>
                        <div className='col-md-4 pr-lg-0 pl-lg-10 mb-lg-0 mb-8'>
                          <div className=''>
                            <span className='font-size-4 d-block mb-4 text-gray'>
                              Deadline
                            </span>

                            <h6 className='font-size-5 text-black-2 font-weight-semibold mb-9'>
                              {question.deadline}
                            </h6>
                          </div>
                        </div>
                        <div className='col-md-4 pl-lg-0'>
                          <div className=''>
                            <span className='font-size-4 d-block mb-4 text-gray'>
                              Pages
                            </span>
                            <h6 className='font-size-5 text-black-2 font-weight-semibold mb-0'>
                              10-15 Pages
                            </h6>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='job-details-content pt-8 pl-sm-9 pl-6 pr-sm-9 pr-6 pb-10 border-bottom border-width-1 border-default-color light-mode-texts'>
                      <div className='row'>
                        <div className='col-xl-11 col-md-12 pr-xxl-9 pr-xl-10 pr-lg-20'>
                          <div className=''>
                            <p className='mb-4 font-size-4 text-gray'>
                              Job Description
                            </p>
                            {question.body && (
                              <React.Fragment>
                                <div className='font-size-4 text-black-2 mb-7'>
                                  {renderHTML(question.body)}
                                </div>
                              </React.Fragment>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='job-details-content pt-8 pl-sm-9 pl-6 pr-sm-9 pr-6 pb-10 light-mode-texts'>
                      <div className='row'>
                        <div className='col-xl-11 col-md-12 pr-xxl-9 pr-xl-10 pr-lg-20'></div>
                      </div>
                      <div style={{ marginTop: '20px' }}>
                        <span
                          style={{
                            color: '#1d1c1c',
                            fontWeight: '500',
                            marginBottom: '10px'
                          }}
                        >
                          Your Answer
                        </span>
                        <CEditor setContent={setAnswer} />
                        <Link href='/#'>
                          <a className='btn btn-green text-uppercase btn-medium w-180 h-px-48 rounded-3 mr-4 mt-6'>
                            Submit
                          </a>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </PageWrapper>
    </>
  )
}
export default JobDetails

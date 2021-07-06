import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import server from '../../utils/api'
import { useAuth } from '../../context/AuthContext'
import TruncateMarkup from 'react-truncate-markup'
import renderHTML from 'react-render-html'
import ReactTimeAgo from 'react-time-ago'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'

TimeAgo.addLocale(en)

const FeaturedJobs = () => {
  const [data, setData] = useState([])
  const { token } = useAuth()

  useEffect(() => {
    const api = server(token)
    if (!data.length) {
      api.get('/question').then(res => {
        console.log('data', res.data)
        setData(res.data.slice(0, 4))
      })
    }
  }, [data])
  return (
    <>
      {/* <!-- FeaturedJobs Area -->  */}
      <div className='bg-default-2 pt-12 pt-lg-25 pb-12 pb-lg-25'>
        <div className='container'>
          {/* <!-- Section title --> */}
          <div className='row justify-content-center'>
            <div className='col-12 col-md-8 col-lg-6 col-xxl-5'>
              <div className='text-center mb-8 mb-lg-18 px-xl-9 px-xxl-7'>
                <h2 className='font-size-8 mb-6'>Recently Asked Questions</h2>
                <p className='font-size-4 text-default-color px-xs-9 px-md-0'>
                  Your personal details are kept secrect with us.
                </p>
              </div>
            </div>
          </div>
          {/* <!-- End Section title --> */}
          <div
            className='row justify-content-center '
            data-aos='fade-up'
            data-aos-duration='1000'
          >
            {data &&
              data.map((question, index) => (
                <div className='mb-8' style={{ width: '70%' }} key={index}>
                  {/* <!-- Single Featured Job --> */}
                  <div className='pt-2 px-xl-9 px-lg-7 px-7 pb-7 light-mode-texts bg-white rounded hover-shadow-3 '>
                    <div className='row'>
                      <div className='col-md-8'>
                        <div className='media align-items-center'>
                          <div>
                            <h3 className='mb-0'>
                              <Link href={`/questions/${question._id}`}>
                                <a className='font-size-3 heading-default-color'>
                                  {question.title}
                                </a>
                              </Link>
                            </h3>
                          </div>
                        </div>
                      </div>
                    </div>
                    <TruncateMarkup lines={4}>
                      <div>{renderHTML(question.body)}</div>
                    </TruncateMarkup>
                    <div className='row pt-1'>
                      <div className='col-md-7'>
                        <ul className='d-flex list-unstyled mr-n3 flex-wrap'>
                          {question.tags &&
                            question.tags.map((tag, index) => (
                              <li key={index}>
                                <Link href='/#'>
                                  <a className='bg-regent-opacity-15 min-width-px-96 mr-3 text-center rounded-3 px-6 py-1 font-size-3 text-black-2 mt-2'>
                                    {tag}
                                  </a>
                                </Link>
                              </li>
                            ))}
                        </ul>
                      </div>
                      <div className='col-md-5'>
                        <ul className='d-flex list-unstyled mr-n3 flex-wrap mr-n8 justify-content-md-end'>
                          <li className='mt-2 mr-8 font-size-small text-black-2 d-flex'>
                            <span
                              className='mr-4'
                              css={`
                                margin-top: -2px;
                              `}
                            ></span>
                            {/* <span className="font-weight-semibold">
                                Berlyn, UK
                              </span> */}
                          </li>
                          <li className='mt-2 mr-8 font-size-small text-black-2 d-flex'>
                            <span
                              className='mr-4'
                              css={`
                                margin-top: -2px;
                              `}
                            ></span>
                            <span className='font-weight-semibold'>Asked</span>
                          </li>
                          <li className='mt-2 mr-8 font-size-small text-black-2 d-flex'>
                            <span
                              className='mr-4'
                              css={`
                                margin-top: -2px;
                              `}
                            ></span>
                            <span className='font-weight-semibold'>
                              <ReactTimeAgo
                                date={new Date(question.created_at)}
                              />
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  {/* <!-- End Single Featured Job --> */}
                </div>
              ))}
          </div>
          <div className='row'>
            <div className='col-12 text-center pt-md-11 '>
              <Link href='/#'>
                <a className='text-green font-weight-bold text-uppercase font-size-3'>
                  See more questions <i className='fas fa-arrow-right ml-3'></i>
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default FeaturedJobs

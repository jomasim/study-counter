import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import server from '../../utils/api'
import { useAuth } from '../../context/AuthContext'
import QuestionCard from '../../components/QuestionCard'

const FeaturedJobs = () => {
  const [data, setData] = useState([])
  const { token } = useAuth()

  useEffect(() => {
    const api = server(token)
    if (!data.length) {
      api.get('/question/?page=1&limit=4').then(res => {
        setData(res.data.questions)
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
                  <QuestionCard question={question} />
                </div>
              ))}
          </div>
          <div className='row'>
            <div className='col-12 text-center pt-md-11 '>
              <Link href='/explore'>
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

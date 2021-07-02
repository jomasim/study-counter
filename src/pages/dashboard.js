import Link from 'next/link'
import CountUp from 'react-countup'
import LazyLoad from 'react-lazyload'
import PageWrapper from '../components/PageWrapper'
import { Select } from '../components/Core'
import server from '../utils/api'
import { useAuth } from '../context/AuthContext'

import { useState } from 'react'
import { useEffect } from 'react'

const defaultJobs = [
  { value: 'pd', label: 'Product Designer' },
  { value: 'gd', label: 'Graphics Designer' },
  { value: 'fd', label: 'Frontend Developer' },
  { value: 'bd', label: 'Backend Developer' },
  { value: 'cw', label: 'Content Writer' }
]

const DashboardMain = () => {
  const [data, setData] = useState([])
  const { token } = useAuth()

  useEffect(() => {
    const api = server(token)
    if (!data.length) {
      api.get('/question').then(res => {
        setData(res.data)
      })
    }
  }, [data])

  return (
    <>
      <PageWrapper
        headerConfig={{
          button: 'profile',
          isFluid: true,
          bgClass: 'bg-default',
          reveal: false
        }}
      >
        <div className='dashboard-main-container mt-25 mt-lg-31'>
          <div className='container'>
            <div className='row mb-7'>
              <div className='col-xxl-3 col-xl-4 col-lg-6 col-sm-6'>
                {/* <!-- Single Category --> */}
                <a
                  href='/#'
                  className='media bg-white rounded-4 pl-8 pt-9 pb-9 pr-7 hover-shadow-1 mb-9 shadow-8'
                >
                  <div className='text-blue bg-blue-opacity-1 circle-56 font-size-6 mr-7'>
                    <i className='fas fa-briefcase'></i>
                  </div>
                  {/* <!-- Category Content --> */}
                  <div className=''>
                    <h5 className='font-size-8 font-weight-semibold text-black-2 line-height-reset font-weight-bold mb-1'>
                      <LazyLoad>
                        <span className='counter'>
                          <CountUp duration={6} end={5} />
                        </span>
                      </LazyLoad>
                    </h5>
                    <p className='font-size-4 font-weight-normal text-gray mb-0'>
                      Posted Jobs
                    </p>
                  </div>
                </a>
                {/* <!-- End Single Category --> */}
              </div>
              <div className='col-xxl-3 col-xl-4 col-lg-6 col-sm-6'>
                {/* <!-- Single Category --> */}
                <a
                  href='/#'
                  className='media bg-white rounded-4 pl-8 pt-9 pb-9 pr-7 hover-shadow-1 mb-9 shadow-8'
                >
                  <div className='text-pink bg-pink-opacity-1 circle-56 font-size-6 mr-7'>
                    <i className='fas fa-user'></i>
                  </div>
                  {/* <!-- Category Content --> */}
                  <div className=''>
                    <h5 className='font-size-8 font-weight-semibold text-black-2 line-height-reset font-weight-bold mb-1'>
                      <LazyLoad>
                        <span className='counter'>
                          <CountUp duration={4} end={256} />
                        </span>
                      </LazyLoad>
                    </h5>
                    <p className='font-size-4 font-weight-normal text-gray mb-0'>
                      Total Applicants
                    </p>
                  </div>
                </a>
                {/* <!-- End Single Category --> */}
              </div>
              <div className='col-xxl-3 col-xl-4 col-lg-6 col-sm-6'>
                {/* <!-- Single Category --> */}
                <a
                  href='/#'
                  className='media bg-white rounded-4 pl-8 pt-9 pb-9 pr-7 hover-shadow-1 mb-9 shadow-8'
                >
                  <div className='text-orange bg-orange-opacity-1 circle-56 font-size-6 mr-7'>
                    <i className='fas fa-eye'></i>
                  </div>
                  {/* <!-- Category Content --> */}
                  <div className=''>
                    <h5 className='font-size-8 font-weight-semibold text-black-2 line-height-reset font-weight-bold mb-1'>
                      <LazyLoad>
                        <span className='counter'>
                          <CountUp
                            duration={4}
                            decimal='.'
                            decimals={1}
                            end={16.5}
                          />
                        </span>
                        K
                      </LazyLoad>
                    </h5>
                    <p className='font-size-4 font-weight-normal text-gray mb-0'>
                      Jobs View
                    </p>
                  </div>
                </a>
                {/* <!-- End Single Category --> */}
              </div>
              <div className='col-xxl-3 col-xl-4 col-lg-6 col-sm-6'>
                {/* <!-- Single Category --> */}
                <a
                  href='/#'
                  className='media bg-white rounded-4 pl-8 pt-9 pb-9 pr-7 hover-shadow-1 mb-9 shadow-8'
                >
                  <div className='text-egg-blue bg-egg-blue-opacity-1 circle-56 font-size-6 mr-7'>
                    <i className='fas fa-mouse-pointer'></i>
                  </div>
                  {/* <!-- Category Content --> */}
                  <div className=''>
                    <h5 className='font-size-8 font-weight-semibold text-black-2 line-height-reset font-weight-bold mb-1'>
                      <LazyLoad>
                        <span className='counter'>
                          <CountUp
                            duration={4}
                            decimal='.'
                            decimals={1}
                            end={18.6}
                          />
                        </span>
                        %
                      </LazyLoad>
                    </h5>
                    <p className='font-size-4 font-weight-normal text-gray mb-0'>
                      Applied Rate
                    </p>
                  </div>
                </a>
                {/* <!-- End Single Category --> */}
              </div>
            </div>
            {/* table here */}
            <div className='mb-18'>
              <div className='row mb-11 align-items-center'>
                <div className='col-lg-6 mb-lg-0 mb-4'>
                  <h3 className='font-size-6 mb-0'>Posted Jobs (4)</h3>
                </div>
                <div className='col-lg-6'>
                  <div className='d-flex flex-wrap align-items-center justify-content-lg-end'>
                    <p className='font-size-4 mb-0 mr-6 py-2'>Filter by Job:</p>
                    <div className='h-px-48'>
                      <Select
                        options={defaultJobs}
                        className='pl-0 h-100 arrow-3 arrow-3-black min-width-px-273  text-black-2 d-flex align-items-center w-100'
                        border={false}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className='bg-white shadow-8 pt-7 rounded pb-9 px-11'>
                <div className='table-responsive '>
                  <table className='table table-striped'>
                    <thead>
                      <tr>
                        <th
                          scope='col'
                          className='pl-0 border-0 font-size-4 font-weight-normal'
                        >
                          Title
                        </th>
                        <th
                          scope='col'
                          className='pl-4 border-0 font-size-4 font-weight-normal'
                        >
                          Subject
                        </th>
                        <th
                          scope='col'
                          className='pl-4 border-0 font-size-4 font-weight-normal'
                        >
                          Course Code
                        </th>
                        <th
                          scope='col'
                          className='pl-4 border-0 font-size-4 font-weight-normal'
                        >
                          Created on
                        </th>
                        <th
                          scope='col'
                          className='pl-4 border-0 font-size-4 font-weight-normal'
                        >
                          Total Applicants
                        </th>
                        <th
                          scope='col'
                          className='pl-4 border-0 font-size-4 font-weight-normal'
                        ></th>
                        <th
                          scope='col'
                          className='pl-4 border-0 font-size-4 font-weight-normal'
                        ></th>
                      </tr>
                    </thead>
                    <tbody>
                      {data &&
                        data.map((question, key) => (
                          <tr className='border border-color-2' key={key}>
                            <th
                              scope='row'
                              className='pl-6 border-0 py-7 min-width-px-235'
                            >
                              <div className=''>
                                <Link href='/job-details'>
                                  <a className='font-size-4 mb-0 font-weight-semibold text-black-2'>
                                    {question.title}
                                  </a>
                                </Link>
                              </div>
                            </th>
                            <td className='table-y-middle py-7 min-width-px-135'>
                              <h3 className='font-size-4 font-weight-normal text-black-2 mb-0'>
                                {question.subject_code}
                              </h3>
                            </td>
                            <td className='table-y-middle py-7 min-width-px-125'>
                              <h3 className='font-size-4 font-weight-normal text-black-2 mb-0'>
                                {question.course_code}
                              </h3>
                            </td>
                            <td className='table-y-middle py-7 min-width-px-155'>
                              <h3 className='font-size-4 font-weight-normal text-black-2 mb-0'>
                                {question.created_at}
                              </h3>
                            </td>
                            <td className='table-y-middle py-7 min-width-px-205'>
                              <h3 className='font-size-4 font-weight-bold text-black-2 mb-0'>
                                47
                              </h3>
                            </td>
                            <td className='table-y-middle py-7 min-width-px-80'>
                              <a
                                href='/#'
                                className='font-size-3 font-weight-bold text-green text-uppercase'
                              >
                                Edit
                              </a>
                            </td>
                            <td className='table-y-middle py-7 min-width-px-100'>
                              <a
                                href='/#'
                                className='font-size-3 font-weight-bold text-red-2 text-uppercase'
                              >
                                Delete
                              </a>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </PageWrapper>
    </>
  )
}
export default DashboardMain

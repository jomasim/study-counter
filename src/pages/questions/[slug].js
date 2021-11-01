import React, { useState, useEffect } from 'react'
import { Collapse } from 'react-bootstrap'
import Link from 'next/link'
import PageWrapper from '../../components/PageWrapper'
import server from '../../utils/api'
import { useAuth } from '../../context/AuthContext'
import { useRouter } from 'next/router'
import renderHTML from 'react-render-html'
import ReactTimeAgo from 'react-time-ago'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import Answer from '../../components/Answer'

TimeAgo.addLocale(en)

const Card = ({ question }) => (
  <div
    className='pt-2 px-xl-9 px-lg-7 px-7 pb-7 light-mode-texts bg-white rounded hover-shadow-3 '
    style={{ width: '100%' }}
  >
    <div className='row'>
      <div className='col-md-8'>
        <div className='media align-items-center'>
          <div>
            <h3 className='mb-0'>
              <Link href='/#'>
                <a
                  className='font-size-3 heading-default-color'
                  style={{ color: '#ff8438' }}
                >
                  {question.title}
                </a>
              </Link>
            </h3>
          </div>
        </div>
      </div>
    </div>

    <div className='q-content'>
      {question.body && renderHTML(question.body)}
    </div>

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
              {question.created_at && (
                <ReactTimeAgo date={new Date(question.created_at)} />
              )}
            </span>
          </li>
        </ul>
      </div>
    </div>
  </div>
)

const Question = () => {
  const [openItem, setOpenItem] = useState(1)
  const [question, setQuestion] = useState(null)
  const { token } = useAuth()
  const router = useRouter()
  const { slug } = router.query

  useEffect(() => {
    const api = server(token)
    if (slug) {
      api.get(`/question/${slug}`).then(res => {
        setQuestion(res.data)
      })
    }
  }, [slug])

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
                <div
                  className='row justify-content-center '
                  data-aos='fade-up'
                  data-aos-duration='1000'
                >
                  {question && <Card question={question} />}
                </div>

                <div style={{ marginTop: '30px' }}>
                  {question &&
                    question.answers.map((answer, index) => (
                      <Answer
                        key={index}
                        question={question}
                        title={question.title}
                        answer={answer}
                      />
                    ))}
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
export default Question

import Link from 'next/link'
import TruncateMarkup from 'react-truncate-markup'
import renderHTML from 'react-render-html'
import ReactTimeAgo from 'react-time-ago'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'

TimeAgo.addLocale(en)

const QuestionCard = ({ question }) => {
  return (
    <div className='pt-2 px-xl-9 px-lg-7 px-7 pb-7 light-mode-texts bg-white rounded hover-shadow-3 '>
      <div className='row'>
        <div className='col-md-8'>
          <div className='media align-items-center'>
            <div>
              <h3 className='mb-0'>
                <Link
                  href={`/questions/${question.slug}`}
                >
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
        <div className='q-content'>{renderHTML(question.body)}</div>
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
                <ReactTimeAgo date={new Date(question.created_at)} />
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
export default QuestionCard
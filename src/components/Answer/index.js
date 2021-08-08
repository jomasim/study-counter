import Link from 'next/link'
import renderHTML from 'react-render-html'
import { FaThumbsUp, FaThumbsDown, FaComment, FaStar } from 'react-icons/fa'
import imgP from '../../assets/image/header-profile.png'

const Answer = ({ title, answer }) => {
  return (
    <div className='pt-2 px-xl-9 px-lg-7 px-7 pb-7 light-mode-texts bg-white rounded hover-shadow-3 '>
      <div className='row'>
        <div className='col-md-8'>
          <div style={{ display: 'flex' }}>
            <div className='circle-40'>
              <img src={imgP} alt='' />
            </div>

            <div style={{ padding: '5px' }}>
              <span className='font-weight-semibold'>John Doe</span> |{' '}
              <span>Answered.</span>
              <div>
                <span style={{ marginRight: '9px' }}>Tutor </span>
                <FaStar style={{ marginTop: '-1px' }} />
                <FaStar style={{ marginTop: '-1px' }} />
                <FaStar style={{ marginTop: '-1px' }} />
                <small style={{ marginLeft: '9px' }}>(3.3)</small>
              </div>
            </div>
          </div>
          <div className='media align-items-center'>
            <div>
              <h3 className='mb-0'>
                <Link href='/#'>
                  <a className='font-size-3 heading-default-color'>
                    {title}
                  </a>
                </Link>
              </h3>
            </div>
          </div>
        </div>
      </div>

      <div className='q-content'>
        {answer && renderHTML(answer)}
      </div>

      <div className='row pt-1'>
        <div className='col-md-7'>
          <FaThumbsUp />
          <FaThumbsDown
            id='down'
            style={{ marginTop: '10px', marginLeft: '10px' }}
          />
        </div>
        <div className='col-md-5' style={{ textAlign: 'right' }}>
          <FaComment />
          <span
            style={{ marginLeft: '5px', color: '2b3a3f', fontWeight: '500' }}
            className='font-weight-semibold'
          >
            Add comment
          </span>
        </div>
      </div>
    </div>
  )
}

export default Answer

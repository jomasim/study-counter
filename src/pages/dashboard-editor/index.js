import React from 'react'
import PageWrapper from '../../components/PageWrapper'
import EditorComponent from '../../components/EditorComponent'

const Editor = () => {
  return (
    <PageWrapper
      headerConfig={{
        button: 'profile',
        isFluid: true,
        bgClass: 'bg-default',
        reveal: false
      }}
    >
      <div
        className='dashboard-main-container mt-24 mt-lg-31'
        id='dashboard-body'
      >
        <div className='container'>
          <div className='mb-15 mb-lg-23'>
            <div className='row'>
              <div className='col-xxxl-9 px-lg-13 px-6'>
                {/* <h5 className='font-size-6 font-weight-semibold mb-11'>
                  {title}
                </h5> */}
                {/* start hererrerere */}
                <div className='bg-white shadow-8 pt-7 rounded pb-9 px-11'>
                  <EditorComponent />
                  {/* end */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  )
}
export default Editor

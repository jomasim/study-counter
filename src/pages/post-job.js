import React from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

import PageWrapper from '../components/PageWrapper'

const defaultTypes = [
  { value: 'b2b', label: 'B2B' },
  { value: 'saas', label: 'SAAS' },
  { value: 'b2b', label: 'b2b' }
]

const defaultEmployees = [
  { value: '10-50', label: '10-50' },
  { value: '50-100', label: '50-100' },
  { value: '100-500', label: '100-500' },
  { value: '500-2000', label: '500-2000' }
]

const defaultLocations = [
  { value: 'bd', label: 'Bangladesh' },
  { value: 'sp', label: 'Singapore' },
  { value: 'tl', label: 'Thailand' },
  { value: 'de', label: 'Germany' }
]

const DashboardSettings = () => {
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
        <div
          className='dashboard-main-container mt-24 mt-lg-31'
          id='dashboard-body'
        >
          <div className='container'>
            <div className='mb-15 mb-lg-23'>
              <div className='row'>
                <div className='col-xxxl-9 px-lg-13 px-6'>
                  <h5 className='font-size-6 font-weight-semibold mb-11'>
                    New job
                  </h5>
                  <div className='contact-form bg-white shadow-8 rounded-4 pl-sm-10 pl-4 pr-sm-11 pr-4 pt-15 pb-13'>
                    <CKEditor
                      editor={ClassicEditor}
                      data='<p>Hello welcome to study counter. Start typing here ....</p>'
                      onReady={editor => {
                        // You can store the "editor" and use when it is needed.
                        console.log('Editor is ready to use!', editor)
                      }}
                      onChange={(event, editor) => {
                        const data = editor.getData()
                        console.log({ event, editor, data })
                      }}
                      onBlur={(event, editor) => {
                        console.log('Blur.', editor)
                      }}
                      onFocus={(event, editor) => {
                        console.log('Focus.', editor)
                      }}
                    />
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
export default DashboardSettings

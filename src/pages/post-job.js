import React, { useRef, useState, useEffect } from 'react'
import PageWrapper from '../components/PageWrapper'

const DashboardSettings = () => {
  const editorRef = useRef()
  const [editorLoaded, setEditorLoaded] = useState(false)
  const { CKEditor, ClassicEditor } = editorRef.current || {}

  useEffect(() => {
    editorRef.current = {
      CKEditor: require('@ckeditor/ckeditor5-react').CKEditor,
      ClassicEditor: require('@ckeditor/ckeditor5-build-classic')
    }
    setEditorLoaded(true)
  }, [])

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
                    {editorLoaded ? (
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
                    ) : (
                      <div>Editor loading</div>
                    )}
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

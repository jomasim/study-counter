import React, { useRef, useState, useEffect } from 'react'
import PageWrapper from '../../components/PageWrapper'
import 'bs-stepper/dist/css/bs-stepper.min.css'

const Editor = () => {
  const editorRef = useRef()
  const stepper = useRef()
  const [editorLoaded, setEditorLoaded] = useState(false)
  const { CKEditor, ClassicEditor } = editorRef.current || {}

  useEffect(() => {
    editorRef.current = {
      CKEditor: require('@ckeditor/ckeditor5-react').CKEditor,
      ClassicEditor: require('@ckeditor/ckeditor5-build-classic')
    }
    setEditorLoaded(true)
    const Stepper = require('bs-stepper')
    stepper.current = new Stepper(document.querySelector('.bs-stepper'))
  }, [])

  const onSubmit = e => {
    e.preventDefault()
  }

  return (
    <PageWrapper
      headerConfig={{
        button: 'editor',
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
                  Question Title
                </h5>
                {/* start hererrerere */}
                <div className='bg-white shadow-8 pt-7 rounded pb-9 px-11'>
                  <div>
                    <div id='stepper1' className='bs-stepper'>
                      <div className='bs-stepper-header'>
                        <div className='step' data-target='#test-l-1'>
                          <button className='step-trigger'>
                            <span className='bs-stepper-circle'>1</span>
                            <span className='bs-stepper-label'>
                              Question Details
                            </span>
                          </button>
                        </div>
                        <div className='line'></div>
                        <div className='step' data-target='#test-l-2'>
                          <button className='step-trigger'>
                            <span className='bs-stepper-circle'>2</span>
                            <span className='bs-stepper-label'>
                              Select Subject
                            </span>
                          </button>
                        </div>
                        <div className='line'></div>
                        <div className='step' data-target='#test-l-3'>
                          <button className='step-trigger'>
                            <span className='bs-stepper-circle'>3</span>
                            <span className='bs-stepper-label'>Validate</span>
                          </button>
                        </div>
                      </div>
                      {/* stepper content for here */}
                      <div className='bs-stepper-content'>
                        <form onSubmit={onSubmit}>
                          <div id='test-l-1' className='content mt-10'>
                            {/* CKEDITOR FRO HERRER */}
                            {editorLoaded ? (
                              <CKEditor
                                editor={ClassicEditor}
                                data='<p>Start typing here ....</p>'
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
                            {/* ckdeitor end here */}
                            <button
                              className='btn btn-primary'
                              style={{ marginTop: '30px' }}
                              onClick={() => stepper.current.next()}
                            >
                              Next
                            </button>
                          </div>
                          <div id='test-l-2' className='content'>
                            <div className='form-group'>
                              <label htmlFor='exampleInputPassword1'>
                                Password
                              </label>
                              <input
                                type='password'
                                className='form-control'
                                id='exampleInputPassword1'
                                placeholder='Password'
                              />
                            </div>
                            <button
                              className='btn btn-primary'
                              onClick={() => stepper.current.next()}
                            >
                              Next
                            </button>
                          </div>
                          <div id='test-l-3' className='content text-center'>
                            <button
                              type='submit'
                              className='btn btn-primary mt-5'
                            >
                              Submit
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                  {/* end herrere */}
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

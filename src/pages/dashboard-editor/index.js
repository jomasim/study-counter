import React, { useRef, useState, useEffect } from 'react'
import PageWrapper from '../../components/PageWrapper'
import 'bs-stepper/dist/css/bs-stepper.min.css'
import { Accordion, Card, Button, Form } from 'react-bootstrap'

const subCategories = [
  'Math',
  'Business',
  'Science',
  'Engineering & Technology',
  'Arts & Humanities',
  'Social Science'
]

const subjs = [
  'Social Science',
  'Sociology',
  'Anatomy',
  'Biochemistry',
  'Financial Accounting'
]

const Subjects = () => {
  const [subject, setSubject] = useState('')
  return (
    <div>
      {subject && <Card body>{subject}</Card>}
      <Accordion defaultActiveKey="'0'" style={{ marginTop: '20px' }}>
        {subCategories.map((category, index) => (
          <Card key={index}>
            <Accordion.Toggle as={Card.Header} eventKey={`'${index}'`}>
              {category}
            </Accordion.Toggle>
            <Accordion.Collapse eventKey={`'${index}'`}>
              <Card.Body>
                {subjs.map((subject, index) => (
                  <Button
                    style={{ margin: '2px' }}
                    key={index}
                    variant='outline-info'
                    onClick={() => setSubject(subject)}
                  >
                    {subject}
                  </Button>
                ))}
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        ))}
      </Accordion>
    </div>
  )
}

const Course = () => (
  <Form.Group>
    <Form.Label>Enter your course code</Form.Label>
    <Form.Control type='text' placeholder='Course code i.e FGH0001' />
    <Form.Text className='text-muted'>
      The course code will help to match you to the best Tutor
    </Form.Text>
  </Form.Group>
)

const CEditor = () => {
  const editorRef = useRef()
  const [editorLoaded, setEditorLoaded] = useState(false)
  const { CKEditor, ClassicEditor } = editorRef.current || {}

  useEffect(() => {
    editorRef.current = {
      CKEditor: require('@ckeditor/ckeditor5-react').CKEditor,
      ClassicEditor: require('@ckeditor/ckeditor5-build-classic')
    }
    setEditorLoaded(true)
  })

  return (
    <div>
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
        <div>Editor loading ...</div>
      )}
    </div>
  )
}

const Editor = () => {
  const stepper = useRef()
  const [title, setTitle] = useState('')

  useEffect(() => {
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
                  {title}
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
                            <Form.Control
                              type='text'
                              placeholder='Question Title'
                              onChange={e => setTitle(e.target.value)}
                            />

                            {/* CKEDITOR FRO HERRER */}

                            <div style={{ marginTop: '20px' }}>
                              <CEditor />
                            </div>

                            <Button
                              variant='primary'
                              style={{ marginTop: '30px' }}
                              onClick={() => stepper.current.next()}
                            >
                              Next
                            </Button>
                          </div>
                          <div id='test-l-2' className='content'>
                            <Subjects />
                            <div style={{ marginTop: '20px' }}>
                              <Button
                                variant='outline-primary'
                                onClick={() => stepper.current.previous()}
                              >
                                Previous
                              </Button>
                              <Button
                                style={{
                                  marginLeft: '20px'
                                }}
                                variant='primary'
                                onClick={() => stepper.current.next()}
                              >
                                Next
                              </Button>
                            </div>
                          </div>
                          <div id='test-l-3' className='content text-center'>
                            <Course />
                            <div style={{ marginTop: '20px' }}>
                              <Button
                                variant='outline-primary'
                                onClick={() => stepper.current.previous()}
                              >
                                Previous
                              </Button>
                              <Button
                                style={{ marginLeft: '20px' }}
                                type='submit'
                                variant='primary'
                              >
                                Submit
                              </Button>
                            </div>
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

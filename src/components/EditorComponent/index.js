import React, { useRef, useState, useEffect } from 'react'
import 'bs-stepper/dist/css/bs-stepper.min.css'
import { InputTags } from 'react-bootstrap-tagsinput'
import 'react-bootstrap-tagsinput/dist/index.css'
import { Accordion, Card, Button, Form } from 'react-bootstrap'
import server from '../../utils/api'

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

const Subjects = ({ setSubject }) => (
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
)

const Course = ({ setCourseCode }) => (
  <Form.Group>
    <Form.Label>Enter your course code</Form.Label>
    <Form.Control
      type='text'
      placeholder='Course code i.e FGH0001'
      onChange={e => setCourseCode(e.target.value)}
    />
    <Form.Text className='text-muted'>
      The course code will help to match you to the best Tutor
    </Form.Text>
  </Form.Group>
)

const CEditor = ({ setContent }) => {
  const [editorLoaded, setEditorLoaded] = useState(false)
  const editorRef = useRef()
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
          onChange={(e, editor) => setContent(editor.getData())}
        />
      ) : (
        <div>Editor loading ...</div>
      )}
    </div>
  )
}

const QuestionForm = ({ setTitle, setContent, onSubmit }) => {
  const [validated, setValidated] = useState(false)
  const [state, setState] = useState([])
  const handleSubmit = event => {
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    } else {
      onSubmit(1)
    }

    setValidated(true)
  }
  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Control
          type='text'
          required
          placeholder='Question Title'
          onChange={e => setTitle(e.target.value)}
        />

        <Form.Control.Feedback type='invalid'>
          Please enter the question title.
        </Form.Control.Feedback>
        <Form.Text muted>
          Be specific, precise as much as possible e.g How to draft a letter
        </Form.Text>
      </Form.Group>

      <div style={{ marginTop: '20px' }} type='input' required>
        <CEditor setContent={setContent} />
      </div>
      <Form.Group style={{ marginTop: '20px' }}>
        <Form.Label>Tags</Form.Label>
        <InputTags
          placeholder='e.g Maths, Science'
          values={state}
          required
          onTags={value => setState(value.values)}
        />
        <Form.Control.Feedback type='invalid'>
          Please add a tag.
        </Form.Control.Feedback>
        <Form.Text muted>
          Add tags to describe your question e.g Math, Science, Algebra
        </Form.Text>
      </Form.Group>

      <Button variant='primary' style={{ marginTop: '30px' }} type='submit'>
        Next
      </Button>
    </Form>
  )
}

const Editor = () => {
  const stepper = useRef()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [subject, setSubject] = useState('')
  const [courseCode, setCourseCode] = useState('')

  useEffect(() => {
    const Stepper = require('bs-stepper')
    stepper.current = new Stepper(document.querySelector('.bs-stepper'))
  }, [])

  const onSubmit = e => {
    e.preventDefault()

    const token = localStorage.getItem('ACCESS_TOKEN')
    const api = server(token)
    console.log('data', content, title, courseCode, subject)
    // api
    //   .post('/question', {
    //     body: content,
    //     title,
    //     course_code: courseCode,
    //     subject_code: subject
    //   })
    //   .then(res => {
    //     alert('success here')
    //   })
    //   .catch(err => {
    //     console.log('error', err)
    //   })
  }

  const handleStepSubmit = step => {
    stepper.current.next()
  }

  return (
    <div>
      <div id='stepper1' className='bs-stepper'>
        <div className='bs-stepper-header'>
          <div className='step' data-target='#test-l-1'>
            <button className='step-trigger'>
              <span className='bs-stepper-circle'>1</span>
              <span className='bs-stepper-label'>Question Details</span>
            </button>
          </div>
          <div className='line'></div>
          <div className='step' data-target='#test-l-2'>
            <button className='step-trigger'>
              <span className='bs-stepper-circle'>2</span>
              <span className='bs-stepper-label'>Select Subject</span>
            </button>
          </div>
          <div className='line'></div>
          <div className='step' data-target='#test-l-3'>
            <button className='step-trigger'>
              <span className='bs-stepper-circle'>3</span>
              <span className='bs-stepper-label'>Course</span>
            </button>
          </div>
        </div>
        {/* stepper content for here */}
        <div className='bs-stepper-content'>
          <form onSubmit={onSubmit}>
            <div id='test-l-1' className='content mt-10'>
              <QuestionForm
                setContent={setContent}
                setTitle={setTitle}
                onSubmit={handleStepSubmit}
              />
            </div>
            <div id='test-l-2' className='content'>
              {subject && <Card body>{subject}</Card>}
              <Subjects setSubject={setSubject} />
              <div style={{ marginTop: '20px', display: 'flex' }}>
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
              <Course setCourseCode={setCourseCode} />
              <div style={{ marginTop: '20px', display: 'flex' }}>
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
  )
}
export default Editor

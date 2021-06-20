import React, { useRef, useState, useEffect, useContext } from 'react'
import 'bs-stepper/dist/css/bs-stepper.min.css'
import '@pathofdev/react-tag-input/build/index.css'
import { Accordion, Card, Button, Form } from 'react-bootstrap'
import server from '../../utils/api'
import { useAuth } from '../../context/AuthContext'
import GlobalContext from '../../context/GlobalContext'
import ReactTagInput from '@pathofdev/react-tag-input'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import UploadAdapterPlugin from '../../utils/Uploader'

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

const Extra = ({ setCourseCode, setDeadline, deadline, onSubmit, stepper }) => {
  const [validated, setValidated] = useState(false)
  const handleSubmit = event => {
    event.preventDefault()
    event.stopPropagation()
    const form = event.currentTarget
    if (form.checkValidity()) {
      onSubmit()
    }
    setValidated(true)
  }
  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Enter your course code</Form.Label>
        <Form.Control
          type='text'
          placeholder='Course code i.e CS-A01'
          required
          onChange={e => setCourseCode(e.target.value)}
        />
        <Form.Control.Feedback type='invalid'>
          Please add a course code.
        </Form.Control.Feedback>
        <Form.Text className='text-muted'>
          The course code will help to match you to the best Tutor
        </Form.Text>
      </Form.Group>
      <Form.Group>
        <Form.Label>Deadline</Form.Label>
        <div className='date-container'>
          <DatePicker
            className='date_picker'
            selected={deadline}
            onChange={date => setDeadline(date)}
          />
        </div>
      </Form.Group>

      <div style={{ marginTop: '20px', display: 'flex' }}>
        <Button
          variant='outline-primary'
          onClick={() => stepper.current.previous()}
        >
          Previous
        </Button>
        <Button style={{ marginLeft: '20px' }} type='submit' variant='primary'>
          Submit
        </Button>
      </div>
    </Form>
  )
}

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
          config={{
            toolbar: [
              'heading',
              '|',
              'bold',
              'italic',
              'blockQuote',
              'link',
              'numberedList',
              'bulletedList',
              'imageUpload',

              '|',
              'undo',
              'redo'
            ],
            placeholder: 'Start typing here ....',
            extraPlugins: [UploadAdapterPlugin]
          }}
          onChange={(e, editor) => setContent(editor.getData())}
        />
      ) : (
        <div>Editor loading ...</div>
      )}
    </div>
  )
}

const QuestionForm = ({ setTitle, setContent, stepper, fields, setTags }) => {
  const [validated, setValidated] = useState(false)
  const [errors, setErrors] = useState({})
  const handleSubmit = event => {
    event.preventDefault()
    event.stopPropagation()
    const form = event.currentTarget
    if (form.checkValidity() && validateContent()) {
      stepper.current.next()
    }

    setValidated(true)
  }

  const setBody = data => {
    setErrors({ ...errors, content: '' })
    setContent(data)
  }

  const validateContent = () => {
    if (fields['content'] === '') {
      setErrors({ ...errors, content: 'Question description is required' })
      return false
    }
    return true
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
        <CEditor setContent={setBody} />
        <Form.Control.Feedback
          type='invalid'
          style={{ display: errors.content ? 'block' : 'none' }}
        >
          Please add question description
        </Form.Control.Feedback>
      </div>
      <Form.Group style={{ marginTop: '20px' }}>
        <Form.Label>Tags</Form.Label>
        <ReactTagInput
          tags={fields.tags}
          onChange={newTags => setTags(newTags)}
          style={{ height: '4opx' }}
          placeholder='Add tag and press enter i.e Maths, Science'
          maxTags={10}
        />
        <Form.Control.Feedback type='invalid'>
          Please add a tag.
        </Form.Control.Feedback>
        <Form.Text muted>
          Add tags to describe your question e.g Math, Science, Algebra
        </Form.Text>
      </Form.Group>

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
          type='submit'
        >
          Next
        </Button>
      </div>
    </Form>
  )
}

const Editor = () => {
  const gContext = useContext(GlobalContext)
  const stepper = useRef()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [subject, setSubject] = useState('')
  const [courseCode, setCourseCode] = useState('')
  const { authUser, token } = useAuth()
  const [ready, setReady] = useState(false)
  const [tags, setTags] = useState([])
  const [deadline, setDeadline] = useState(new Date())

  useEffect(() => {
    if (ready && authUser) {
      handleQuestion()
      setReady(false)
    }
  }, [authUser])

  useEffect(() => {
    const Stepper = require('bs-stepper')
    stepper.current = new Stepper(document.querySelector('.bs-stepper'))
  }, [])

  const onSubmit = () => {
    console.log('data', content, title, courseCode, subject, tags, deadline)
    if (!authUser) {
      console.log('not logged in')
      gContext.toggleSignInModal()
      setReady(true)
    } else if (authUser) {
      console.log('logged in')
      handleQuestion()
    }
  }

  const handleQuestion = () => {
    const api = server(token)
    api
      .post('/question', {
        body: content,
        title,
        course_code: courseCode,
        subject_code: subject
      })
      .then(res => {
        alert('success here')
      })
      .catch(err => {
        console.log('error', err)
      })
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
              <span className='bs-stepper-label'>Extra Details</span>
            </button>
          </div>
        </div>
        {/* stepper content for here */}
        <div className='bs-stepper-content'>
          <div id='test-l-1' className='content mt-10'>
            <QuestionForm
              setContent={setContent}
              setTitle={setTitle}
              stepper={stepper}
              setTags={setTags}
              fields={{ title, content, tags }}
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
          <div id='test-l-3' className='content'>
            <Extra
              setCourseCode={setCourseCode}
              onSubmit={onSubmit}
              stepper={stepper}
              deadline={deadline}
              setDeadline={setDeadline}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
export default Editor

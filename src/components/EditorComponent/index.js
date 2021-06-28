import React, { useRef, useState, useEffect, useContext } from 'react'
import 'bs-stepper/dist/css/bs-stepper.min.css'
import '@pathofdev/react-tag-input/build/index.css'
import { Button, Form } from 'react-bootstrap'
import server from '../../utils/api'
import { useAuth } from '../../context/AuthContext'
import GlobalContext from '../../context/GlobalContext'
import ReactTagInput from '@pathofdev/react-tag-input'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import UploadAdapterPlugin from '../../utils/Uploader'
import FileUpload from '../FileUpload'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'
import { FaCaretDown, FaCaretUp } from 'react-icons/fa'


const SelectSubject = ({ options = [], subject, setSubject, stepper }) => {
  const [search, setSearch] = useState('')
  const [errors, setErrors] = useState({})

  const [visibility, setVisibility] = useState(false)
  const handleSubmit = event => {
    event.preventDefault()
    event.stopPropagation()
    if (subject !== '') {
      stepper.current.next()
    } else {
      setErrors({ ...errors, subject: { message: 'Subject is required' } })
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <div
          className='select'
          onClick={e => {
            setVisibility(!visibility)
            setSearch('')
          }}
          style={
            errors.subject
              ? { border: `1px solid #f71e3f` }
              : { border: `1px solid #e1e1e1` }
          }
        >
          <div className='selected-option'>
            <span>{subject === '' ? 'Select a subject' : subject}</span>
            {visibility ? <FaCaretDown /> : <FaCaretUp />}
          </div>
        </div>
        <div id='error'>
          {errors.subject && (
            <span style={{ color: 'red', fontWeight: '200', fontSize: '13px' }}>
              {errors.subject.message}
            </span>
          )}
        </div>
        <Form.Text muted>Select subject e.g Math, Science, Algebra</Form.Text>
      </Form.Group>
      {visibility && (
        <div className='options'>
          <input
            style={{ marginTop: '10px' }}
            className='search-input-select'
            type='text'
            placeholder='Search field'
            onSubmit={e => e.preventDefault()}
            value={search}
            onChange={e => {
              setSearch(e.target.value)
              setErrors({ ...errors, subject: null })
            }}
          />
          <ul>
            {options
              .filter(option =>
                option.toLowerCase().includes(search.toLowerCase())
              )
              .map((option, index) => (
                <li
                  key={index}
                  className={subject === option ? 'active-option' : null}
                  onClick={() => {
                    setErrors({ ...errors, subject: null })
                    setSubject(option)
                  }}
                >
                  {option}
                </li>
              ))}
          </ul>
        </div>
      )}

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

const subjs = [
  'Social Science',
  'Sociology',
  'Anatomy',
  'Biochemistry',
  'Financial Accounting',
  'Math',
  'Business',
  'Science',
  'Engineering & Technology',
  'Arts & Humanities',
  'Social Science'
]

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

        <DatePicker
          className='date_picker form-control'
          selected={deadline}
          required
          value={deadline}
          onChange={date => setDeadline(date)}
        />
        <Form.Control.Feedback>Deadline is required</Form.Control.Feedback>
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

const QuestionForm = ({
  setTitle,
  setContent,
  stepper,
  fields,
  setTags,
  files,
  setFiles
}) => {
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
      <Form.Group style={{ marginTop: '20px' }}>
        <Form.Label>Attachments</Form.Label>
        <FileUpload docs={files} setDocs={setFiles} />
        <Form.Text muted>Add files i.e pdf relation to your question</Form.Text>
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
  const router = useRouter()
  const stepper = useRef()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [subject, setSubject] = useState('')
  const [courseCode, setCourseCode] = useState('')
  const { authUser, token } = useAuth()
  const [ready, setReady] = useState(false)
  const [tags, setTags] = useState([])
  const [deadline, setDeadline] = useState(new Date())
  const [files, setFiles] = useState([])

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
    if (!authUser) {
      gContext.toggleSignInModal()
      setReady(true)
    } else if (authUser) {
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
        subject_code: subject,
        deadline,
        tags,
        files
      })
      .then(res => {
        toast('Success!', { type: 'success', position: 'top-right' })
        router.push('/dashboard')
      })
      .catch(err => {
        toast('An error occured!', { type: 'error', position: 'top-right' })
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
              files={files}
              setFiles={setFiles}
            />
          </div>
          <div id='test-l-2' className='content'>
            <SelectSubject
              options={subjs}
              setSubject={setSubject}
              subject={subject}
              stepper={stepper}
            />
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

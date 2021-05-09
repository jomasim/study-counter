import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import { Modal, Spinner } from 'react-bootstrap'
import GlobalContext from '../../context/GlobalContext'
import { firebaseAuth } from '../../../firebase'

const ModalStyled = styled(Modal)`
  /* &.modal {
    z-index: 10050;
  } */
`

const ModalSignIn = props => {
  const [showPass, setShowPass] = useState(true)
  const gContext = useContext(GlobalContext)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [validation, setValidation] = useState({})
  const [loading, setLoading] = useState(false)

  const handleOpenSignUp = e => {
    e.preventDefault()
    // close sign in first
    gContext.toggleSignInModal()
    //open sign up modal
    gContext.toggleSignUpModal()
  }

  const handleClose = () => {
    gContext.toggleSignInModal()
  }

  const togglePassword = () => {
    setShowPass(!showPass)
  }

  const handleSubmit = e => {
    e.preventDefault()
    if (validateForm()) {
      setLoading(true)
      firebaseAuth
        .signInWithEmailAndPassword(email, password)
        .then(res => {
          setLoading(false)
          console.log(res.user)
        })
        .catch(err => {
          setLoading(false)
          const { code, message } = err
          console.log(code, message)
        })
    }
  }

  const validateForm = () => {
    const fields = {}
    let valid = true
    const validateEmail = () => {
      var re = /\S+@\S+\.\S+/
      let message = ''
      if (email === '') {
        message = 'Email is required'
      } else if (!re.test(email)) {
        message = 'Enter a valid email'
      }
      valid = valid && message === ''
      return message
    }
    const validatePassword = () => {
      let message = ''
      if (password === '') {
        message = 'Password is required'
      } else if (password.length < 8) {
        message = 'Password should contain atleast 8 characters'
      }
      valid = valid && message === ''
      return message
    }
    fields['email'] = validateEmail()
    fields['password'] = validatePassword()
    //set validation messages
    setValidation(fields)
    return valid
  }

  return (
    <ModalStyled
      {...props}
      size='lg'
      centered
      show={gContext.signInModalVisible}
      onHide={gContext.toggleSignInModal}
    >
      <Modal.Body className='p-0'>
        <button
          type='button'
          className='circle-32 btn-reset bg-white pos-abs-tr mt-md-n6 mr-lg-n6 focus-reset z-index-supper'
          onClick={handleClose}
        >
          <i className='fas fa-times'></i>
        </button>
        <div className='login-modal-main bg-white rounded-8 overflow-hidden'>
          <div className='row no-gutters'>
            <div className='col-lg-5 col-md-6'>
              <div className='pt-10 pb-6 pl-11 pr-12 bg-black-2 h-100 d-flex flex-column dark-mode-texts'>
                <div className='pb-9'>
                  <h3 className='font-size-8 text-white line-height-reset pb-4 line-height-1p4'>
                    Welcome Back
                  </h3>
                  <p className='mb-0 font-size-4 text-white'>
                    Log in to continue your account and explore new jobs.
                  </p>
                </div>
                <div className='border-top border-default-color-2 mt-auto'>
                  <div className='d-flex mx-n9 pt-6 flex-xs-row flex-column'>
                    <div className='pt-5 px-9'>
                      <h3 className='font-size-7 text-white'>295</h3>
                      <p className='font-size-3 text-white gr-opacity-5 line-height-1p4'>
                        New jobs posted today
                      </p>
                    </div>
                    <div className='pt-5 px-9'>
                      <h3 className='font-size-7 text-white'>14</h3>
                      <p className='font-size-3 text-white gr-opacity-5 line-height-1p4'>
                        New companies registered
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='col-lg-7 col-md-6'>
              <div className='bg-white-2 h-100 px-11 pt-11 pb-7'>
                <form>
                  <div className='form-group'>
                    <label
                      htmlFor='email'
                      className='font-size-4 text-black-2 font-weight-semibold line-height-reset'
                    >
                      E-mail
                    </label>
                    <input
                      type='email'
                      required
                      className='form-control'
                      placeholder='example@gmail.com'
                      onChange={e => {
                        if (validation['email']) {
                          setValidation({ ...validation, email: '' })
                        }
                        setEmail(e.target.value)
                      }}
                      id='email'
                    />
                    {validation.email ? (
                      <label style={{ color: 'red', fontSize: 'small' }}>
                        {validation.email}
                      </label>
                    ) : (
                      ''
                    )}
                  </div>
                  <div className='form-group'>
                    <label
                      htmlFor='password'
                      className='font-size-4 text-black-2 font-weight-semibold line-height-reset'
                    >
                      Password
                    </label>
                    <div className='position-relative'>
                      <input
                        type={showPass ? 'password' : 'text'}
                        className='form-control'
                        required
                        id='password'
                        onChange={e => {
                          if (validation['password']) {
                            setValidation({ ...validation, password: '' })
                          }
                          setPassword(e.target.value)
                        }}
                        placeholder='Enter password'
                      />
                      <a
                        href='/#'
                        className='show-password pos-abs-cr fas mr-6 text-black-2'
                        onClick={e => {
                          e.preventDefault()
                          togglePassword()
                        }}
                      >
                        <span className='d-none'>none</span>
                      </a>
                    </div>
                    {validation.password ? (
                      <label style={{ color: 'red', fontSize: 'small' }}>
                        {validation.password}
                      </label>
                    ) : (
                      ''
                    )}
                  </div>
                  <div className='form-group d-flex flex-wrap justify-content-between'>
                    <label
                      htmlFor='terms-check'
                      className='gr-check-input d-flex  mr-3'
                    >
                      <input
                        className='d-none'
                        type='checkbox'
                        id='terms-check'
                        required
                      />
                      <span className='checkbox mr-5'></span>
                      <span className='font-size-3 mb-0 line-height-reset mb-1 d-block'>
                        Remember password
                      </span>
                    </label>
                    <a
                      href='/#'
                      className='font-size-3 text-dodger line-height-reset'
                    >
                      Forget Password
                    </a>
                  </div>
                  <div className='form-group mb-8'>
                    <button
                      onClick={e => handleSubmit(e)}
                      className='btn btn-primary btn-medium w-100 rounded-5 text-uppercase'
                    >
                      {loading ? <Spinner animation='border' /> : 'Log in'}
                    </button>
                  </div>
                  <p className='font-size-4 text-center heading-default-color'>
                    Don’t have an account?
                    <a
                      href='/#/login'
                      className='text-primary'
                      onClick={e => handleOpenSignUp(e)}
                    >
                      Create a free account
                    </a>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>
    </ModalStyled>
  )
}

export default ModalSignIn

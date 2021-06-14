import React, { useState, useEffect, useContext, useRef } from 'react'

import styled, { ThemeProvider } from 'styled-components'
import Helmet from 'next/head'
import AOS from 'aos'

import Header from '../Header'
import Footer from '../Footer'
import ModalSignUp from '../ModalSignUp'
import ModalSign from '../ModalSignIn'

import SidebarDashboard from '../SidebarDashboard'

import GlobalContext from '../../context/GlobalContext'

import GlobalStyle from '../../utils/globalStyle'

import imgFavicon from '../../assets/favicon.png'

import { get, merge } from 'lodash'

// the full theme object
import { theme as baseTheme } from '../../utils'
import { useAuth } from '../../context/AuthContext'
import { Spinner } from 'react-bootstrap'
import { useRouter } from 'next/router'

const Loader = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: #fff;
  z-index: 9999999999;
  opacity: 1;
  visibility: visible;
  transition: all 1s ease-out 0.5s;
  &.inActive {
    opacity: 0;
    visibility: hidden;
  }
`

// options for different color modes
const modes = { light: 'light', dark: 'dark' }

// merge the color mode with the base theme
// to create a new theme object
const getTheme = mode =>
  merge({}, baseTheme, {
    colors: get(baseTheme.colors.modes, mode, baseTheme.colors)
  })

const Layout = ({ children, pageContext }) => {
  const gContext = useContext(GlobalContext)
  const [visibleLoader, setVisibleLoader] = useState(true)
  const { loading, authUser } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !authUser) {
      router.push('/')
    } else if (!loading && authUser) {
      // router.push('/dashboard')
    }
  }, [loading])

  useEffect(() => {
    AOS.init({ once: true })
    setVisibleLoader(false)
  }, [])

  // Navbar style based on scroll
  const eleRef = useRef()

  useEffect(() => {
    window.addEventListener(
      'popstate',
      function (event) {
        // The popstate event is fired each time when the current history entry changes.
        gContext.closeOffCanvas()
      },
      false
    )
    window.addEventListener(
      'pushState',
      function (event) {
        // The pushstate event is fired each time when the current history entry changes.
        gContext.closeOffCanvas()
      },
      false
    )
  }, [gContext])

  if (pageContext.layout === 'dashboard' && loading) {
    return (
      <div
        style={{
          position: 'absolute',
          top: '50%',
          transform: 'translateY(-50%)',
          left: '50%'
        }}
        className='skelton'
      >
        <Spinner animation='grow' variant='primary'></Spinner>
      </div>
    )
  }

  if (pageContext.layout === 'bare') {
    return (
      <ThemeProvider
        theme={
          gContext.themeDark ? getTheme(modes.dark) : getTheme(modes.light)
        }
      >
        <div data-theme-mode-panel-active data-theme='light'>
          <GlobalStyle />
          <Helmet>
            <title>Study Counter | Boost your GPA</title>
            <link rel='icon' type='image/png' href={imgFavicon} />
          </Helmet>
          <Loader id='loading' className={visibleLoader ? '' : 'inActive'}>
            <div className='load-circle'>
              <span className='one'></span>
            </div>
          </Loader>
          <div className='site-wrapper overflow-hidden' ref={eleRef}>
            {children}
          </div>
          <ModalSign />
          <ModalSignUp />
        </div>
      </ThemeProvider>
    )
  }

  if (authUser && pageContext.layout === 'dashboard') {
    return (
      <ThemeProvider
        theme={
          gContext.themeDark ? getTheme(modes.dark) : getTheme(modes.light)
        }
      >
        <div data-theme-mode-panel-active data-theme='light'>
          <GlobalStyle />
          <Helmet>
            <title>Study Counter | Boost your GPA</title>
            <link rel='icon' type='image/png' href={imgFavicon} />
          </Helmet>
          <Loader id='loading' className={visibleLoader ? '' : 'inActive'}>
            <div className='load-circle'>
              <span className='one'></span>
            </div>
          </Loader>
          <div
            className='site-wrapper overflow-hidden bg-default-2'
            ref={eleRef}
          >
            <Header isDark={gContext.headerDark} />
            <SidebarDashboard />
            {children}
          </div>
          <ModalSign />
          <ModalSignUp />
        </div>
      </ThemeProvider>
    )
  }
  if (pageContext.layout === 'dashboard' && !authUser && !loading) {
    return null
  }
  return (
    <>
      <ThemeProvider
        theme={
          gContext.themeDark ? getTheme(modes.dark) : getTheme(modes.light)
        }
      >
        <div data-theme-mode-panel-active data-theme='light'>
          <GlobalStyle />
          <Helmet>
            <title>Study Counter | Boost your GPA</title>
            <link rel='icon' type='image/png' href={imgFavicon} />
          </Helmet>
          <Loader id='loading' className={visibleLoader ? '' : 'inActive'} />
          <div className='site-wrapper overflow-hidden' ref={eleRef}>
            <Header isDark={gContext.headerDark} />
            {children}

            <Footer isDark={gContext.footerDark} />
          </div>
          <ModalSign />
          <ModalSignUp />
        </div>
      </ThemeProvider>
    </>
  )
}

export default Layout

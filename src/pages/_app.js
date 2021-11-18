// import App from 'next/app'
import React, { useEffect } from 'react'
import Layout from '../components/Layout'
import { GlobalProvider } from '../context/GlobalContext'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import '../assets/fonts/fontawesome-5/webfonts/fa-brands-400.ttf'
import '../assets/fonts/fontawesome-5/webfonts/fa-regular-400.ttf'
import '../assets/fonts/fontawesome-5/webfonts/fa-solid-900.ttf'

import '../assets/fonts/icon-font/fonts/avasta.ttf'
import '../assets/fonts/icon-font/css/style.css'

import '../../node_modules/slick-carousel/slick/slick.css'
import '../../node_modules/slick-carousel/slick/slick-theme.css'
import '../../node_modules/aos/dist/aos.css'

import '../assets/fonts/icon-font/css/style.css'
import '../assets/fonts/fontawesome-5/css/all.css'

import '../scss/bootstrap.scss'
import '../scss/main.scss'
import { Spinner } from 'react-bootstrap'

import { AuthProvider, useAuth } from '../context/AuthContext'
import { useRouter } from 'next/router'
import TagManager from 'react-gtm-module'

const Dashboard = ({ Component, pageProps, role }) => {
  const { loading, authUser, claims } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && (!claims || claims.role !== role)) {
      router.push('/')
    }
  }, [loading])

  if (loading) {
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

  if (!loading && authUser && claims.role === role) {
    return (
      <Layout pageContext={{ layout: 'dashboard' }}>
        <Component {...pageProps} />
      </Layout>
    )
  }
  return null
}

const MyApp = ({ Component, pageProps, router }) => {
  useEffect(() => {
    TagManager.initialize({ gtmId: 'GGTM-P73XRX8' })
  }, [])
  if (router.pathname.match(/404/)) {
    return (
      <GlobalProvider>
        <Layout pageContext={{ layout: 'bare' }}>
          <Component {...pageProps} />
        </Layout>
      </GlobalProvider>
    )
  }
  if (router.pathname.match(/student/)) {
    return (
      <GlobalProvider>
        <AuthProvider>
          <ToastContainer />
          <Dashboard
            Component={Component}
            pageProps={pageProps}
            role='student'
          />
        </AuthProvider>
      </GlobalProvider>
    )
  }
  if (router.pathname.match(/tutor/)) {
    return (
      <GlobalProvider>
        <AuthProvider>
          <ToastContainer />
          <Dashboard Component={Component} pageProps={pageProps} role='tutor' />
        </AuthProvider>
      </GlobalProvider>
    )
  }
  return (
    <GlobalProvider>
      <AuthProvider>
        <ToastContainer />
        <Layout pageContext={{}}>
          <Component {...pageProps} />

          {/* <!-- Start of  Zendesk Widget script --> */}
          <script
            id='ze-snippet'
            src='https://static.zdassets.com/ekr/snippet.js?key=854621f1-22bc-447a-9d4d-3b3705395563'
          ></script>
          {/* <!-- End of  Zendesk Widget script --> */}
        </Layout>
      </AuthProvider>
    </GlobalProvider>
  )
}

export default MyApp

// import App from 'next/app'
import Layout from '../components/Layout'
import { GlobalProvider } from '../context/GlobalContext'

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


const MyApp = ({ Component, pageProps, router }) => {
  if (router.pathname.match(/404/)) {
    return (
      <GlobalProvider>
        <Layout pageContext={{ layout: 'bare' }}>
          <Component {...pageProps} />
        </Layout>
      </GlobalProvider>
    )
  }
  if (router.pathname.match(/dashboard/)) {
    return (
      <GlobalProvider>
        <Layout pageContext={{ layout: 'dashboard' }}>
          <Component {...pageProps} />
        </Layout>
      </GlobalProvider>
    )
  }

  return (
    <GlobalProvider>
      <Layout pageContext={{}}>
        <Component {...pageProps} />

        {/* <!-- Start of  Zendesk Widget script --> */}
        <script
          id='ze-snippet'
          src='https://static.zdassets.com/ekr/snippet.js?key=854621f1-22bc-447a-9d4d-3b3705395563'
        >
          {' '}
        </script>
        {/* <!-- End of  Zendesk Widget script --> */}
      </Layout>
    </GlobalProvider>
  )
}

export default MyApp

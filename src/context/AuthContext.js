import { useRouter } from 'next/router'
import { useEffect, createContext, useContext } from 'react'
import { useState } from 'react'
import { firebaseAuth } from '../../firebase'
import GlobalContext from './GlobalContext'
import { toast } from 'react-toastify'
import server from '../utils/api'

const formatAuthUser = user => ({
  uid: user.uid,
  email: user.email
})

export const useFirebaseAuth = () => {
  const [authUser, setAuthUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [token, setToken] = useState(null)
  const [claims, setClaims] = useState(null)
  const [loginResponse, setLoginResponse] = useState({})
  const router = useRouter()
  const gContext = useContext(GlobalContext)

  const clear = () => {
    setAuthUser(null)
    setLoading(true)
  }

  const handleRouting = idTokenResult => {
    if (idTokenResult.claims.role === 'tutor') {
      router.push('/tutor/home')
    } else if (idTokenResult.claims.role === 'student') {
      router.push('/student/home')
    } else {
      router.push('/student/home')
    }
  }

  const signOut = () => firebaseAuth.signOut().then(clear)

  const authStateChanged = async authState => {
    if (!authState) {
      setAuthUser(null)
      setLoading(false)
      return
    }
    var formattedUser = formatAuthUser(authState)
    const idToken = await authState.getIdToken(true)
    const idTokenResult = await authState.getIdTokenResult()
    setClaims(idTokenResult.claims)
    setToken(idToken)
    setAuthUser(formattedUser)
    setLoading(false)
  }
  const signUpWithEmailAndPassword = (email, password, role, redirect) => {
    const api = server()
    setLoading(true)
    api
      .post('/user', { email, password, role })
      .then(async res => {
        setLoading(false)
        gContext.toggleSignUpModal()
        const idToken = await res.user.getIdToken(true)
        const idTokenResult = await res.user.getIdTokenResult()
        setClaims(idTokenResult.claims)
        setToken(idToken)
        if (redirect) {
          handleRouting(idTokenResult)
        }
      })
      .catch(err => {
        setLoading(false)
        toast(err.message, { type: 'error', position: 'top-right' })
      })
  }
  const signInWithEmailAndPassword = (email, password, redirect) => {
    setLoading(true)
    firebaseAuth
      .signInWithEmailAndPassword(email, password)
      .then(async res => {
        const idToken = await res.user.getIdToken(true)
        const idTokenResult = await res.user.getIdTokenResult()
        setClaims(idTokenResult.claims)
        setToken(idToken)
        setLoading(false)
        setLoginResponse({ ...loginResponse, message: '' })
        gContext.toggleSignInModal()
        if (redirect) {
          handleRouting(idTokenResult)
        }
      })
      .catch(err => {
        setLoading(false)
        setLoginResponse({ ...err })
        toast(err.message, { type: 'error', position: 'top-right' })
      })
  }

  // listen for Firebase state change
  useEffect(() => {
    const unsubscribe = firebaseAuth.onAuthStateChanged(authStateChanged)
    return () => unsubscribe()
  }, [])

  return {
    authUser,
    loading,
    signOut,
    signInWithEmailAndPassword,
    signUpWithEmailAndPassword,
    token,
    claims,
    loginResponse
  }
}

export const AuthContext = createContext({
  authUser: null,
  loading: true,
  signOut: async () => {},
  signInWithEmailAndPassword: async () => true,
  signUpWithEmailAndPassword: async () => true,
  token: null,
  claims: null,
  loginResponse: {}
})

export const AuthProvider = ({ children }) => {
  const auth = useFirebaseAuth()
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}

// custom hook to use the authContext and access authUser and loading
export const useAuth = () => useContext(AuthContext)

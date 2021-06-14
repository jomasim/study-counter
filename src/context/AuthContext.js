import { useRouter } from 'next/router'
import { useEffect, createContext, useContext } from 'react'
import { useState } from 'react'
import { firebaseAuth } from '../../firebase'
import GlobalContext from './GlobalContext'

const formatAuthUser = user => ({
  uid: user.uid,
  email: user.email
})

export const useFirebaseAuth = () => {
  const [authUser, setAuthUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [token, setToken] = useState(null)
  const [loginResponse, setLoginResponse] = useState({})
  const router = useRouter()
  const gContext = useContext(GlobalContext)

  const clear = () => {
    setAuthUser(null)
    setLoading(true)
  }

  const signOut = () => firebaseAuth.signOut().then(clear)

  const authStateChanged = async authState => {
    if (!authState) {
      setAuthUser(null)
      setLoading(false)
      return
    }
    var formattedUser = formatAuthUser(authState)
    const idToken = await authState.getIdToken()
    setToken(idToken)
    setAuthUser(formattedUser)
    setLoading(false)
  }

  const signInWithEmailAndPassword = (email, password, redirect) => {
    firebaseAuth
      .signInWithEmailAndPassword(email, password)
      .then(async res => {
        const idToken = await res.user.getIdToken()
        setToken(idToken)
        setLoading(false)
        setLoginResponse({ ...loginResponse, message: '' })
        gContext.toggleSignInModal()
        if (redirect) {
          router.push(redirect)
        }
      })
      .catch(err => {
        setLoading(false)
        setLoginResponse({ ...err })
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
    token,
    loginResponse
  }
}

export const AuthContext = createContext({
  authUser: null,
  loading: true,
  signOut: async () => {},
  signInWithEmailAndPassword: async () => true,
  token: null,
  loginResponse: {}
})

export const AuthProvider = ({ children }) => {
  const auth = useFirebaseAuth()
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}

// custom hook to use the authContext and access authUser and loading
export const useAuth = () => useContext(AuthContext)

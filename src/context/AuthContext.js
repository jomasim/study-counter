import { useEffect, createContext, useContext } from 'react'
import { useState } from 'react'
import { firebaseAuth } from '../../firebase'

const formatAuthUser = user => ({
  uid: user.uid,
  email: user.email
})

export const useFirebaseAuth = () => {
  const [authUser, setAuthUser] = useState(null)
  const [loading, setLoading] = useState(true)

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
    setAuthUser(formattedUser)
    setLoading(false)
    console.log('am here kaka', authUser)
  }

  // listen for Firebase state change
  useEffect(() => {
    const unsubscribe = firebaseAuth.onAuthStateChanged(authStateChanged)
    return () => unsubscribe()
  }, [])

  return {
    authUser,
    loading,
    signOut
  }
}

export const AuthContext = createContext({
  authUser: null,
  loading: true,
  signOut: async () => {}
})

export const AuthProvider = ({ children }) => {
  const auth = useFirebaseAuth()
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}

// custom hook to use the authContext and access authUser and loading
export const useAuth = () => useContext(AuthContext)

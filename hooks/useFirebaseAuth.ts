import { useState, useCallback, ChangeEvent, FormEvent } from 'react'
import firebase from '../firebaseConfig'

export const useFirebaseAuth = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLogin, setIsLogin] = useState(true)

  const emailChange = useCallback((e: ChangeEvent<HTMLFormElement>) => {
    setEmail(e.target.value)
  }, [])
  const pwChange = useCallback((e: ChangeEvent<HTMLFormElement>) => {
    setPassword(e.target.value)
  }, [])
  const resetInput = useCallback(() => {
    setEmail('')
    setPassword('')
  }, [])
  const toggleMode = useCallback(() => {
    setIsLogin(!isLogin)
  }, [isLogin])
  const authUser = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      if (isLogin) {
        try {
          await firebase.auth().signInWithEmailAndPassword(email, password)
        } catch (e: any) {
          alert(e.message)
        }
        resetInput()
      } else {
        try {
          await firebase.auth().createUserWithEmailAndPassword(email, password)
        } catch (e: any) {
          alert(e.message)
        }
        resetInput()
      }
    },
    [email, password, isLogin, resetInput]
  )

  return {
    email,
    password,
    isLogin,
    emailChange,
    pwChange,
    resetInput,
    toggleMode,
    authUser,
  }
}

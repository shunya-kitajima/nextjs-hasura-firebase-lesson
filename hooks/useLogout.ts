import { useQueryClient } from 'react-query'
import { useDispatch } from 'react-redux'
import Cookie from 'universal-cookie'
import firebase from '../firebaseConfig'
import { unSubMeta } from './useUserChanged'
import { resetEditedNews, resetEditedTask } from '../slices/uiSlice'

const cookie = new Cookie()

export const useLogout = () => {
  const queryClient = useQueryClient()
  const dispatch = useDispatch()
  const logout = async () => {
    if (unSubMeta) {
      unSubMeta()
    }
    dispatch(resetEditedNews())
    dispatch(resetEditedTask())
    await firebase.auth().signOut()
    queryClient.removeQueries('news')
    queryClient.removeQueries('tasks')

    cookie.remove('token')
  }

  return { logout }
}

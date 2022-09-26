import React from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import {
  ChevronDoubleLeftIcon,
  ArrowRightOnRectangleIcon,
} from '@heroicons/react/20/solid'
import { useLogout } from '../hooks/useLogout'
import { Layout } from '../components/Layout'
import firebase from '../firebaseConfig'

const Tasks: React.FC = () => {
  const router = useRouter()
  const { logout } = useLogout()
  const user = firebase.auth().currentUser

  return (
    <Layout title="tasks">
      <p className="my-3">{user?.email}</p>
      <ArrowRightOnRectangleIcon
        className="h-5 w-5 my-3 text-blue-500 cursor-pointer"
        onClick={() => {
          logout()
          router.push('/')
        }}
      />
      <Link href="/">
        <div className="mt-20 flex items-center cursor-pointer">
          <ChevronDoubleLeftIcon className="h-5 w-5 mx-1 text-blue-500" />
          <span>Back to main page</span>
        </div>
      </Link>
    </Layout>
  )
}

export default Tasks

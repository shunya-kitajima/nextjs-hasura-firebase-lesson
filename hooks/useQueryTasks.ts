import { request } from 'graphql-request'
import { useQuery } from 'react-query'
import { Task } from '../types/types'
import { GET_TASKS } from '../queries/queries'

interface TaskRes {
  tasks: Task[]
}

export const fetchTasks = async () => {
  const { tasks: data } = await request<TaskRes>(
    process.env.NEXT_PUBLIC_HASURA_ENDPOINT,
    GET_TASKS
  )
  return data
}

export const useQueryTasks = () => {
  return useQuery<Task[], Error>({
    queryKey: 'tasks',
    queryFn: fetchTasks,
    staleTime: Infinity,
  })
}

import { useEffect } from 'react'
import { GraphQLClient } from 'graphql-request'
import { useQuery } from 'react-query'
import Cookie from 'universal-cookie'
import { Task } from '../types/types'
import { GET_TASKS } from '../queries/queries'

const cookie = new Cookie()
const endpoint = process.env.NEXT_PUBLIC_HASURA_ENDPOINT as string
let graphqlClient: GraphQLClient

interface TasksRes {
  tasks: Task[]
}

export const fetchTasks = async () => {
  const { tasks: data } = await graphqlClient.request<TasksRes>(GET_TASKS)
  return data
}

export const useQueryTasks = () => {
  useEffect(() => {
    graphqlClient = new GraphQLClient(endpoint, {
      headers: {
        Authorization: `Bearer ${cookie.get('token')}`,
      },
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cookie.get('token')])

  return useQuery<Task[], Error>({
    queryKey: 'tasks',
    queryFn: fetchTasks,
    staleTime: 0,
  })
}

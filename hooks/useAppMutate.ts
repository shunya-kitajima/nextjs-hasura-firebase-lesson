import { useEffect } from 'react'
import { useQueryClient, useMutation } from 'react-query'
import { GraphQLClient } from 'graphql-request'
import Cookie from 'universal-cookie'
import { useDispatch } from 'react-redux'
import {
  CREATE_NEWS,
  UPDATE_NEWS,
  DELETE_NEWS,
  CREATE_TASK,
  UPDATE_TASK,
  DELETE_TASK,
} from '../queries/queries'
import { News, EditNews, Task, EditTask } from '../types/types'
import { resetEditedNews, resetEditedTask } from '../slices/uiSlice'

const cookie = new Cookie()
const endpoint = process.env.NEXT_PUBLIC_HASURA_ENDPOINT as string
let graphQLClient: GraphQLClient

export const useAppMutate = () => {
  const dispatch = useDispatch()
  const queryClient = useQueryClient()

  useEffect(() => {
    graphQLClient = new GraphQLClient(endpoint, {
      headers: {
        Authorization: `Bearer ${cookie.get('token')}`,
      },
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cookie.get('token')])

  const createNewsMutation = useMutation(
    (content: string) =>
      graphQLClient.request(CREATE_NEWS, { content: content }),
    {
      onSuccess: (res) => {
        const previousNews = queryClient.getQueryData<News[]>('news')
        if (previousNews) {
          queryClient.setQueryData('news', [
            ...previousNews,
            res.insert_news_one,
          ])
        }
        dispatch(resetEditedNews())
      },
      onError: (err: any) => {
        alert(err.message)
        dispatch(resetEditedNews())
      },
    }
  )
  const updateNewsMutation = useMutation(
    (news: EditNews) => graphQLClient.request(UPDATE_NEWS, news),
    {
      onSuccess: (res, variables) => {
        const previousNews = queryClient.getQueryData<News[]>('news')
        if (previousNews) {
          queryClient.setQueryData(
            'news',
            previousNews.map((news) =>
              news.id === variables.id ? res.update_news_by_pk : news
            )
          )
        }
        dispatch(resetEditedNews())
      },
      onError: (err: any) => {
        alert(err.message)
        dispatch(resetEditedNews())
      },
    }
  )
  const deleteNewsMutation = useMutation(
    (id: string) => graphQLClient.request(DELETE_NEWS, { id: id }),
    {
      onSuccess: (res, variables) => {
        const previousNews = queryClient.getQueryData<News[]>('news')
        if (previousNews) {
          queryClient.setQueryData(
            'news',
            previousNews.filter((news) => news.id !== variables)
          )
        }
        dispatch(resetEditedNews())
      },
      onError: (err: any) => {
        alert(err.message)
        dispatch(resetEditedNews())
      },
    }
  )

  const createTaskMutation = useMutation(
    (title: string) => graphQLClient.request(CREATE_TASK, { title: title }),
    {
      onSuccess: (res) => {
        const previousTodos = queryClient.getQueryData<Task[]>('tasks')
        if (previousTodos) {
          queryClient.setQueryData('tasks', [
            ...previousTodos,
            res.insert_tasks_one,
          ])
        }
        dispatch(resetEditedTask())
      },
      onError: (err: any) => {
        alert(err.message)
        dispatch(resetEditedTask())
      },
    }
  )
  const updateTaskMutation = useMutation(
    (task: EditTask) => graphQLClient.request(UPDATE_TASK, task),
    {
      onSuccess: (res, variables) => {
        const previousTodos = queryClient.getQueryData<Task[]>('tasks')
        if (previousTodos) {
          queryClient.setQueryData(
            'tasks',
            previousTodos.map((task) =>
              task.id === variables.id ? res.update_tasks_by_pk : task
            )
          )
        }
        dispatch(resetEditedTask)
      },
      onError: (err: any) => {
        alert(err.message)
        dispatch(resetEditedTask())
      },
    }
  )
  const deleteTaskMutation = useMutation(
    (id: string) => graphQLClient.request(DELETE_TASK, { id: id }),
    {
      onSuccess: (res, variables) => {
        const previousTodos = queryClient.getQueryData<Task[]>('tasks')
        if (previousTodos) {
          queryClient.setQueryData<Task[]>(
            'tasks',
            previousTodos.filter((task) => task.id !== variables)
          )
        }
        dispatch(resetEditedTask)
      },
      onError: (err: any) => {
        alert(err.message)
        dispatch(resetEditedTask())
      },
    }
  )

  return {
    createNewsMutation,
    updateNewsMutation,
    deleteNewsMutation,
    createTaskMutation,
    updateTaskMutation,
    deleteTaskMutation,
  }
}

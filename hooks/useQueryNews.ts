import { request } from 'graphql-request'
import { useQuery } from 'react-query'
import { News } from '../types/types'
import { GET_NEWS } from '../queries/queries'

interface NewsRes {
  news: News[]
}

const endpoint = process.env.NEXT_PUBLIC_HASURA_ENDPOINT as string

export const fetchNews = async () => {
  const { news: data } = await request<NewsRes>(endpoint, GET_NEWS)
  return data
}

export const useQueryNews = () => {
  return useQuery<News[], Error>({
    queryKey: 'news',
    queryFn: fetchNews,
    staleTime: Infinity,
  })
}

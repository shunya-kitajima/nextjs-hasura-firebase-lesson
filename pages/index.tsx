import type { NextPage } from 'next'
import { GetStaticProps } from 'next'
import { QueryClient, useQueryClient } from 'react-query'
import { dehydrate } from 'react-query/hydration'
import { Layout } from '../components/Layout'
import { Auth } from '../components/Auth'
import { fetchNews } from '../hooks/useQueryNews'
import { News } from '../types/types'

export const getStaticProps: GetStaticProps = async () => {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery('news', fetchNews)
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 3,
  }
}

const Home: NextPage = () => {
  const queryClient = useQueryClient()
  const data = queryClient.getQueryData<News[]>('news')

  return (
    <Layout title="Home">
      <p className="mb-5 text-blue-500 text-xl">News list by SSG</p>
      {data?.map((news) => (
        <p className="font-bold" key={news.id}>
          {news.content}
        </p>
      ))}
      <Auth />
    </Layout>
  )
}

export default Home

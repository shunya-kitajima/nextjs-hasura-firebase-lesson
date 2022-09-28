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
  }
}

const Home: NextPage = () => {
  return (
    <Layout title="Home">
      <Auth />
    </Layout>
  )
}

export default Home

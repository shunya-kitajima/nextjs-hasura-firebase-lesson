import React, { memo } from 'react'
import { useDispatch } from 'react-redux'
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/20/solid'
import { setEditedNews } from '../slices/uiSlice'
import { useAppMutate } from '../hooks/useAppMutate'
import { News } from '../types/types'

interface Props {
  news: News
}

export const NewsItem: React.FC<Props> = ({ news }) => {
  const dispatch = useDispatch()
  const { deleteNewsMutation } = useAppMutate()

  if (deleteNewsMutation.isLoading) return <p>Deleting...</p>

  return (
    <li className="my-3">
      <span className="font-bold">{news.content}</span>
      <div className="flex float-right ml-20">
        <PencilSquareIcon
          className="h-5 w-5 mx-1 text-blue-500 cursor-pointer"
          onClick={() => {
            dispatch(
              setEditedNews({
                id: news.id,
                content: news.content,
              })
            )
          }}
        />
        <TrashIcon
          className="h-5 w-5 text-blue-500 cursor-pointer"
          onClick={() => {
            deleteNewsMutation.mutate(news.id)
          }}
        />
      </div>
    </li>
  )
}

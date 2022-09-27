import React, { memo, FormEvent } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useAppMutate } from '../hooks/useAppMutate'
import { setEditedNews, selectNews } from '../slices/uiSlice'

const NewsEdit: React.FC = () => {
  const dispatch = useDispatch()
  const editedNews = useSelector(selectNews)
  const { createNewsMutation, updateNewsMutation } = useAppMutate()

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (editedNews.id === '') {
      createNewsMutation.mutate(editedNews.content)
    } else {
      updateNewsMutation.mutate(editedNews)
    }
  }

  return (
    <div>
      <form onSubmit={submitHandler}>
        <input
          className="mb-3 px-3 py-2 border border-gray-300"
          placeholder="new news ?"
          type="text"
          value={editedNews.content}
          onChange={(e) =>
            dispatch(setEditedNews({ ...editedNews, content: e.target.value }))
          }
        />
      </form>
    </div>
  )
}

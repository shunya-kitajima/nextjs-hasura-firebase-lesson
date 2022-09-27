import React, { memo, FormEvent } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useAppMutate } from '../hooks/useAppMutate'
import { setEditedTask, selectTask } from '../slices/uiSlice'

export const TaskEdit: React.FC = () => {
  const dispatch = useDispatch()
  const editedTask = useSelector(selectTask)
  const { createTaskMutation, updateTaskMutation } = useAppMutate()

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (editedTask.id === '') {
      createTaskMutation.mutate(editedTask.title)
    } else {
      updateTaskMutation.mutate(editedTask)
    }
  }

  return (
    <div>
      <form onSubmit={submitHandler}>
        <input
          className="mb-3 px-3 py-2 border border-gray-300"
          placeholder="new task ?"
          type="text"
          value={editedTask.title}
          onChange={(e) =>
            dispatch(setEditedTask({ ...editedTask, title: e.target.value }))
          }
        />
      </form>
    </div>
  )
}

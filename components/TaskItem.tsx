import React, { memo } from 'react'
import { useDispatch } from 'react-redux'
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/20/solid'
import { setEditedTask } from '../slices/uiSlice'
import { useAppMutate } from '../hooks/useAppMutate'
import { Task } from '../types/types'

interface Props {
  task: Task
}

const TaskItem: React.FC<Props> = ({ task }) => {
  const dispatch = useDispatch()
  const { deleteTaskMutation } = useAppMutate()

  if (deleteTaskMutation.isLoading) return <p>Deleting...</p>
  if (deleteTaskMutation.error) return <p>Error</p>

  return (
    <li className="my-3">
      <span className="font-bold">{task.title}</span>
      <div className="flex float-right ml-20">
        <PencilSquareIcon
          className="h-5 w-5 mx-1 text-blue-500 cursor-pointer"
          onClick={() => {
            dispatch(
              setEditedTask({
                id: task.id,
                title: task.title,
              })
            )
          }}
        />
        <TrashIcon
          className="h-5 w-5 text-blue-500 cursor-pointer"
          onClick={() => {
            deleteTaskMutation.mutate(task.id)
          }}
        />
      </div>
    </li>
  )
}

export const TaskItemMemo = memo(TaskItem)

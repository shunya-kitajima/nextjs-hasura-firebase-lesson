import React, { memo } from 'react'
import { useQueryTasks } from '../hooks/useQueryTasks'
import { TaskItemMemo } from './TaskItem'

export const TaskList: React.FC = () => {
  const { status, data } = useQueryTasks()

  if (status === 'loading') return <div>{'Loading...'}</div>
  if (status === 'error') return <div>{'Error'}</div>

  return (
    <ul>
      {data?.map((task) => (
        <TaskItemMemo key={task.id} task={task} />
      ))}
    </ul>
  )
}

export const TaskListMemo = memo(TaskList)

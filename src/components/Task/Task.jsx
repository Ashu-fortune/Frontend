import React from 'react'
import './task.scss'
import { useDispatch } from 'react-redux'
import { openViewTaskModal } from '../../features/global/modalSlice'
import { Draggable } from 'react-beautiful-dnd'
import { format } from 'date-fns'

const Task = ({ boardID, columnID, task, index }) => {
  const dispatch = useDispatch()

  const getFinishedSubTasks = (task) => {
    let finishedSubTasks = 0
    task.subTasks.forEach((subtask) => {
      if (subtask.isDone) {
        finishedSubTasks++
      }
    })
    return finishedSubTasks
  }

  // Format the creation date
  const formatCreationDate = (dateString) => {
    if (!dateString) return ''
    try {
      const date = new Date(dateString)
      return format(date, 'MMM d')
    } catch (error) {
      return ''
    }
  }

  return (
    <Draggable draggableId={task.id.toString()} index={index} key={task.id}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className='task bg-task'
          onClick={() => dispatch(openViewTaskModal(task))}
        >
          <h4 className='task__name f-task-title'>{task.name}</h4>
          <div className='task__sub f-task-subtitle'>
            {getFinishedSubTasks(task)} of {task.subTasks.length} subtasks
          </div>
          <div className='task__meta'>
            {task.hoursRequired && (
              <div className='task__time-badge'>{task.hoursRequired}h</div>
            )}
            {task.creationDate && (
              <div className='task__date-badge'>
                {formatCreationDate(task.creationDate)}
              </div>
            )}
          </div>
        </div>
      )}
    </Draggable>
  )
}

export default Task

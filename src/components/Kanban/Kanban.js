import React, { useEffect, useReducer } from 'react'
import PropTypes from 'prop-types'
import classes from './styles.module.css'
import { tasksContext, columnsContext } from '../../contexts'
import Board from '../Board'
import useStorage from '../../useStorageHook'

export const Kanban = (props) => {
  const { className } = props
  const init = {
    columns: [
      { id: 1, name: 'Pending', limit: 2 },
      { id: 2, name: 'Analysis - Doing', limit: 3 },
      { id: 3, name: 'Analysis - Done', limit: 2 }
    ],
    tasks: [
      { id: 1, name: 'Task1', idColumn: 1, user: 'Anna' },
      { id: 2, name: 'Task2', idColumn: 2, user: 'Mateusz' },
      { id: 3, name: 'Task3', idColumn: 1, user: 'Anna' }
    ]

  }

  const reducer = (state, action) => {
    const newState = { ...state }

    // eslint-disable-next-line default-case
    switch (action.moveTo) {
      case 'right':
        newState.tasks = newState.tasks.map(task => {
          if (action.taskId === task.id) return { ...task, idColumn: task.idColumn + 1 }
          return task
        })
        return { ...newState }

      case 'left':
        newState.tasks = newState.tasks.map(task => {
          if (action.taskId === task.id) return { ...task, idColumn: task.idColumn + -1 }
          return task
        })
        return { ...newState }
    }
  }

  const isColumnIncomplete = (colId) => {
    const tasksInColumn = state.tasks.reduce((prevValue, currValue) => {
      if (colId === currValue.idColumn) prevValue = prevValue + 1

      return prevValue
    }, 0)

    const actualColumn = state.columns.find(column => colId === column.id)

    return tasksInColumn !== actualColumn.limit
  }

  const isNextColumnAvailable = (colId) => {
    return (colId !== state.columns.length)
  }

  const isPrevColumnAvailable = (colId) => {
    return (colId !== 1)
  }

  const moveTaskColumnRight = (taskId) => {
    const actualTask = state.tasks.find((task) => task.id === taskId)

    if (isNextColumnAvailable(actualTask.idColumn)) {
      if (isColumnIncomplete(actualTask.idColumn + 1)) {
        dispatch({ moveTo: 'right', taskId: taskId })
      }
    }
  }

  const moveTaskColumnLeft = (taskId) => {
    const actualTask = state.tasks.find((task) => task.id === taskId)

    if (isPrevColumnAvailable(actualTask.idColumn)) {
      if (isColumnIncomplete(actualTask.idColumn - 1)) {
        dispatch({ moveTo: 'left', taskId: taskId })
      }
    }
  }

  // eslint-disable-next-line no-unused-vars
  const [state, dispatch] = useReducer(reducer, init)
  // eslint-disable-next-line no-unused-vars
  const [setItem, getItem] = useStorage('Kanban')

  useEffect(() => {
    setItem(state)
  }, [state.tasks]) // tutaj od state lub od state.tasks lub od wszystkiego

  const { tasks, columns } = state

  return (
    <columnsContext.Provider value={columns}>
      <tasksContext.Provider value={{ tasks: tasks, leftButtonHandler: moveTaskColumnLeft, rightButtonHandler: moveTaskColumnRight }}>
        <div className={`${classes.root}${className ? ' ' + classes[className] : ''}`}>
          <Board/>
        </div>
      </tasksContext.Provider>
    </columnsContext.Provider>
  )
}

Kanban.propTypes = {
  className: PropTypes.string
}

export default Kanban

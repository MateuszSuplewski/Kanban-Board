/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useReducer } from 'react'
import classes from './styles.module.css'
import { tasksContext, columnsContext, errorContext } from '../../contexts'
import Board from '../Board'
import useStorage from '../../hooks/useStorage'
import Form from '../Form'
import { isColumnIncomplete, isNextColumnAvailable, isPrevColumnAvailable } from '../../helper'

export const Kanban = () => {
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
    ],
    error: ''
  }

  const reducer = (state, { type, taskId, dataToLoad, newTask, error }) => {
    const newState = { ...state }
    newState.error = ''

    switch (type) {
      case 'moveRight':
        newState.tasks = newState.tasks.map(task => {
          if (taskId === task.id) return { ...task, idColumn: task.idColumn + 1 }
          return task
        })
        return { ...newState }

      case 'moveLeft':
        newState.tasks = newState.tasks.map(task => {
          if (taskId === task.id) return { ...task, idColumn: task.idColumn + -1 }
          return task
        })
        return { ...newState }

      case 'loadData':
        return { ...dataToLoad }

      case 'addTask':
        newState.tasks = [...newState.tasks, newTask]
        return { ...newState }

      case 'showError':
        newState.error = error
        return { ...newState }

      default: {
        return { state }
      }
    }
  }

  const moveTaskColumnRight = (taskId) => {
    const actualTask = state.tasks.find((task) => task.id === taskId)

    if (isNextColumnAvailable(actualTask.idColumn, state)) {
      if (isColumnIncomplete(actualTask.idColumn + 1, state)) {
        dispatch({ type: 'moveRight', taskId: taskId })
      } else {
        dispatch({ type: 'showError', error: 'Can\'t move task to next column, because limit in column has been reached' })
      }
    } else {
      dispatch({ type: 'showError', error: 'Can\'t move task to next column, because there is no next column on the right' })
    }
  }

  const moveTaskColumnLeft = (taskId) => {
    const actualTask = state.tasks.find((task) => task.id === taskId)

    if (isPrevColumnAvailable(actualTask.idColumn)) {
      if (isColumnIncomplete(actualTask.idColumn - 1, state)) {
        dispatch({ type: 'moveLeft', taskId: taskId })
      } else {
        dispatch({ type: 'showError', error: 'Can\'t move task to next column, because limit in column has been reached' })
      }
    } else {
      dispatch({ type: 'showError', error: 'Can\'t move task to previous column, because there is no next column on the left' })
    }
  }

  const addTask = (taskData) => {
    if (isColumnIncomplete(1, state)) {
      const newTask = {
        id: state.tasks.length + 1,
        ...taskData,
        idColumn: 1
      }

      dispatch({ type: 'addTask', newTask: newTask })
    } else {
      dispatch({ type: 'showError', error: 'Can\'t add task to your board, because limit in first column has been reached' })
    }
  }

  const [state, dispatch] = useReducer(reducer, init)
  const [setItem, getItem] = useStorage('Kanban')

  useEffect(() => {
    if (getItem() === null) {
      setItem(state)
    } else {
      dispatch({ type: 'loadData', dataToLoad: getItem() })
    }
  }, [])

  useEffect(() => setItem(state), [state.tasks])

  const { tasks, columns, error } = state

  return (
    <columnsContext.Provider value={columns}>
      <tasksContext.Provider value={{ tasks: tasks, leftButtonHandler: moveTaskColumnLeft, rightButtonHandler: moveTaskColumnRight }}>
        <errorContext.Provider value={error}>
          <div className={classes.root}>
            <Board/>
            <Form addTask={addTask}/>
          </div>
        </errorContext.Provider>
      </tasksContext.Provider>
    </columnsContext.Provider>
  )
}

export default Kanban

import React, { useEffect, useReducer } from 'react'
import PropTypes from 'prop-types'
import classes from './styles.module.css'
import { tasksContext, columnsContext } from '../../contexts'
import Board from '../Board'
import useStorage from '../../useStorageHook'
import Form from '../Form'

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
    switch (action.type) {
      case 'moveRight':
        newState.tasks = newState.tasks.map(task => {
          if (action.taskId === task.id) return { ...task, idColumn: task.idColumn + 1 }
          return task
        })
        return { ...newState }

      case 'moveLeft':
        newState.tasks = newState.tasks.map(task => {
          if (action.taskId === task.id) return { ...task, idColumn: task.idColumn + -1 }
          return task
        })
        return { ...newState }

      case 'loadData':
        return { ...action.dataToLoad }

      case 'addTask':
        newState.tasks = [...newState.tasks, action.newTask]
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
        dispatch({ type: 'moveRight', taskId: taskId })
      }
    }
  }

  const moveTaskColumnLeft = (taskId) => {
    const actualTask = state.tasks.find((task) => task.id === taskId)

    if (isPrevColumnAvailable(actualTask.idColumn)) {
      if (isColumnIncomplete(actualTask.idColumn - 1)) {
        dispatch({ type: 'moveLeft', taskId: taskId })
      }
    }
  }

  const addTask = (taskData) => {
    if (isColumnIncomplete(1)) {
      const newTask = {
        ...taskData,
        idColumn: 1,
        id: state.tasks.length + 1
      }

      dispatch({ type: 'addTask', newTask: newTask })
    }
  }

  // eslint-disable-next-line no-unused-vars
  const [state, dispatch] = useReducer(reducer, init)
  // eslint-disable-next-line no-unused-vars
  const [setItem, getItem] = useStorage('Kanban')

  // pomyslec nad działanie effectow
  useEffect(() => {
    if (getItem() === null) {
      setItem(state)
      console.log('hello')
    } else {
      dispatch({ type: 'loadData', dataToLoad: getItem() })
    }
  }, [])

  useEffect(() => {
    console.log(getItem())
    setItem(state)
    console.log('zmiany')
  }, [state.tasks]) // tutaj od state lub od state.tasks lub od wszystkiego

  const { tasks, columns } = state

  return (
    <columnsContext.Provider value={columns}>
      <tasksContext.Provider value={{ tasks: tasks, leftButtonHandler: moveTaskColumnLeft, rightButtonHandler: moveTaskColumnRight }}>
        <div className={`${classes.root}${className ? ' ' + classes[className] : ''}`}>
          <Board/>
          <Form addTask={addTask}/>
        </div>
      </tasksContext.Provider>
    </columnsContext.Provider>
  )
}

Kanban.propTypes = {
  className: PropTypes.string
}

export default Kanban

import React, { useReducer } from 'react'
import PropTypes from 'prop-types'
import classes from './styles.module.css'
import { tasksContext, columnsContext } from '../../contexts'
import Board from '../Board'
import useStorage from '../../useStorageHook'

export const Kanban = (props) => {
  const { className } = props
  const init = {
    columns: [
      { id: 1, name: 'Pending', limit: 4 },
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
    console.log(newState)

    // eslint-disable-next-line default-case
    switch (action.moveTo) {
      case '2':
        console.log('2')
        return { ...state }
    }
  }

  // eslint-disable-next-line no-unused-vars
  const [state, dispatch] = useReducer(reducer, init)
  // eslint-disable-next-line no-unused-vars
  const [setItem, getItem] = useStorage('Kanban')
  setItem(state)
  // console.log(getItem())

  const { tasks, columns } = state

  return (
    <columnsContext.Provider value={columns}>
      <tasksContext.Provider value={tasks}>
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

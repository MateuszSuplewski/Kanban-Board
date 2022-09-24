import React from 'react'
import PropTypes from 'prop-types'
import classes from './styles.module.css'
import Task from '../Task'
import { tasksContext } from '../../contexts'

export const Column = (props) => {
  const { className, colId, name, limit } = props
  const tasks = React.useContext(tasksContext)

  console.log('COLUMNS: ', colId, name, limit)

  return (
    <div className={`${classes.root}${className ? ' ' + classes[className] : ''}`}>
      <div className={classes.columnInfoContainer}>
        <h3>{name}</h3>
        <p>Limit: {limit}</p>
      </div>
      {
        tasks.map(({ id, name, idColumn, user }) => (
          colId === idColumn ?
              (
                <Task
                  key={id}
                  taskId={id}
                  name={name}
                  idColumn={idColumn}
                  user={user}
                />
              )
            :
            null
        ))
      }
    </div>

  )
}

Column.propTypes = {
  className: PropTypes.string,
  colId: PropTypes.number,
  name: PropTypes.string,
  limit: PropTypes.number
}

export default Column

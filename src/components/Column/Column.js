import React from 'react'
import PropTypes from 'prop-types'
import classes from './styles.module.css'
import Task from '../Task'
import { tasksContext } from '../../contexts'

export const Column = (props) => {
  const { colId, name, limit } = props
  const { tasks } = React.useContext(tasksContext)

  return (
    <div className={classes.root}>
      <div className={classes.columnInfoContainer}>
        <h3>{name}</h3>
        <p className={classes.columnInfoLimit}>Limit: {limit}</p>
      </div>
      {
        tasks.map(({ id, name, idColumn, user }) => (
          colId === idColumn ?
              (
                <Task
                  key={id}
                  taskId={id}
                  name={name}
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
  colId: PropTypes.number,
  name: PropTypes.string,
  limit: PropTypes.number
}

export default Column

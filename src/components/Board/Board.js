import React from 'react'
import classes from './styles.module.css'
import Column from '../Column'
import { columnsContext, errorContext } from '../../contexts'

export const Board = () => {
  const columns = React.useContext(columnsContext)
  const error = React.useContext(errorContext)
  return (
    <div className={classes.root}>
      <div className={classes.boardTitle}>Tablica Kanban</div>

      <div className={classes.errorContainer}>{error ? <p className={classes.error}>{error}</p> : null}</div>
      <div className={classes.columnsContainer}>
        {
        columns.map(({ id, name, limit }) => (
          <Column
            key={id}
            name={name}
            limit = {limit}
            colId={id}
          />
        ))
        }
      </div>
    </div>
  )
}

export default Board

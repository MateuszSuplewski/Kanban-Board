import React from 'react'
import PropTypes from 'prop-types'
import classes from './styles.module.css'
import Column from '../Column'
import { columnsContext } from '../../contexts'

export const Board = (props) => {
  const { className } = props
  const columns = React.useContext(columnsContext)
  return (
    <div className={`${classes.root}${className ? ' ' + classes[className] : ''}`}>
      <div className={classes.boardTitle}>Your Custom Canban Board name</div>
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

Board.propTypes = {
  className: PropTypes.string
}

export default Board

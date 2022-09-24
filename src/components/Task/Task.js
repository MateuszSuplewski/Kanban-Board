import React from 'react'
import PropTypes from 'prop-types'
import classes from './styles.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleArrowLeft, faCircleArrowRight } from '@fortawesome/free-solid-svg-icons'

export const Task = (props) => {
  const { className, taskId, name, idColumn, user } = props
  console.log('TASKS: ', taskId, name, idColumn, user)
  return (
    <div className={`${classes.root}${className ? ' ' + classes[className] : ''}`}>
      <div className={classes.buttonsContainer}>
        <button className={classes.buttonLeft}>
          <FontAwesomeIcon
            icon={faCircleArrowLeft}
            size={'2x'}
            className={classes.arrow}
          />
        </button>
        <button className={classes.buttonRight}>
          <FontAwesomeIcon
            icon={faCircleArrowRight}
            size={'2x'}
            className={classes.arrow}
          />
        </button>
      </div>
      <h4>{name}</h4>
      <p>Assigned to: {user}</p>
    </div>

  )
}

Task.propTypes = {
  className: PropTypes.string,
  taskId: PropTypes.number,
  name: PropTypes.string,
  idColumn: PropTypes.number,
  user: PropTypes.string
}

export default Task

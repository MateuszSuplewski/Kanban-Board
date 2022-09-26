import React from 'react'
import PropTypes from 'prop-types'
import classes from './styles.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleArrowLeft, faCircleArrowRight } from '@fortawesome/free-solid-svg-icons'
import { tasksContext } from '../../contexts'

export const Task = (props) => {
  const { taskId, name, user } = props
  const { rightButtonHandler, leftButtonHandler } = React.useContext(tasksContext)

  return (
    <div className={classes.root}>
      <div className={classes.buttonsContainer}>
        <button
          className={classes.buttonLeft}
          onClick={() => leftButtonHandler(taskId)}
        >
          <FontAwesomeIcon
            icon={faCircleArrowLeft}
            size={'2x'}
            className={classes.arrow}
          />
        </button>
        <button
          className={classes.buttonRight}
          onClick={() => rightButtonHandler(taskId)}
        >
          <FontAwesomeIcon
            icon={faCircleArrowRight}
            size={'2x'}
            className={classes.arrow}
          />
        </button>
      </div>
      <h4>{name}</h4>
      <p className={classes.user}>Assigned to: {user}</p>
    </div>
  )
}

Task.propTypes = {
  taskId: PropTypes.number,
  name: PropTypes.string,
  user: PropTypes.string
}

export default Task

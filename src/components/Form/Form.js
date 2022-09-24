import React from 'react'
import PropTypes from 'prop-types'
import classes from './styles.module.css'

export const Form = (props) => {
  const { className } = props
  return (
    <div className={`${classes.root}${className ? ' ' + classes[className] : ''}`}></div>

  )
}

Form.propTypes = {
  className: PropTypes.string
}

export default Form

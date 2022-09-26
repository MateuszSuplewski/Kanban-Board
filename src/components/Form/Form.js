import React, { useState, useReducer } from 'react'
import PropTypes from 'prop-types'
import classes from './styles.module.css'
import { fields } from '../../formFieldsData'

export const Form = (props) => {
  const { className, addTask } = props
  const init = {
    name: '',
    user: ''
  }
  const reducer = (state, action) => {
    const { type, key, value } = action
    switch (type) {
      case 'change':
        return { ...state, [key]: value }
      case 'clearAll':
        return { ...init }
      default: {
        return { state }
      }
    }
  }

  const Validate = (formFields) => {
    const formErrors = {}
    let isValid = true
    formFields.forEach((field) => {
      const { name, pattern, label, error, required } = field
      const fieldValue = state[name]

      if (fieldValue.length === 0 && required) {
        formErrors[name] = (`Dane w polu ${label} są wymagane!`)
        isValid = false
      }

      if (!fieldValue.match(pattern) && fieldValue) {
        formErrors[name] = error
        isValid = false
      }
    })
    return { formErrors, isValid }
  }

  const formHandler = (e) => {
    e.preventDefault()
    const { formErrors, isValid } = Validate(fields)
    setErrors(formErrors)
    if (isValid) {
      addTask(state)
      dispatch({ type: 'clearAll' })
    }
  }

  const [state, dispatch] = useReducer(reducer, init)
  const [errors, setErrors] = useState({ ...init })

  return (
    <form
      className={`${classes.root}${className ? ' ' + classes[className] : ''}`}
      noValidate
      onSubmit={formHandler}
    >
      <h2 className={classes.formTitle}>Formularz do zadań</h2>
      {
          fields.map(({ name, label, type }) => (
            <React.Fragment key={label}>
              <label
                className={classes.formLabel}
                htmlFor={name}
              >{label}
              </label>
              <input
                className={classes.formInput}
                id={name}
                name={name}
                value={state[name]}
                type={type}
                onChange={(e) => dispatch({ type: 'change', key: e.target.name, value: e.target.value })}
              />
              {errors[name] ? <p className={classes.formError}>{errors[name]}</p> : null}
            </React.Fragment>
          )
          )
              }

      <button
        className={classes.formSubmitButton}
        type={'submit'}
      >Dodaj
      </button>
    </form>
  )
}

Form.propTypes = {
  className: PropTypes.string,
  addTask: PropTypes.func
}

export default Form

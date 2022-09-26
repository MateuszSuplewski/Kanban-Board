const validate = (formFields, values) => {
  const formErrors = {}
  let isValid = true

  formFields.forEach((field) => {
    const { name, pattern, label, error, required } = field
    const fieldValue = values[name]

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

const isColumnIncomplete = (colId, state) => {
  const tasksInColumn = state.tasks.reduce((counter, { idColumn }) => {
    if (colId === idColumn) counter = counter + 1
    return counter
  }, 0)

  const actualColumn = state.columns.find(column => colId === column.id)

  return tasksInColumn !== actualColumn.limit
}

const isNextColumnAvailable = (colId, state) => {
  return (colId !== state.columns.length)
}

const isPrevColumnAvailable = (colId) => {
  return (colId !== 1)
}

const getActualTaskColumnId = (taskId, state) => {
  const actualTask = state.tasks.find(({ id }) => id === taskId)
  const { idColumn } = actualTask
  return idColumn
}

export { validate, isColumnIncomplete, isNextColumnAvailable, isPrevColumnAvailable, getActualTaskColumnId }

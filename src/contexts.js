import React from 'react'

const tasksContext = React.createContext('')
const columnsContext = React.createContext('')
const errorContext = React.createContext('')

tasksContext.displayName = 'tasksContext'
columnsContext.displayName = 'columnsContext'
errorContext.displayName = 'errorContext'

export { tasksContext, columnsContext, errorContext }

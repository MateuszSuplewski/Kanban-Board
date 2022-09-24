import React from 'react'

const tasksContext = React.createContext('')
const columnsContext = React.createContext('')

tasksContext.displayName = 'tasksContext'
columnsContext.displayName = 'columnsContext'

export { tasksContext, columnsContext }

import React, { createContext, useReducer } from 'react'

const initialState = {}
const AppContext = createContext(initialState)
const { Provider } = AppContext

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case 'SET_USER':
        return { user: action.data }
      default:
        throw new Error()
    }
  }, initialState)

  return <Provider value={{ state, dispatch }}>{children}</Provider>
}

export { AppContext, AppProvider }

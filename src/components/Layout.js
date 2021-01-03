import { useApolloClient } from '@apollo/client'
import React, { useContext, useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { CURRENT_USER } from '../graphql'
import { AppContext } from './AppContext'

export default function Layout({ children }) {
  const [cookies] = useCookies(['token'])
  const { state, dispatch } = useContext(AppContext)
  const client = useApolloClient()

  useEffect(() => {
    if (cookies.token) {
      client.query({
        query: CURRENT_USER
      }).then(currentUserData => {
        dispatch({ type: 'SET_USER', data: currentUserData.data.currentUser })
      })
    }
  }, [cookies, dispatch, client])

  return (
    <div>
      {cookies.token && state.user ? children : children}
    </div>
  )
}

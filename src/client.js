import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import Cookies from 'js-cookie'
import { concatPagination } from "@apollo/client/utilities"

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_SERVER_ENDPOINT
})

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = Cookies.get('token')
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      ...(token && { authorization: `Bearer ${token}` }),
    }
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          posts: concatPagination(),
        },
      },
    },
  }),
  credentials: 'include'
})

export default client

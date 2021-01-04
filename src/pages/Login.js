import React, { useState } from 'react'
import { Box, Button, Flex, FormControl, FormLabel, Heading, Input, useToast } from '@chakra-ui/react'
import { useApolloClient } from '@apollo/client'
import { useHistory } from 'react-router-dom'
import { SIGN_IN, } from '../graphql'
import { useCookies } from 'react-cookie'
import { Helmet } from 'react-helmet'

export default function Login() {
  const [formValue, setFormValue] = useState({})
  const history = useHistory()
  const [cookies, setCookie] = useCookies(['token'])

  const toast = useToast()
  const client = useApolloClient()

  const handleChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value })
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      const signInResponse = await client.mutate({
        mutation: SIGN_IN,
        variables: {
          data: formValue
        }
      })
      if (signInResponse.data.signIn.success) {
        setCookie('token', signInResponse.data.signIn.token)
        toast({
          title: signInResponse.data.signIn.message,
          status: "success",
          duration: 3000,
        })
        history.push('/')
      } else {
        toast({
          title: signInResponse.data.signIn.message,
          status: "error",
          duration: 5000,
          isClosable: true,
        })
      }
    } catch (error) {
      toast({
        title: error.message || 'Something went wrong',
        status: "error",
        duration: 5000,
        isClosable: true,
      })
    }
  }

  return (
    <>
      <Helmet><title>Log In | Blogs</title></Helmet>
      <Flex width="full" align="center" justifyContent="center">
        <Box mt={12} p={8} width="420px" borderWidth={1} borderRadius={8} boxShadow="lg">
          <Box textAlign="center">
            <Heading>Login</Heading>
          </Box>
          <Box my={4} textAlign="left">
            <form onSubmit={onSubmit}>
              <FormControl>
                <FormLabel>User Name</FormLabel>
                <Input required name="userName" type="text" placeholder="john.doe" onChange={handleChange} />
              </FormControl>
              <FormControl mt={6}>
                <FormLabel>Password</FormLabel>
                <Input required name="password" minLength="4" type="password" placeholder="*******" onChange={handleChange} />
              </FormControl>
              <Button type="submit" colorScheme="teal" variant="outline" width="full" mt={4}>
                Sign In
            </Button>
            </form>
          </Box>
        </Box>
      </Flex>
    </>
  )
}

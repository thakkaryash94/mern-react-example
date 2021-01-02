import React, { useState } from 'react'
import { Box, Button, Flex, FormControl, FormLabel, Heading, Input, useToast } from '@chakra-ui/react'
import { useMutation } from '@apollo/client'
import Cookies from 'js-cookie'
import { useHistory } from 'react-router-dom'
import { SIGN_IN } from '../graphql'

export default function Login() {
  const [formValue, setFormValue] = useState({})
  const history = useHistory()

  const toast = useToast()
  const [signInMutation] = useMutation(SIGN_IN)

  const handleChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value })
  }

  const onSubmit = (e) => {
    e.preventDefault()
    signInMutation({
      variables: {
        data: formValue
      }
    }).then(response => {
      if (response.data.signIn.success) {
        Cookies.set('token', response.data.signIn.token)
        toast({
          title: response.data.signIn.message,
          status: "success",
          duration: 3000,
        })
        history.push('/')
      } else {
        toast({
          title: response.data.signIn.message,
          status: "error",
          duration: 5000,
          isClosable: true,
        })
      }
    })
  }

  return (
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
  )
}

import React, { useState } from 'react'
import { Box, Button, Flex, FormControl, FormLabel, Heading, Input, useToast } from '@chakra-ui/react'
import { useMutation } from '@apollo/client'
import { Helmet } from "react-helmet"
import { useHistory } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import { SIGN_UP } from '../graphql'

export default function Signup() {
  const [formValue, setFormValue] = useState({})
  const history = useHistory()
  const [cookies, setCookie] = useCookies(['token'])

  const toast = useToast()
  const [signUpMutation] = useMutation(SIGN_UP)

  const handleChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value })
  }

  const onSubmit = (e) => {
    e.preventDefault()
    signUpMutation({
      variables: {
        data: formValue
      }
    }).then(signUpResponse => {
      if (signUpResponse.data.signUp.success) {
        setCookie('token', signUpResponse.data.signUp.token)
        toast({
          title: signUpResponse.data.signUp.message,
          status: "success",
          duration: 3000,
        })
        history.push('/')
      } else {
        toast({
          title: signUpResponse.data.signUp.message,
          status: "error",
          duration: 5000,
          isClosable: true,
        })
      }
    })
  }

  return (
    <>
      <Helmet><title>Sign Up | Blogs</title></Helmet>
      <Flex width="full" align="center" justifyContent="center">
        <Box mt={12} p={8} width="420px" borderWidth={1} borderRadius={8} boxShadow="lg">
          <Box textAlign="center">
            <Heading>Sign Up</Heading>
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
                Sign Up
            </Button>
            </form>
          </Box>
        </Box>
      </Flex>
    </>
  )
}

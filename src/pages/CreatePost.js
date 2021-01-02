import React, { useState } from 'react'
import { Box, Button, Flex, FormControl, FormLabel, Heading, Input, Textarea, useToast } from '@chakra-ui/react'
import { useMutation } from '@apollo/client'
import { useHistory } from 'react-router-dom'
import { CREATE_POST } from '../graphql'

export default function CreatePost() {
  const [formValue, setFormValue] = useState({})
  const history = useHistory()

  const toast = useToast()
  const [createPostMutation] = useMutation(CREATE_POST)

  const handleChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value })
  }

  const onSubmit = (e) => {
    e.preventDefault()
    createPostMutation({
      variables: {
        data: formValue
      }
    }).then(response => {
      if (response.data.createPost.success) {
        toast({
          title: response.data.createPost.message,
          status: "success",
          duration: 3000,
        })
        history.push('/')
      } else {
        toast({
          title: response.data.createPost.message,
          status: "error",
          duration: 5000,
          isClosable: true,
        })
      }
    })
  }

  return (
    <Flex width="full" align="center" justifyContent="center">
      <Box mt={12} p={8} width="80%" borderWidth={1} borderRadius={8} boxShadow="lg">
        <Box textAlign="center">
          <Heading>Create Post</Heading>
        </Box>
        <Box my={4} textAlign="left">
          <form onSubmit={onSubmit}>
            <FormControl>
              <FormLabel>Post Title</FormLabel>
              <Input required name="title" type="text" placeholder="Post Title" onChange={handleChange} />
            </FormControl>
            <FormControl mt={6}>
              <FormLabel>Post Content</FormLabel>
              <Textarea required name="content" rows={6} placeholder="Enter content here" onChange={handleChange} />
            </FormControl>
            <Button type="submit" colorScheme="teal" variant="outline" mt={4}>
              Create Post
            </Button>
          </form>
        </Box>
      </Box>
    </Flex>
  )
}

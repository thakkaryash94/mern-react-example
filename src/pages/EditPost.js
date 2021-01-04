import React, { useContext, useState } from 'react'
import { Box, Button, Flex, FormControl, FormLabel, Heading, Input, Textarea, useToast } from '@chakra-ui/react'
import { useMutation, useQuery } from '@apollo/client'
import { useHistory, useParams } from 'react-router-dom'
import { POST, UPDATE_POST } from '../graphql'
import { useCookies } from 'react-cookie'
import { AppContext } from '../components/AppContext'

export default function EditPost() {
  const { state } = useContext(AppContext)
  const [formValue, setFormValue] = useState({})
  const [cookies] = useCookies(['token'])

  const params = useParams()
  const history = useHistory()
  const { data: postData, loading } = useQuery(POST, {
    variables: {
      where: {
        id: params.id
      }
    }
  })

  const toast = useToast()
  const [updatePostMutation] = useMutation(UPDATE_POST)

  const handleChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value })
  }

  const onSubmit = (e) => {
    e.preventDefault()
    updatePostMutation({
      variables: {
        where: {
          id: postData.post.id
        },
        data: formValue
      }
    }).then(response => {
      if (response.data.updatePost.success) {
        toast({
          title: response.data.updatePost.message,
          status: "success",
          duration: 3000,
        })
        history.push(`/post/${postData.post.id}`)
      } else {
        toast({
          title: response.data.updatePost.message,
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
        {loading ? <>Loading...</> :
          <>
            {state.user && state.user.id === postData.post.author.id ?
              <><Box textAlign="center">
                <Heading>Edit Post</Heading>
              </Box>
                <Box my={4} textAlign="left">
                  <form onSubmit={onSubmit}>
                    <FormControl>
                      <FormLabel>Post Title</FormLabel>
                      <Input defaultValue={postData.post.title} required name="title" type="text" placeholder="Post Title" onChange={handleChange} />
                    </FormControl>
                    <FormControl mt={6}>
                      <FormLabel>Post Content</FormLabel>
                      <Textarea defaultValue={postData.post.content} required name="content" rows={6} placeholder="Enter content here" onChange={handleChange} />
                    </FormControl>
                    <Button colorScheme="teal" variant="outline" mt={4} onClick={() => history.push(`/post/${postData.post.id}`)}>
                      Cancel
                    </Button>
                    {'   '}
                    <Button type="submit" colorScheme="teal" variant="solid" mt={4}>
                      Update Post
                    </Button>
                  </form>
                </Box>
              </>
              :
              <Heading textAlign="center">
                Sorry, You are not authorized
              </Heading>}
          </>
        }
      </Box>
    </Flex>

  )

  return cookies.token ?
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
    :
    <Flex width="full" align="center" justifyContent="center">
      <Box mt={12} p={8} width="80%" borderWidth={1} borderRadius={8} boxShadow="lg" textAlign="center">
        <Heading>
          Sorry, You are not authorized
        </Heading>
      </Box>
    </Flex>
}

import React, { useContext } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { DELETE_POST, POST } from '../graphql'
import { useHistory, useParams } from 'react-router-dom'
import { Box, Button, Flex, Heading, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, useToast } from '@chakra-ui/react'
import { AppContext } from '../components/AppContext'
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Post() {
  const params = useParams()
  const history = useHistory()
  const { state } = useContext(AppContext)
  const { data: postData, loading } = useQuery(POST, {
    variables: {
      where: {
        id: params.id
      }
    },
    fetchPolicy: 'cache-and-network'
  })
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()

  const [deletePostMutation] = useMutation(DELETE_POST)


  return (
    <>
      <Flex width="full" align="center" justifyContent="center">
        <Box mt={12} p={8} width="80%" borderWidth={1} borderRadius={8} boxShadow="lg">
          {loading ? <>Loading...</> :
            <><Heading textAlign="center">
              {postData.post.title}
            </Heading>
              <Box mt={6}>
                {state.user && state.user.id === postData.post.author.id &&
                  <Box mb={6}>
                    <Button size="sm" variant="ghost" onClick={() => history.push(`/post/edit/${postData.post?.id}`)}><FontAwesomeIcon icon={faPen} color="teal" style={{ marginRight: '8px' }} />Edit</Button>
                    <Button size="sm" variant="ghost" onClick={onOpen}><FontAwesomeIcon icon={faTrash} color="teal" style={{ marginRight: '8px' }} />Delete</Button>
                  </Box>}
                <div>{postData.post.content}</div>
              </Box>
            </>
          }
        </Box>
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete Post</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Are you sure, you want to delete the post?
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={() => {
              deletePostMutation({
                variables: {
                  where: {
                    id: postData.post?.id
                  }
                }
              }).then(response => {
                if (response.data.deletePost.success) {
                  toast({
                    title: response.data.deletePost.message,
                    status: "success",
                    duration: 3000,
                  })
                  history.push(`/`)
                } else {
                  toast({
                    title: response.data.deletePost.message,
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                  })
                }
              })

            }}>
              Delete
            </Button>
            <Button variant="ghost">Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

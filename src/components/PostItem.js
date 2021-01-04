import React from 'react'
import { useMutation } from '@apollo/client'
import { Box, Button, ListItem } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import { LIKE_POST } from '../graphql'

export default function PostItem({ post }) {

  const [likePostMutation] = useMutation(LIKE_POST)

  const handleLikeButtonClick = (e) => {
    e.preventDefault()
    likePostMutation({
      variables: {
        where: {
          id: post.id
        }
      }
    })
  }

  return (
    <ListItem mb="4" w="80%">
      <Link to={`/post/${post.id}`}>
        <Box borderWidth="1px" borderRadius="lg" p={4}>
          <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight" isTruncated>
            {post.title}
          </Box>
          <Box>{post.content}</Box>
          <Box>
            <Button bg="transparent" size="sm" leftIcon={<FontAwesomeIcon icon={faThumbsUp} color="teal" />} onClick={handleLikeButtonClick}>
              {'    '}{post.likes} likes
        </Button>
          </Box>
          <Box>createdBy: {post.author.userName}</Box>
        </Box>
      </Link>
    </ListItem>
  )
}

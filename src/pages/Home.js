import React, { useCallback, useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import { Box, Button, List } from '@chakra-ui/react'

import { POSTS } from '../graphql'
import PostItem from '../components/PostItem'

export default function Home() {
  const [showMore, setShowMore] = useState(true)
  const [isLoading, setIsLoading] = useState(true)
  const { data: postsData, loading: postLoading, fetchMore: postFetchMore } = useQuery(POSTS, {
    variables: {
      offset: 0,
      limit: 10
    },
  })

  console.log({ postsData })

  useEffect(() => {
    if (postsData && postsData.posts.length > 0) {
      setIsLoading(false)
      if (postsData.posts.length === 10) {
        setShowMore(true)
      } else {
        setShowMore(false)
      }
    } else {
      setIsLoading(false)
      setShowMore(false)
    }
  }, [postsData])

  const handleShowMore = useCallback(() => {
    setIsLoading(true)
    postFetchMore({
      variables: {
        offset: postsData.posts.length,
        limit: 10
      }
    })
  }, [postFetchMore, postsData])



  return (
    <Box p="8">
      <List>
        {postLoading ?
          <Box p={4} color="white">
            Loading
        </Box> :
          postsData.posts.length > 0 ? postsData.posts.map(post => (
            <PostItem key={post.id} post={post} />
          )) :
            <span>No Posts found</span>
        }
        <Button
          isLoading={isLoading}
          loadingText="Show More"
          disabled={!showMore}
          colorScheme="teal"
          size="md"
          onClick={handleShowMore}>
          Show More
        </Button>
      </List>
    </Box>
  )
}

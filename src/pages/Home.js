import React, { useCallback, useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import { Box, Button, List } from '@chakra-ui/react'

import { POSTS } from '../graphql'
import PostItem from '../components/PostItem'
import { Helmet } from 'react-helmet'

export default function Home() {
  const [showMore, setShowMore] = useState(true)
  const [isLoading, setIsLoading] = useState(true)
  const { data: postsData, loading: postLoading, fetchMore: postFetchMore } = useQuery(POSTS, {
    variables: {
      offset: 0,
      limit: 10
    },
    notifyOnNetworkStatusChange: true
  })

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
    <>
      <Helmet><title>Home | Blogs</title></Helmet>
      <Box p="8">
        <List>
          {postLoading &&
            <Box p={4}>
              Loading
        </Box>}
          {postsData && postsData.posts.length > 0 && postsData.posts.map(post => (
            <PostItem key={post.id} post={post} />
          ))}
          {postsData && postsData.posts.length === 0 &&
            <span>No Posts found</span>}
          <br />
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
    </>
  )
}

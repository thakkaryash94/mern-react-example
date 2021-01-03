import React, { useContext, useEffect, useState } from "react"
import { Link, useHistory } from 'react-router-dom'
import { Box, Heading, Flex, Button } from "@chakra-ui/react"
import { useCookies } from 'react-cookie'
import { AppContext } from "./AppContext"

// Note: This code could be better, so I'd recommend you to understand how I solved and you could write yours better :)
const Header = props => {
  const [show, setShow] = useState(false)
  const history = useHistory()
  const handleToggle = () => setShow(!show)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [cookies, setCookie, removeCookie] = useCookies(['token'])
  const { state, dispatch } = useContext(AppContext)

  useEffect(() => {
    if (state.user) {
      setIsLoggedIn(true)
    } else {
      setIsLoggedIn(false)
    }
  }, [state, isLoggedIn])

  const handleLogout = () => {
    removeCookie('token')
    dispatch({ type: 'SET_USER', data: undefined })
    setTimeout(() => {
      history.push('/')
    }, 500)
  }

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1.5rem"
      bg="teal.500"
      color="white"
      {...props}
    >
      <Link to="/">
        <Flex align="center" mr={5}>
          <Heading as="h1" size="lg" letterSpacing={"-.1rem"}>
            Post Centre
        </Heading>
        </Flex>
      </Link>
      <Box display={{ md: "none" }} onClick={handleToggle}>
        <svg
          fill="white"
          width="12px"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Menu</title>
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
        </svg>
      </Box>

      <Box
        display={{ sm: show ? "block" : "none", md: "flex" }}
        width={{ sm: "full", md: "auto" }}
        alignItems="center"
        flexGrow={1}>
        <Link to='/'>
          <Button colorScheme="teal" mt={{ base: 4, md: 0 }} ml={2} display="block">
            Home
        </Button>
        </Link>
        {isLoggedIn &&
          <Link to='/post/create'>
            <Button colorScheme="teal" mt={{ base: 4, md: 0 }} mr={2} display="block">
              Create
            </Button>
          </Link>}
      </Box>

      {isLoggedIn ?
        <Box
          display={{ sm: show ? "block" : "none", md: "flex" }}
          width={{ sm: "full", md: "auto" }}
          mt={{ base: 4, md: 0 }}>
          <Button colorScheme="teal" onClick={handleLogout}>
            Log Out
          </Button>
        </Box>
        :
        <>
          <Box display={{ sm: show ? "block" : "none", md: "flex" }}
            width={{ sm: "full", md: "auto" }}>
            <Link to='/signup'>
              <Button bg="transparent" border="1px" mr={4}>
                Create account
            </Button>
            </Link>
          </Box>
          <Box display={{ sm: show ? "block" : "none", md: "flex" }}
            width={{ sm: "full", md: "auto" }}>
            <Link to='/login'>
              <Button colorScheme="teal">
                Log In
              </Button>
            </Link>
          </Box>
        </>
      }
    </Flex>
  )
}
export default Header

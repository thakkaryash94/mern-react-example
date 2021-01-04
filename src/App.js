import React from 'react'
import Header from './components/Header'
import { Switch, Route } from "react-router-dom"

import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Post from './pages/Post'
import EditPost from './pages/EditPost'
import CreatePost from './pages/CreatePost'
import Layout from './components/Layout'


function App() {
  return (
    <Layout>
      <Header />
      <Switch>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/signup">
          <Signup />
        </Route>
        <Route exact path="/post/create">
          <CreatePost />
        </Route>
        <Route exact path="/post/edit/:id">
          <EditPost />
        </Route>
        <Route path="/post/:id">
          <Post />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Layout>
  )
}

export default App

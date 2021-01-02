import { gql } from "@apollo/client"

export const SIGN_IN = gql`
mutation signIn($data: AuthInput!) {
  signIn(data: $data) {
    token
    success
    message
  }
}`

export const SIGN_UP = gql`
mutation signUp($data: AuthInput!) {
  signUp(data: $data) {
    token
    success
    message
  }
}`


export const CREATE_POST = gql`
mutation createPost($data: PostDataInput!) {
  createPost(data: $data) {
    id
    title
    content
    author {
      id
      userName
    }
    createdAt
    updatedAt
    message
    success
  }
}`

export const DELETE_POST = gql`
mutation deletePost($where: PostWhereUniqueInput!) {
  deletePost(where: $where) {
    id
    success
    message
  }
}`

export const UPDATE_POST = gql`
mutation updatePost($data: PostDataInput!, $where: PostWhereUniqueInput!) {
  updatePost(data: $data, where: $where) {
    id
    success
    message
  }
}`

export const LIKE_POST = gql`
mutation likePost($where: PostWhereUniqueInput!) {
  likePost(where: $where) {
    id
    title
    likes
    success
    message
  }
}`

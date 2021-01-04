import { gql } from "@apollo/client"

export const POSTS = gql`
query posts($offset: Int, $limit: Int ) {
  posts(offset: $offset, limit: $limit) {
    id
    title
    content
    author {
      id
      userName
    }
    likes
    createdAt
    updatedAt
  }
}`

export const POST = gql`
query post($where: PostWhereUniqueInput!) {
  post(where: $where) {
    id
    title
    content
    likes
    author {
      id
    }
  }
}`

export const CURRENT_USER = gql`
query currentUser {
  currentUser {
    id
    userName
  }
}`

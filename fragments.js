import { gql } from "apollo-boost";

export const POST_FRAGMENT = gql`
  fragment PostParts on Post {
    files {
      id
      url
    }
    location
    user {
      id
      avatar
      username
      fullName
    }
    caption
    likeCount
    comments {
      id
      user {
        id
        avatar
        username
      }
      createdAt
      text
    }
    isLiked
    createdAt
  }
`;

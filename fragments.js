import { gql } from "apollo-boost";

export const POST_FRAGMENT = gql`
  fragment PostParts on Post {
    id
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

export const USER_FRAGMENT = gql`
  fragment UserParts on User {
    id
    avatar
    username
    fullName
    isFollowing
    isSelf
    bio
    followingCount
    followersCount
    postsCount
    posts {
      ...PostParts
    }
  }
  ${POST_FRAGMENT}
`;

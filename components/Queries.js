import { gql } from "apollo-boost";
import { USER_FRAGMENT, POST_FRAGMENT } from "../fragments";

export const ME = gql`
  {
    me {
      ...UserParts
    }
  }
  ${USER_FRAGMENT}
`;

export const FEED_QUERY = gql`
  {
    seeFeed {
      ...PostParts
    }
  }
  ${POST_FRAGMENT}
`;

export const EDIT_POST = gql`
  mutation editPost(
    $id: String!
    $caption: String
    $location: String
    $action: String!
  ) {
    editPost(id: $id, caption: $caption, location: $location, action: $action) {
      id
    }
  }
`;

export const DELETE_COMMENT = gql`
  mutation deleteComment($id: String!) {
    deleteComment(id: $id) {
      id
    }
  }
`;
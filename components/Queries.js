import { gql } from "apollo-boost";
import { USER_FRAGMENT } from "../fragments";

export const ME = gql`
  {
    me {
      ...UserParts
    }
  }
  ${USER_FRAGMENT}
`;

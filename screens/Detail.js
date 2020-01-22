import React from "react";
import styled from "styled-components";
import { useQuery } from "react-apollo-hooks";
import { gql } from "apollo-boost";
import { POST_FRAGMENT } from "../fragments";
import Loader from "../components/Loader";
import Post from "../components/Post";

const FULL_POST = gql`
  query seeFullPost($id: String!) {
    seeFullPost(id: $id) {
      ...PostParts
    }
  }
  ${POST_FRAGMENT}
`;

const View = styled.View``;
const Text = styled.Text``;

export default ({ navigation }) => {
  const { loading, data } = useQuery(FULL_POST, {
    variables: {
      id: navigation.getParam("id")
    }
  });
  return (
    <View>
      {loading ? (
        <Loader />
      ) : (
        data && data.seeFullPost && <Post {...data.seeFullPost} />
      )}
    </View>
  );
};

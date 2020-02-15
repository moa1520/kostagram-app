import React, { useState } from "react";
import { ScrollView, RefreshControl, View } from "react-native";
import styled from "styled-components";
import PropTypes from "prop-types";
import { gql } from "apollo-boost";
import { useQuery } from "react-apollo-hooks";
import Loader from "../../../components/Loader";
import SquarePhoto from "../../../components/SquarePhoto";
import SquareUser from "../../../components/SquareUser";

export const SEARCH = gql`
  query search($term: String!) {
    searchPost(term: $term) {
      id
      files {
        id
        url
      }
      likeCount
      commentCount
    }
    searchUser(term: $term) {
      id
      avatar
      username
      fullName
      isFollowing
      isSelf
    }
  }
`;

const Container = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
`;
const UserSection = styled.View``;
const PostSection = styled.View``;

const SearchPresenter = ({ term, shouldFetch }) => {
  const [refreshing, setRefreshing] = useState(false);
  const { data, loading, refetch } = useQuery(SEARCH, {
    variables: {
      term
    },
    skip: !shouldFetch,
    fetchPolicy: "network-only"
  });
  const onRefresh = async () => {
    try {
      setRefreshing(true);
      await refetch({ variables: { term } });
    } catch (e) {
      console.log(e);
    } finally {
      setRefreshing(false);
    }
  };
  return (
    <ScrollView
      refreshControl={
        <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
      }
    >
      {loading ? (
        <Loader />
      ) : (
        <>
          <UserSection>
            {data &&
              data.searchUser &&
              data.searchUser.map(user => (
                <SquareUser key={user.id} {...user} />
              ))}
          </UserSection>
          <PostSection>
            {data && data.searchPost && (
              <Container>
                {data.searchPost.map(post => (
                  <SquarePhoto key={post.id} {...post} />
                ))}
              </Container>
            )}
          </PostSection>
        </>
      )}
    </ScrollView>
  );
};

SearchPresenter.propTypes = {
  term: PropTypes.string.isRequired,
  shouldFetch: PropTypes.bool.isRequired
};

export default SearchPresenter;

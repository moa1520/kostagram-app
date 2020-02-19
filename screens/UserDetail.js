import React, { useState } from "react";
import { useQuery } from "react-apollo-hooks";
import { gql } from "apollo-boost";
import { USER_FRAGMENT } from "../fragments";
import Loader from "../components/Loader";
import UserProfile from "../components/UserProfile";
import { ScrollView, RefreshControl } from "react-native";
import { ME } from "../components/Queries";

export const GET_USER = gql`
  query seeUser($username: String!) {
    seeUser(username: $username) {
      ...UserParts
    }
  }
  ${USER_FRAGMENT}
`;

export default ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);
  const { loading, data, refetch } = useQuery(GET_USER, {
    variables: {
      username: navigation.getParam("username")
    }
  });
  const { loading: meLoading, data: meData } = useQuery(ME);
  const refresh = async () => {
    try {
      setRefreshing(true);
      await refetch();
    } catch (e) {
      console.log(e);
    } finally {
      setRefreshing(false);
    }
  };
  if (loading || meLoading) {
    return (
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={refresh} />
        }
      >
        <Loader />
      </ScrollView>
    );
  } else {
    return data &&
      data.seeUser &&
      data.seeUser.username === meData.me.username ? (
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={refresh} />
        }
      >
        <UserProfile {...meData.me} notMe={false} />
      </ScrollView>
    ) : (
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={refresh} />
        }
      >
        <UserProfile {...data.seeUser} notMe={true} />
      </ScrollView>
    );
  }
};

import React, { useState } from "react";
import styled from "styled-components";
import { useQuery } from "react-apollo-hooks";
import SquarePhoto from "../../components/SquarePhoto";
import { ScrollView, RefreshControl } from "react-native";
import { EXPLORE_POST } from "../../components/Queries";
import withSuspense from "../../components/withSuspense";

const View = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
`;

const Notifications = () => {
  const {
    data: { explorePost },
    refetch
  } = useQuery(EXPLORE_POST, { suspend: true });
  const [refreshing, setRefreshing] = useState(false);
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
  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={refresh} />
      }
    >
      <View>
        {explorePost.map(post => (
          <SquarePhoto key={post.id} {...post} />
        ))}
      </View>
    </ScrollView>
  );
};

export default withSuspense(Notifications);

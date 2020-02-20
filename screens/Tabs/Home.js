import React, { useState } from "react";
import { RefreshControl, FlatList } from "react-native";
import styled from "styled-components";
import { useQuery } from "react-apollo-hooks";
import Loader from "../../components/Loader";
import Post from "../../components/Post";
import { FEED_QUERY } from "../../components/Queries";

const View = styled.View`
  justify-content: center;
  align-items: center;
  margin-top: 50%;
  flex: 1;
`;

export default () => {
  const [refreshing, setRefreshing] = useState(false);
  const [renderCount, setRenderCount] = useState(5);
  const { loading, data, refetch } = useQuery(FEED_QUERY);
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
  const onEndReached = () => {
    setRenderCount(p => p + 5);
  };
  if (loading) {
    return <Loader />;
  } else {
    if (data && data.seeFeed) {
      return (
        <FlatList
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={refresh} />
          }
          data={data.seeFeed}
          initialNumToRender={5}
          renderItem={({ item, index }) => {
            if (index < renderCount) {
              return <Post key={item.id} {...item} />;
            } else {
              return;
            }
          }}
          onEndReachedThreshold={1}
          onEndReached={onEndReached}
        />
      );
    }
  }
};

{
  /* {loading ? (
        <Loader />
      ) : (
        data &&
        data.seeFeed &&
        data.seeFeed.map(post => <Post key={post.id} {...post} />)
      )}
      {!loading && data && data.seeFeed.length === 0 && (
        <View>
          <Text>팔로우한 유저가 없습니다😂</Text>
        </View>
      )} */
}

import React from "react";
import styled from "styled-components";
import { useQuery } from "react-apollo-hooks";
import SquarePhoto from "../../components/SquarePhoto";
import { ScrollView } from "react-native";
import { EXPLORE_POST } from "../../components/Queries";

const View = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
`;

const Text = styled.Text``;

const Notifications = () => {
  const {
    data: { explorePost }
  } = useQuery(EXPLORE_POST, { suspend: true });
  return (
    <ScrollView>
      <View>
        {explorePost.map(post => (
          <SquarePhoto key={post.id} {...post} />
        ))}
      </View>
    </ScrollView>
  );
};

export default withSuspense(Notifications);

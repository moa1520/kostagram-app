import React from "react";
import styled from "styled-components";
import { ScrollView, Image, TouchableOpacity } from "react-native";
import { withNavigation } from "react-navigation";
import styles from "../styles";
import { useQuery } from "react-apollo-hooks";
import { FULL_POST } from "./Detail";
import Loader from "../components/Loader";

const Line = styled.View`
  margin: 10px;
  flex-direction: row;
`;
const Info = styled.View`
  margin-left: 10px;
  align-items: center;
  justify-content: center;
`;
const Bold = styled.Text`
  font-weight: 600;
  margin-bottom: 5px;
`;
const FullName = styled.Text`
  color: ${styles.darkGreyColor};
`;

const WhoLike = ({ navigation }) => {
  const { loading, data } = useQuery(FULL_POST, {
    variables: {
      id: navigation.getParam("id")
    }
  });
  return loading ? (
    <Loader />
  ) : (
    <ScrollView>
      {data &&
        data.seeFullPost &&
        data.seeFullPost.likes.map(like => (
          <Line key={like.id}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("UserDetail", {
                  username: like.user.username
                })
              }
            >
              <Image
                style={{ width: 50, height: 50, borderRadius: 50 }}
                source={{ uri: like.user.avatar }}
              />
            </TouchableOpacity>
            <Info>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("UserDetail", {
                    username: like.user.username
                  })
                }
              >
                <Bold>{like.user.username}</Bold>
                <FullName>{like.user.fullName}</FullName>
              </TouchableOpacity>
            </Info>
          </Line>
        ))}
    </ScrollView>
  );
};

export default withNavigation(WhoLike);

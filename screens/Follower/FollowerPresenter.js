import React from "react";
import styled from "styled-components";
import { ScrollView, Image, TouchableOpacity } from "react-native";
import styles from "../../styles";
import { withNavigation } from "react-navigation";

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

const FollowerPresenter = ({ followers, navigation }) => {
  return (
    <ScrollView>
      {followers.map(follower => (
        <Line key={follower.id}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("UserDetail", { username: follower.username })
            }
          >
            <Image
              style={{ width: 50, height: 50, borderRadius: 50 }}
              source={{ uri: follower.avatar }}
            />
          </TouchableOpacity>
          <Info>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("UserDetail", {
                  username: follower.username
                })
              }
            >
              <Bold>{follower.username}</Bold>
              <FullName>{follower.fullName}</FullName>
            </TouchableOpacity>
          </Info>
        </Line>
      ))}
    </ScrollView>
  );
};

export default withNavigation(FollowerPresenter);

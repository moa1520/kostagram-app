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

const FollowingPresenter = ({ following, navigation }) => {
  return (
    <ScrollView>
      {following.map(p => (
        <Line key={p.id}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("UserDetail", { username: p.username })
            }
          >
            <Image
              style={{ width: 50, height: 50, borderRadius: 50 }}
              source={{ uri: p.avatar }}
            />
          </TouchableOpacity>
          <Info>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("UserDetail", { username: p.username })
              }
            >
              <Bold>{p.username}</Bold>
              <FullName>{p.fullName}</FullName>
            </TouchableOpacity>
          </Info>
        </Line>
      ))}
    </ScrollView>
  );
};

export default withNavigation(FollowingPresenter);

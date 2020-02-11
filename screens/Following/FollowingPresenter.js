import React from "react";
import styled from "styled-components";
import { ScrollView, Image } from "react-native";
import styles from "../../styles";

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

const FollowingPresenter = ({ following }) => {
  return (
    <ScrollView>
      {following.map(p => (
        <Line key={p.id}>
          <Image
            style={{ width: 50, height: 50, borderRadius: 50 }}
            source={{ uri: p.avatar }}
          />
          <Info>
            <Bold>{p.username}</Bold>
            <FullName>{p.fullName}</FullName>
          </Info>
        </Line>
      ))}
    </ScrollView>
  );
};

export default FollowingPresenter;

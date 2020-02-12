import React from "react";
import styled from "styled-components";
import styles from "../../styles";

const Button = styled.TouchableOpacity`
  background-color: ${styles.darkBlueColor};
  border: 1px solid ${styles.lightGreyColor};
  width: 90%;
  height: 30px;
  margin-top: 10px;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
`;
const Text = styled.Text`
  color: white;
  font-weight: 600;
`;

export default ({ isFollowing, onPress }) => (
  <Button onPress={onPress}>
    <Text>{isFollowing ? "언팔로우" : "팔로우"}</Text>
  </Button>
);

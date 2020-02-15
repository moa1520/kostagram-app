import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Image } from "react-native";
import styles from "../styles";
import { withNavigation } from "react-navigation";

const View = styled.TouchableOpacity`
  width: 100%;
  border-bottom-color: ${styles.lightGreyColor};
  border-bottom-width: 1px;
  align-items: center;
  flex-direction: row;
  padding: 10px;
`;

const TextArea = styled.View`
  margin-left: 10px;
`;

const Text = styled.Text`
  font-weight: 600;
`;

const GreyText = styled.Text`
  margin-top: 3px;
  color: ${styles.darkGreyColor};
`;

const SquareUser = ({
  username,
  avatar,
  fullName,
  isFollowing,
  navigation
}) => {
  return (
    <View onPress={() => navigation.navigate("UserDetail", { username })}>
      <Image
        style={{ width: 50, height: 50, borderRadius: 50 }}
        source={{ uri: avatar }}
      />
      <TextArea>
        <Text>{username}</Text>
        <GreyText>
          {fullName} {isFollowing ? " • 팔로잉" : null}
        </GreyText>
      </TextArea>
    </View>
  );
};

SquareUser.propTypes = {
  username: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  fullName: PropTypes.string.isRequired,
  isFollowing: PropTypes.bool.isRequired
};

export default withNavigation(SquareUser);

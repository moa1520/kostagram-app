import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import {
  Image,
  TouchableOpacity,
  Alert,
  ActivityIndicator
} from "react-native";
import styles from "../styles";
import useInput from "../hooks/useInput";
import { gql } from "apollo-boost";
import { useMutation } from "react-apollo-hooks";
import { withNavigation } from "react-navigation";
import { GET_USER } from "../screens/UserDetail";

export const EDIT_USER = gql`
  mutation editUser(
    $username: String
    $email: String
    $firstName: String
    $lastName: String
    $bio: String
    $avatar: String
  ) {
    editUser(
      username: $username
      email: $email
      firstName: $firstName
      lastName: $lastName
      bio: $bio
      avatar: $avatar
    ) {
      id
    }
  }
`;

const View = styled.View``;

const Text = styled.Text`
  font-size: 16px;
`;

const ProfilePhoto = styled.View`
  justify-content: center;
  align-items: center;
  padding-top: 20px;
  border-bottom-width: 1px;
  border-bottom-color: ${styles.lightGreyColor};
`;

const PhotoText = styled.Text`
  color: ${styles.blueColor};
  font-weight: 600;
  font-size: 14px;
  padding: 15px 0px;
`;

const Information = styled.View`
  padding: 10px 0px;
  border-bottom-width: 1px;
  border-bottom-color: ${styles.lightGreyColor};
`;
const Line = styled.View`
  flex-direction: row;
  padding: 10px 0px;
`;
const Left = styled.View`
  flex: 1;
  justify-content: center;
  padding-left: 15px;
`;
const Right = styled.View`
  flex: 3;
  justify-content: center;
  margin-right: 30px;
`;

const TextInput = styled.TextInput`
  padding: 5px;
  font-size: 16px;
  border-bottom-width: 0.5px;
  border-bottom-color: ${styles.lightGreyColor};
`;

const Button = styled.TouchableOpacity`
  background-color: ${styles.blueColor};
  padding: 10px;
  border-radius: 4px;
  align-items: center;
  justify-content: center;
`;

const ButtonText = styled.Text`
  color: white;
  font-weight: 600;
`;

const EditUser = ({
  navigation,
  username,
  avatar,
  firstName,
  lastName,
  bio
}) => {
  const [loading, setLoading] = useState(false);
  const firstNameInput = useInput(firstName);
  const lastNameInput = useInput(lastName);
  const usernameInput = useInput(username);
  const bioInput = useInput(bio);
  const [editUserMutation] = useMutation(EDIT_USER, {
    refetchQueries: () => [
      { query: GET_USER, variables: { username: usernameInput.value } }
    ]
  });
  const handleSubmit = async () => {
    try {
      setLoading(true);
      const {
        data: { editUser }
      } = await editUserMutation({
        variables: {
          username: usernameInput.value,
          firstName: firstNameInput.value,
          lastName: lastNameInput.value,
          bio: bioInput.value
        }
      });
      if (editUser.id) {
        navigation.navigate("UserDetail", { username });
        Alert.alert("수정이 완료되었습니다");
      }
    } catch (e) {
      Alert.alert("요청을 수행할 수 없습니다", "다음에 다시 시도해주세요");
      console.log(e);
    } finally {
      setLoading(false);
    }
  };
  return (
    <View>
      <ProfilePhoto>
        <Image
          style={{ width: 100, height: 100, borderRadius: 50 }}
          source={{ uri: avatar }}
        />
        <TouchableOpacity
          onPress={() => navigation.navigate("EditProfilePhoto")}
        >
          <PhotoText>프로필 사진 바꾸기</PhotoText>
        </TouchableOpacity>
      </ProfilePhoto>
      <Information>
        <Line>
          <Left>
            <Text>이름</Text>
          </Left>
          <Right>
            <TextInput
              onChangeText={firstNameInput.onChange}
              placeholder={"이름"}
              value={firstNameInput.value}
            />
          </Right>
        </Line>
        <Line>
          <Left>
            <Text>성</Text>
          </Left>
          <Right>
            <TextInput
              onChangeText={lastNameInput.onChange}
              placeholder={"성"}
              value={lastNameInput.value}
            />
          </Right>
        </Line>
        <Line>
          <Left>
            <Text>사용자 이름</Text>
          </Left>
          <Right>
            <TextInput
              onChangeText={usernameInput.onChange}
              placeholder={"사용자 이름"}
              value={usernameInput.value}
            />
          </Right>
        </Line>
        <Line>
          <Left>
            <Text>소개</Text>
          </Left>
          <Right>
            <TextInput
              onChangeText={bioInput.onChange}
              multiline={true}
              placeholder={"소개"}
              value={bioInput.value}
            />
          </Right>
        </Line>
        <Line>
          <Left />
          <Right>
            <Button onPress={handleSubmit}>
              {loading ? (
                <ActivityIndicator color="white" />
              ) : (
                <ButtonText>완료</ButtonText>
              )}
            </Button>
          </Right>
        </Line>
      </Information>
    </View>
  );
};

EditUser.propTypes = {
  id: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  fullName: PropTypes.string.isRequired,
  isFollowing: PropTypes.bool.isRequired,
  isSelf: PropTypes.bool.isRequired,
  bio: PropTypes.string.isRequired,
  followingCount: PropTypes.number.isRequired,
  followersCount: PropTypes.number.isRequired,
  postsCount: PropTypes.number.isRequired,
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      user: PropTypes.shape({
        id: PropTypes.string.isRequired,
        avatar: PropTypes.string,
        username: PropTypes.string.isRequired
      }).isRequired,
      files: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string.isRequired,
          url: PropTypes.string.isRequired
        })
      ).isRequired,
      likeCount: PropTypes.number.isRequired,
      isLiked: PropTypes.bool.isRequired,
      comments: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string.isRequired,
          text: PropTypes.string.isRequired,
          user: PropTypes.shape({
            id: PropTypes.string.isRequired,
            username: PropTypes.string.isRequired
          }).isRequired
        })
      ).isRequired,
      caption: PropTypes.string.isRequired,
      location: PropTypes.string,
      createdAt: PropTypes.string.isRequired
    })
  )
};

export default withNavigation(EditUser);

import React, { useState } from "react";
import { Image, Platform, Alert } from "react-native";
import styled from "styled-components";
import { Ionicons } from "@expo/vector-icons";
import PropTypes from "prop-types";
import Swiper from "react-native-swiper";
import { gql } from "apollo-boost";
import constants from "../constants";
import styles from "../styles";
import { useMutation, useQuery } from "react-apollo-hooks";
import { withNavigation } from "react-navigation";
import Date from "./Date";
import Loader from "./Loader";
import { ME } from "./Queries";

const TOGGLE_LIKE = gql`
  mutation toggleLike($postId: String!) {
    toggleLike(postId: $postId)
  }
`;

const Container = styled.View``;
const Header = styled.View`
  padding: 15px;
  flex-direction: row;
  align-items: center;
`;
const Touchable = styled.TouchableOpacity``;
const HeaderUserContainer = styled.View`
  margin-left: 10px;
`;
const Bold = styled.Text`
  font-weight: 600;
`;
const Location = styled.Text`
  font-size: 12px;
`;
const IconsContainer = styled.View`
  flex-direction: row;
  margin-bottom: 5px;
`;
const IconContainer = styled.View`
  margin-right: 10px;
`;
const InfoContainer = styled.View`
  padding: 10px;
`;
const Caption = styled.Text`
  margin: 3px 0px;
`;
const GrayText = styled.Text`
  opacity: 0.5;
  font-size: 12px;
  margin-top: 5px;
`;
const Comment = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 5px;
`;
const Ionicon = styled.TouchableOpacity`
  align-items: flex-end;
`;
const HeaderView = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
`;

const Post = ({
  id,
  user,
  location,
  files = [],
  likeCount: likeCountProp,
  caption,
  comments = [],
  isLiked: isLikedProp,
  createdAt,
  navigation
}) => {
  const [isLiked, setIsLiked] = useState(isLikedProp);
  const [likeCount, setLikeCount] = useState(likeCountProp);
  const { loading, data } = useQuery(ME);
  const [toggleLikeMutation] = useMutation(TOGGLE_LIKE, {
    variables: {
      postId: id
    }
  });
  const handleLike = async () => {
    try {
      setIsLiked(p => !p);
      if (!isLiked) {
        setLikeCount(p => p + 1);
      } else {
        setLikeCount(p => p - 1);
      }
      await toggleLikeMutation();
    } catch (e) {
      console.log(e);
    }
  };
  const commentView = () => {
    navigation.navigate("Comment", { id });
  };
  const handleWhoLike = () => {
    navigation.navigate("WhoLike", { id });
  };
  return loading ? (
    <Loader />
  ) : (
    data && data.me && (
      <Container>
        <Header>
          <HeaderView>
            <Touchable
              onPress={() =>
                navigation.navigate("UserDetail", { username: user.username })
              }
            >
              <Image
                style={{ height: 40, width: 40, borderRadius: 20 }}
                source={{ uri: user.avatar }}
              />
            </Touchable>
            <Touchable
              onPress={() =>
                navigation.navigate("UserDetail", { username: user.username })
              }
            >
              <HeaderUserContainer>
                <Bold>{user.username}</Bold>
                <Location>{location}</Location>
              </HeaderUserContainer>
            </Touchable>
          </HeaderView>
          {user.id === data.me.id ? (
            <Ionicon
              onPress={() =>
                Alert.alert("아직 개발 중", "수정, 삭제 넣을 예정")
              }
            >
              <Ionicons
                name={Platform.OS === "ios" ? "ios-more" : "md-more"}
                size={25}
                color={styles.blackColor}
              />
            </Ionicon>
          ) : null}
        </Header>
        <Swiper
          showsPagination={false}
          style={{ height: constants.height / 2.2 }}
        >
          {files.map(file => (
            <Image
              style={{
                width: constants.width,
                height: constants.height / 2.2
              }}
              key={file.id}
              source={{ uri: file.url }}
            />
          ))}
        </Swiper>
        <InfoContainer>
          <IconsContainer>
            <Touchable onPress={handleLike}>
              <IconContainer>
                <Ionicons
                  size={28}
                  color={isLiked ? styles.redColor : styles.blackColor}
                  name={
                    Platform.OS === "ios"
                      ? isLiked
                        ? "ios-heart"
                        : "ios-heart-empty"
                      : isLiked
                      ? "md-heart"
                      : "md-heart-empty"
                  }
                />
              </IconContainer>
            </Touchable>
            <Touchable>
              <IconContainer>
                <Ionicons
                  size={28}
                  color={styles.blackColor}
                  name={Platform.OS === "ios" ? "ios-text" : "md-text"}
                />
              </IconContainer>
            </Touchable>
          </IconsContainer>
          <Touchable onPress={handleWhoLike}>
            <Bold>좋아요 {likeCount}개</Bold>
          </Touchable>
          <Caption>
            <Bold>{user.username}</Bold> {caption}
          </Caption>
          <Touchable onPress={commentView}>
            <GrayText>댓글 {comments.length}개 모두 보기</GrayText>
          </Touchable>
          <Comment>
            {comments.length > 0 ? (
              <>
                <Bold>{comments[comments.length - 1].user.username}</Bold>
                <Caption> {comments[comments.length - 1].text}</Caption>
              </>
            ) : null}
          </Comment>
          <GrayText>{Date(createdAt)}</GrayText>
        </InfoContainer>
      </Container>
    )
  );
};

Post.propTypes = {
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
  createdAt: PropTypes.string.isRequired,
  caption: PropTypes.string.isRequired,
  location: PropTypes.string
};

export default withNavigation(Post);

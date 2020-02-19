import React, { useState } from "react";
import { Image, View, TouchableOpacity, Platform, Modal } from "react-native";
import PropTypes from "prop-types";
import styled from "styled-components";
import styles from "../styles";
import { Ionicons } from "@expo/vector-icons";
import constants from "../constants";
import SquarePhoto from "./SquarePhoto";
import Post from "./Post";
import { withNavigation } from "react-navigation";
import FollowButton from "./FollowButton";

const ProfileHeader = styled.View`
  padding: 20px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const HeaderColumn = styled.View``;
const ProfileStats = styled.View`
  flex-direction: row;
  margin-right: 40px;
`;
const Stat = styled.TouchableOpacity`
  align-items: center;
  margin-left: 30px;
`;
const Bold = styled.Text`
  font-weight: 600;
`;
const StatName = styled.Text`
  margin-top: 5px;
  font-size: 12px;
  color: ${styles.darkGreyColor};
`;
const ProfileMeta = styled.View`
  margin-top: 10px;
  padding-horizontal: 20px;
`;
const Bio = styled.Text``;
const ButtonContainer = styled.View`
  padding-vertical: 5px;
  border: 1px solid ${styles.lightGreyColor};
  flex-direction: row;
  margin-top: 30px;
`;
const Button = styled.View`
  width: ${constants.width / 2};
  align-items: center;
`;
const Posts = styled.View`
  flex-direction: ${props => (props.isGrid ? "row" : "column")};
  flex-wrap: wrap;
`;

const UserProfile = ({
  id,
  avatar,
  postsCount,
  followersCount,
  followingCount,
  isFollowing,
  bio,
  fullName,
  posts,
  username,
  navigation,
  notMe = false
}) => {
  const [notMeState, setNotMe] = useState(notMe);
  const [isGrid, setIsGrid] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const handleFollow = () => {
    navigation.navigate("Tabs", { username });
  };
  const handleEditProfile = () => {
    if (notMeState) {
      setModalVisible(p => !p);
    } else {
      navigation.navigate("EditProfile", { username });
    }
  };

  return (
    <View>
      <Modal animationType="fade" visible={modalVisible}>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Image
            style={{ width: constants.width, height: constants.height / 2 }}
            source={{ uri: avatar }}
          />
          <TouchableOpacity
            style={{ marginTop: 100 }}
            onPress={() => setModalVisible(p => !p)}
          >
            <Ionicons
              size={48}
              name={Platform.OS === "ios" ? "ios-close" : "md-close"}
            />
          </TouchableOpacity>
        </View>
      </Modal>
      <ProfileHeader>
        <HeaderColumn>
          <TouchableOpacity onPress={handleEditProfile}>
            <Image
              style={{ height: 80, width: 80, borderRadius: 40 }}
              source={{ uri: avatar }}
            />
          </TouchableOpacity>
        </HeaderColumn>
        <HeaderColumn>
          <ProfileStats>
            <Stat>
              <Bold>{postsCount}</Bold>
              <StatName>게시물</StatName>
            </Stat>
            <Stat onPress={handleFollow}>
              <Bold>{followersCount}</Bold>
              <StatName>팔로워</StatName>
            </Stat>
            <Stat onPress={handleFollow}>
              <Bold>{followingCount}</Bold>
              <StatName>팔로잉</StatName>
            </Stat>
          </ProfileStats>
          {notMe ? <FollowButton id={id} isFollowing={isFollowing} /> : null}
        </HeaderColumn>
      </ProfileHeader>
      <ProfileMeta>
        <Bold>{fullName}</Bold>
        <Bio>{bio}</Bio>
      </ProfileMeta>
      <ButtonContainer>
        <TouchableOpacity onPress={() => setIsGrid(true)}>
          <Button>
            <Ionicons
              color={isGrid ? styles.blackColor : styles.lightGreyColor}
              size={32}
              name={Platform.OS === "ios" ? "ios-grid" : "md-grid"}
            />
          </Button>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setIsGrid(false)}>
          <Button>
            <Ionicons
              color={!isGrid ? styles.blackColor : styles.lightGreyColor}
              size={32}
              name={Platform.OS === "ios" ? "ios-list" : "md-list"}
            />
          </Button>
        </TouchableOpacity>
      </ButtonContainer>
      <Posts isGrid={isGrid}>
        {posts &&
          posts.map(p =>
            isGrid ? (
              <SquarePhoto key={p.id} {...p} />
            ) : (
              <Post key={p.id} {...p} />
            )
          )}
      </Posts>
    </View>
  );
};

UserProfile.propTypes = {
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

export default withNavigation(UserProfile);

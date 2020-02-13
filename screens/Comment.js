import React, { useState } from "react";
import styled from "styled-components";
import { useQuery, useMutation } from "react-apollo-hooks";
import { FULL_POST } from "./Detail";
import {
  ScrollView,
  Image,
  Alert,
  ActivityIndicator,
  TouchableOpacity
} from "react-native";
import Loader from "../components/Loader";
import styles from "../styles";
import constants from "../constants";
import { gql } from "apollo-boost";
import useInput from "../hooks/useInput";
import { ME } from "./Tabs/Profile";
import Date from "../components/Date";

const ADD_COMMENT = gql`
  mutation addComment($postId: String!, $text: String!) {
    addComment(postId: $postId, text: $text) {
      id
      text
      user {
        username
        avatar
      }
    }
  }
`;

const View = styled.View`
  padding: 15px 10px;
`;
const Header = styled.View`
  flex: 1;
  flex-direction: row;
  border-bottom-width: 1px;
  border-bottom-color: ${styles.lightGreyColor};
  padding-bottom: 15px;
`;
const Text = styled.Text``;

const Bold = styled.Text`
  font-weight: 600;
  margin: 0px 5px;
`;
const Comments = styled.View`
  margin-top: 15px;
`;
const Line = styled.View`
  margin-bottom: 15px;
  flex-direction: row;
`;
const AddComment = styled.View`
  padding: 15px;
  flex-direction: row;
  border-bottom-width: 1px;
  border-bottom-color: ${styles.lightGreyColor};
  justify-content: center;
  align-items: center;
`;
const TextInput = styled.TextInput`
  margin-left: 10px;
  border: 1px solid ${styles.lightGreyColor};
  border-radius: 25px;
  padding: 10px;
  width: ${constants.width / 1.8};
`;
const Button = styled.TouchableOpacity`
  background-color: ${styles.blueColor};
  width: 60px;
  height: 30px;
  border-radius: 30px;
  align-items: center;
  justify-content: center;
  margin-left: 10px;
`;
const ButtonText = styled.Text`
  color: white;
  font-weight: 600;
  font-size: 16px;
`;
const Top = styled.View``;
const TextArea = styled.View`
  width: ${constants.width / 1.5};
`;
const CommnetTextLine = styled.View``;
const CommentFirstLine = styled.View`
  flex-direction: row;
`;
const CommentSecondLine = styled.View`
  margin-left: 5px;
`;
const GrayText = styled.Text`
  color: ${styles.darkGreyColor};
  font-size: 12px;
`;

export default ({ navigation }) => {
  const commentInput = useInput("");
  const [commentLoading, setCommentLoading] = useState(false);
  const { loading, data, refetch } = useQuery(FULL_POST, {
    variables: {
      id: navigation.getParam("id")
    }
  });
  const { loading: meLoading, data: meData } = useQuery(ME);
  const [addCommentMutation] = useMutation(ADD_COMMENT);
  const handleSubmit = async () => {
    try {
      setCommentLoading(true);
      const {
        data: { addComment }
      } = await addCommentMutation({
        variables: {
          postId: navigation.getParam("id"),
          text: commentInput.value
        }
      });
      if (addComment.id) {
        await refetch();
        commentInput.setValue("");
      }
    } catch (e) {
      Alert.alert("요청을 수행할 수 없습니다", "다음에 다시 시도하세요");
      console.log(e);
    } finally {
      setCommentLoading(false);
    }
  };
  const handleProfile = username => {
    navigation.navigate("UserDetail", { username });
  };
  return (
    <>
      {loading || meLoading ? (
        <Loader />
      ) : (
        <>
          <Top>
            <AddComment>
              <Image
                style={{ width: 50, height: 50, borderRadius: 50 }}
                source={{ uri: meData.me.avatar }}
              />
              <TextInput
                value={commentInput.value}
                onChangeText={commentInput.onChange}
                placeholder={"댓글 달기..."}
                placeholderTextColor={styles.darkGreyColor}
              />
              <Button onPress={handleSubmit}>
                {commentLoading ? (
                  <ActivityIndicator color="white" />
                ) : (
                  <ButtonText>입력</ButtonText>
                )}
              </Button>
            </AddComment>
          </Top>
          <ScrollView>
            <View>
              <Header>
                <Image
                  style={{ width: 40, height: 40, borderRadius: 50 }}
                  source={{ uri: data.seeFullPost.user.avatar }}
                />
                <Bold>{data.seeFullPost.user.username}</Bold>
                <TextArea>
                  <Text>{data.seeFullPost.caption}</Text>
                </TextArea>
              </Header>
              <Comments>
                {data.seeFullPost.comments.map(comment => (
                  <Line key={comment.id}>
                    <TouchableOpacity
                      onPress={() => handleProfile(comment.user.username)}
                    >
                      <Image
                        style={{ width: 40, height: 40, borderRadius: 50 }}
                        source={{ uri: comment.user.avatar }}
                      />
                    </TouchableOpacity>
                    <CommnetTextLine>
                      <CommentFirstLine>
                        <TouchableOpacity
                          onPress={() => handleProfile(comment.user.username)}
                        >
                          <Bold>{comment.user.username}</Bold>
                        </TouchableOpacity>
                        <TextArea>
                          <Text>{comment.text}</Text>
                        </TextArea>
                      </CommentFirstLine>
                      <CommentSecondLine>
                        <GrayText>{Date(comment.createdAt)}</GrayText>
                      </CommentSecondLine>
                    </CommnetTextLine>
                  </Line>
                ))}
              </Comments>
            </View>
          </ScrollView>
        </>
      )}
    </>
  );
};

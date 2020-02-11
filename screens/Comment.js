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
  width: 80px;
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

export default ({ navigation }) => {
  const commentInput = useInput("");
  const [commentLoading, setCommentLoading] = useState(false);
  const { loading, data, refetch } = useQuery(FULL_POST, {
    variables: {
      id: navigation.getParam("id")
    }
  });
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
      {loading ? (
        <Loader />
      ) : (
        <>
          <Top>
            <AddComment>
              <Image
                style={{ width: 50, height: 50, borderRadius: 50 }}
                source={{ uri: data.seeFullPost.user.avatar }}
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
                <Text>{data.seeFullPost.caption}</Text>
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
                    <TouchableOpacity
                      onPress={() => handleProfile(comment.user.username)}
                    >
                      <Bold>{comment.user.username}</Bold>
                    </TouchableOpacity>
                    <Text>{comment.text}</Text>
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

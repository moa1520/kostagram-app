import React from "react";
import styled from "styled-components";
import { useQuery } from "react-apollo-hooks";
import { FULL_POST } from "./Detail";
import { ScrollView, Image } from "react-native";
import Loader from "../components/Loader";
import styles from "../styles";
import constants from "../constants";

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
  border-top-width: 1px;
  border-top-color: ${styles.lightGreyColor};
`;
const TextInput = styled.TextInput`
  margin-left: 10px;
  border: 1px solid ${styles.lightGreyColor};
  border-radius: 25px;
  padding: 10px;
  width: ${constants.width / 1.3};
`;

export default ({ navigation }) => {
  const { loading, data } = useQuery(FULL_POST, {
    variables: {
      id: navigation.getParam("id")
    }
  });
  return (
    <>
      <ScrollView>
        {loading ? (
          <Loader />
        ) : (
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
                  <Image
                    style={{ width: 40, height: 40, borderRadius: 50 }}
                    source={{ uri: comment.user.avatar }}
                  />
                  <Bold>{comment.user.username}</Bold>
                  <Text>{comment.text}</Text>
                </Line>
              ))}
            </Comments>
          </View>
        )}
      </ScrollView>
      <AddComment>
        <Image
          style={{ width: 50, height: 50, borderRadius: 50 }}
          source={{ uri: data.seeFullPost.user.avatar }}
        />
        <TextInput placeholder={"댓글 달기..."} />
      </AddComment>
    </>
  );
};

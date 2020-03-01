import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Image
} from "react-native";
import { useQuery, useMutation, useSubscription } from "react-apollo-hooks";
import {
  SEE_ROOM,
  SEND_MESSAGE,
  NEW_MESSAGE,
  ME
} from "../../components/Queries";
import withSuspense from "../../components/withSuspense";
import styles from "../../styles";
import { withNavigation } from "react-navigation";

const Chat = styled.View`
  margin-bottom: 10px;
  background-color: ${props =>
    props.isMe === props.me.id ? "#f9ca24" : styles.lightGreyColor};
  border-radius: 10px;
  padding: 10px;
`;

const ChatText = styled.Text``;

const ChatContainer = styled.View`
  width: 100%;
  justify-content: ${props =>
    props.isMe === props.me.id ? "flex-end" : "flex-start"};
  padding: 0px 15px;
  flex-direction: row;
`;

const Message = ({ navigation }) => {
  const ROOM_ID = "ck78l3xw700710780z61hl1vj";
  const [message, setMessage] = useState("");
  const {
    data: { me }
  } = useQuery(ME, { suspend: true });
  const { data: old, error } = useQuery(SEE_ROOM, {
    variables: { id: ROOM_ID },
    suspend: true
  });
  const {
    seeRoom: { messages: oldMessages }
  } = old;
  const { data } = useSubscription(NEW_MESSAGE, {
    variables: { roomId: ROOM_ID }
  });
  const [messages, setMessages] = useState(oldMessages || []);
  const [sendMessageMutation] = useMutation(SEND_MESSAGE, {
    variables: {
      roomId: ROOM_ID,
      message,
      toId: "ck65de6mi000s0795v5vz5ibp"
    },
    refetchQueries: () => [{ query: SEE_ROOM, variables: { id: ROOM_ID } }]
  });
  const onChangeText = text => setMessage(text);
  const onSubmit = async () => {
    if (message === "") {
      return;
    }
    try {
      await sendMessageMutation();
      setMessage("");
    } catch (e) {
      console.log(e);
    }
  };
  const handleNewMessage = () => {
    if (data !== undefined) {
      const { newMessage } = data;
      setMessages(previous => [...previous, newMessage]);
    }
  };
  useEffect(() => {
    handleNewMessage();
  }, [data]);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      enabled
      behavior="padding"
      keyboardVerticalOffset={70}
    >
      <ScrollView
        contentContainerStyle={{
          paddingVertical: 50,
          justifyContent: "flex-end",
          alignItems: "center"
        }}
      >
        {messages.map(m => (
          <ChatContainer key={m.id} isMe={m.from.id} me={me}>
            {m.from.id !== me.id ? (
              <Image
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 50,
                  marginRight: 10
                }}
                source={{ uri: m.from.avatar }}
              />
            ) : null}
            <Chat isMe={m.from.id} me={me}>
              <ChatText>{m.text}</ChatText>
            </Chat>
          </ChatContainer>
        ))}
      </ScrollView>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          marginTop: 10,
          marginBottom: 30
        }}
      >
        <TextInput
          placeholder="메시지 보내기..."
          style={{
            width: "90%",
            borderRadius: 10,
            paddingVertical: 15,
            paddingHorizontal: 10,
            backgroundColor: styles.lightGreyColor
          }}
          returnKeyType="send"
          value={message}
          onChangeText={onChangeText}
          onSubmitEditing={onSubmit}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

export default withSuspense(withNavigation(Message));

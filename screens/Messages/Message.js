import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  KeyboardAvoidingView
} from "react-native";
import { useQuery, useMutation, useSubscription } from "react-apollo-hooks";
import { SEE_ROOM, SEND_MESSAGE, NEW_MESSAGE } from "../../components/Queries";
import withSuspense from "../../components/withSuspense";
import styles from "../../styles";

const ROOM_ID = "ck78l3xw700710780z61hl1vj";

const Message = () => {
  const [message, setMessage] = useState("");
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
      toId: "ck6dy7yiw000r0783ybee8ipm"
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
      keyboardVerticalOffset={50}
    >
      <ScrollView
        contentContainerStyle={{
          paddingVertical: 50,
          flex: 1,
          justifyContent: "flex-end",
          alignItems: "center"
        }}
      >
        {messages.map(m => (
          <View key={m.id} style={{ marginBottom: 10 }}>
            <Text>{m.text}</Text>
          </View>
        ))}
        <TextInput
          placeholder="메시지 보내기..."
          style={{
            marginTop: 50,
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
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default withSuspense(Message);

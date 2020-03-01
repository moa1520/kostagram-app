import React from "react";
import styled from "styled-components";
import { View, Text, ScrollView, TextInput } from "react-native";
import { useQuery } from "react-apollo-hooks";
import { SEE_ROOM } from "../../components/Queries";
import withSuspense from "../../components/withSuspense";

const Message = () => {
  const { data, error } = useQuery(SEE_ROOM, {
    variables: { id: "ck78l3xw700710780z61hl1vj" },
    suspend: true
  });
  console.log(data);
  return (
    <ScrollView
      contentContainerStyle={{
        paddingVertical: 50,
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center"
      }}
    >
      <Text>Hello</Text>
    </ScrollView>
  );
};

export default withSuspense(Message);

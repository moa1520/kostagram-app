import React from "react";
import { Text } from "react-native";
import { useIsLoggedIn } from "../AuthContext";

export default () => {
  const isLoggedIn = useIsLoggedIn();
  return <Text>NavController</Text>;
};

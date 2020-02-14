import React from "react";
import { View, StatusBar } from "react-native";
import { useIsLoggedIn } from "../AuthContext";
import AuthNavigation from "../navigation/AuthNavigation";
import MainNavigation from "../navigation/MainNavigation";

export default () => {
  const isLoggedIn = useIsLoggedIn();

  return (
    <View style={{ flex: "1" }}>
      <StatusBar barStyle="dark-content" />
      {isLoggedIn ? <MainNavigation /> : <AuthNavigation />}
    </View>
  );
};

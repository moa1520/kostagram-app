import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import Message from "../screens/Messages/Message";
import { stackStyles } from "./config";
import styles from "../styles";

export default createStackNavigator(
  {
    Message
  },
  {
    defaultNavigationOptions: {
      headerStyle: { ...stackStyles },
      headerTitle: "Direct",
      headerTintColor: styles.blackColor,
      headerBackTitle: null
    }
  }
);

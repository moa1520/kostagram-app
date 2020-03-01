import { createStackNavigator } from "react-navigation-stack";
import Messages from "../screens/Messages/Messages";
import Message from "../screens/Messages/Message";
import { stackStyles } from "./config";
import styles from "../styles";

export default createStackNavigator(
  {
    Messages,
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

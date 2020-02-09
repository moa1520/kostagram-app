import { createMaterialTopTabNavigator } from "react-navigation-tabs";
import Follower from "../screens/Follower/FollowerContainer";
import Following from "../screens/Following/FollowingContainer";
import styles from "../styles";
import { stackStyles } from "./config";

export default createMaterialTopTabNavigator(
  {
    Follower: {
      screen: Follower,
      navigationOptions: {
        tabBarLabel: "팔로워"
      }
    },
    Following: {
      screen: Following,
      navigationOptions: {
        tabBarLabel: "팔로잉"
      }
    }
  },
  {
    tabBarOptions: {
      indicatorStyle: {
        backgroundColor: styles.blackColor
      },
      labelStyle: {
        color: styles.blackColor,
        fontWeight: "600"
      },
      style: {
        ...stackStyles
      }
    }
  }
);

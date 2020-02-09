import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import TabNavigation from "./TabNavigation";
import PhotoNavigation from "./PhotoNavigation";
import MessageNavigation from "./MessageNavigation";
import FollowNavigation from "./FollowNavigation";
import { stackStyles } from "./config";

const MainNavigation = createStackNavigator(
  {
    TabNavigation,
    FollowNavigation,
    PhotoNavigation,
    MessageNavigation
  },
  {
    headerMode: "none",
    defaultNavigationOptions: {
      headerStyle: { ...stackStyles }
    },
    mode: "modal"
  }
);

export default createAppContainer(MainNavigation);

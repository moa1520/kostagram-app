import React from "react";
import { View, Image, Platform } from "react-native";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createStackNavigator } from "react-navigation-stack";
import Home from "../screens/Tabs/Home";
import Search from "../screens/Tabs/Search";
import Notifications from "../screens/Tabs/Notifications";
import Profile from "../screens/Tabs/Profile";
import MessagesLink from "../components/MessagesLink";
import NavIcon from "../components/NavIcon";

const stackFactory = (initialRoute, customConfig) =>
  createStackNavigator({
    InitialRoute: {
      screen: initialRoute,
      navigationOptions: { ...customConfig }
    }
  });

export default createBottomTabNavigator(
  {
    Home: {
      screen: stackFactory(Home, {
        headerRight: <MessagesLink />,
        headerTitle: (
          <Image
            style={{ height: 40 }}
            resizeMode="contain"
            source={require("../assets/logo.png")}
          />
        )
      }),
      navigationOptions: {
        tabBarIcon: (
          <NavIcon name={Platform.OS === "ios" ? "ios-home" : "md-home"} />
        )
      }
    },
    Search: {
      screen: stackFactory(Search, {
        headerTitle: (
          <Image
            style={{ height: 40 }}
            resizeMode="contain"
            source={require("../assets/logo.png")}
          />
        )
      }),
      navigationOptions: {
        tabBarIcon: (
          <NavIcon name={Platform.OS === "ios" ? "ios-search" : "md-search"} />
        )
      }
    },
    Add: {
      screen: View,
      navigationOptions: {
        tabBarOnPress: ({ navigation }) =>
          navigation.navigate("PhotoNavigation"),
        tabBarIcon: (
          <NavIcon name={Platform.OS === "ios" ? "ios-add" : "md-add"} />
        )
      }
    },
    Notifications: {
      screen: stackFactory(Notifications, {
        headerTitle: (
          <Image
            style={{ height: 40 }}
            resizeMode="contain"
            source={require("../assets/logo.png")}
          />
        )
      }),
      navigationOptions: {
        tabBarIcon: (
          <NavIcon
            name={Platform.OS === "ios" ? "ios-heart-empty" : "md-heart-empty"}
          />
        )
      }
    },
    Profile: {
      screen: stackFactory(Profile, {
        headerTitle: (
          <Image
            style={{ height: 40 }}
            resizeMode="contain"
            source={require("../assets/logo.png")}
          />
        )
      }),
      navigationOptions: {
        tabBarIcon: (
          <NavIcon name={Platform.OS === "ios" ? "ios-person" : "md-person"} />
        )
      }
    }
  },
  {
    tabBarOptions: {
      showLabel: false
    }
  }
);

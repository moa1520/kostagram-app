import React from "react";
import styled from "styled-components";
import { withNavigation } from "react-navigation";
import { TouchableOpacity, Image, Platform, View } from "react-native";
import PropTypes from "prop-types";
import constants from "../constants";
import { Ionicons } from "@expo/vector-icons";

const SquarePhoto = ({ navigation, files = [], id }) => (
  <TouchableOpacity onPress={() => navigation.navigate("Detail", { id })}>
    <Image
      style={{ width: constants.width / 3, height: constants.height / 6 }}
      source={{ uri: files[0].url }}
    />
    {files.length > 1 ? (
      <View style={{ position: "absolute", top: 5, right: 5 }}>
        <Ionicons
          size={20}
          color={"white"}
          name={Platform.OS === "ios" ? "ios-photos" : "md-photos"}
        />
      </View>
    ) : null}
  </TouchableOpacity>
);

SquarePhoto.propTypes = {
  files: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired
    })
  ).isRequired,
  id: PropTypes.string.isRequired
};

export default withNavigation(SquarePhoto);

import React from "react";
import styled from "styled-components";
import { withNavigation } from "react-navigation";
import { TouchableOpacity, Image } from "react-native";
import PropTypes from "prop-types";
import constants from "../constants";

const Container = styled.View`
  flex-direction: row;
`;

const SquarePhoto = ({ navigation, files = [], id }) => (
  <Container>
    <TouchableOpacity onPress={() => navigation.navigate("Detail", { id })}>
      <Image
        style={{ width: constants.width / 3, height: constants.height / 6 }}
        source={{ uri: files[0].url }}
      />
    </TouchableOpacity>
  </Container>
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
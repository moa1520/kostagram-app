import React from "react";
import PropTypes from "prop-types";
import { TextInput } from "react-native";

const SearchBar = ({ onChange, value, onSubmit }) => (
  <TextInput value={value} placeholder={"검색"} />
);

SearchBar.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default SearchBar;

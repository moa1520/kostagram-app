import React from "react";
import styled from "styled-components";
import FollowingPresenter from "./FollowingPresenter";
import Loader from "../../components/Loader";
import { useQuery } from "react-apollo-hooks";
import { GET_USER } from "../UserDetail";

export default ({ navigation }) => {
  const { loading, data } = useQuery(GET_USER, {
    variables: {
      username: navigation.getParam("username")
    }
  });

  return loading ? <Loader /> : <FollowingPresenter {...data.seeUser} />;
};

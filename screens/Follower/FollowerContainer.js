import React from "react";
import { gql } from "apollo-boost";
import { useQuery } from "react-apollo-hooks";
import Loader from "../../components/Loader";
import FollowerPresenter from "./FollowerPresenter";
import { GET_USER } from "../UserDetail";

export default ({ navigation }) => {
  const { loading, data } = useQuery(GET_USER, {
    variables: {
      username: navigation.getParam("username")
    }
  });

  return loading ? <Loader /> : <FollowerPresenter {...data.seeUser} />;
};

import React from "react";
import { useQuery } from "react-apollo-hooks";
import Loader from "../../components/Loader";
import EditUser from "../../components/EditUser";
import { GET_USER } from "../UserDetail";
import { ScrollView } from "react-native";

export default ({ navigation }) => {
  const { loading, data } = useQuery(GET_USER, {
    variables: {
      username: navigation.getParam("username")
    }
  });

  return (
    <ScrollView>
      {loading ? (
        <Loader />
      ) : (
        data && data.seeUser && <EditUser {...data.seeUser} />
      )}
    </ScrollView>
  );
};

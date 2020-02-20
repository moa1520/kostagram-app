import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { Alert, ActivityIndicator } from "react-native";
import { gql } from "apollo-boost";
import styles from "../../styles";
import constants from "../../constants";
import useInput from "../../hooks/useInput";
import { useMutation } from "react-apollo-hooks";
import { FEED_QUERY } from "../../components/Queries";

const UPLOAD = gql`
  mutation upload($caption: String!, $files: [String!]!, $location: String) {
    upload(caption: $caption, files: $files, location: $location) {
      id
      caption
      location
    }
  }
`;

const View = styled.View`
  flex: 1;
  align-items: center;
`;

const Container = styled.View`
  padding: 20px;
  flex-direction: row;
`;

const Form = styled.View`
  justify-content: flex-start;
`;

const Image = styled.Image`
  height: ${constants.width / 2};
  width: ${constants.width / 2};
  border-radius: 5px;
`;

const STextInput = styled.TextInput`
  margin-bottom: 10px;
  border: 0px solid ${styles.lightGreyColor};
  border-bottom-width: 1px;
  padding-bottom: 10px;
  width: ${constants.width * 0.8};
`;

const Button = styled.TouchableOpacity`
  background-color: ${props => props.theme.blueColor};
  padding: 10px;
  border-radius: 4px;
  align-items: center;
  justify-content: center;
`;

const Text = styled.Text`
  color: white;
  font-weight: 600;
`;

export default ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const photo = navigation.getParam("photo");
  const isMulti = navigation.getParam("isMulti");
  const captionInput = useInput("");
  const locationInput = useInput("");
  const [uploadMutation] = useMutation(UPLOAD, {
    refetchQueries: () => [{ query: FEED_QUERY }]
  });
  const handleSubmit = async () => {
    if (captionInput.value === "" || locationInput.value === "") {
      Alert.alert("모두 입력을 해주세요.");
    }
    const formData = new FormData();
    if (isMulti) {
      photo.map(p => {
        const name = p.filename;
        const [, type] = name.split(".");
        formData.append("file", {
          name,
          type: type.toLowerCase(),
          uri: p.uri
        });
      });
    } else {
      const name = photo.filename;
      const [, type] = name.split(".");
      formData.append("file", {
        name,
        type: type.toLowerCase(),
        uri: photo.uri
      });
    }

    try {
      setLoading(true);
      const {
        data: { location }
      } = await axios.post(
        isMulti
          ? // ? "http://localhost:4000/api/uploads"
            // : "http://localhost:4000/api/upload",
            "https://kostagram-backend.herokuapp.com/api/uploads"
          : "https://kostagram-backend.herokuapp.com/api/upload",
        formData,
        {
          headers: {
            "content-type": "multipart/form-data"
          }
        }
      );
      const {
        data: { upload }
      } = await uploadMutation({
        variables: {
          files: location,
          caption: captionInput.value,
          location: locationInput.value
        }
      });
      if (upload.id) {
        navigation.navigate("TabNavigation");
      }
    } catch (e) {
      Alert.alert("업로드를 할 수 없습니다", "다음에 다시 시도해주세요");
      console.log(e);
    } finally {
      setLoading(false);
    }
  };
  return (
    <View>
      <Container>
        <Image
          source={{
            uri: isMulti ? photo[0].uri : photo.uri
          }}
        />
      </Container>
      <Container>
        <Form>
          <STextInput
            onChangeText={captionInput.onChange}
            value={captionInput.value}
            multiline={true}
            placeholder="문구 입력..."
            placeholderTextColor={styles.darkGreyColor}
          />
          <STextInput
            onChangeText={locationInput.onChange}
            value={locationInput.value}
            multiline={true}
            placeholder="위치"
            placeholderTextColor={styles.darkGreyColor}
          />
          <Button onPress={handleSubmit}>
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text>업로드</Text>
            )}
          </Button>
        </Form>
      </Container>
    </View>
  );
};

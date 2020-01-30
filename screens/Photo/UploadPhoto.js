import React, { useState } from "react";
import styled from "styled-components";
import { Alert, ActivityIndicator } from "react-native";
import styles from "../../styles";
import constants from "../../constants";
import useInput from "../../hooks/useInput";

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
  const [fileUrl, setFileUrl] = useState("");
  const captionInput = useInput("");
  const locationInput = useInput("");
  const handleSubmit = async () => {
    if (captionInput.value === "" || locationInput.value === "") {
      Alert.alert("모두 입력을 해주세요.");
    }
  };
  return (
    <View>
      <Container>
        <Image source={{ uri: navigation.getParam("photo").uri }} />
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

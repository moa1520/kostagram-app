import React, { useState } from "react";
import { TouchableWithoutFeedback, Keyboard } from "react-native";
import styled from "styled-components";
import * as Facebook from "expo-facebook";
import * as Google from "expo-google-app-auth";
import AuthButton from "../../components/AuthButton";
import AuthInput from "../../components/AuthInput";
import useInput from "../../hooks/useInput";
import { Alert } from "react-native";
import { useMutation } from "react-apollo-hooks";
import { CREATE_ACCOUNT } from "./AuthQueries";

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const FBContainer = styled.View`
  margin-top: 25px;
  padding-top: 25px;
  border-top-width: 1px;
  border-color: ${props => props.theme.lightGreyColor};
  border-style: solid;
`;

export default ({ navigation }) => {
  const fNameInput = useInput("");
  const lNameInput = useInput("");
  const usernameInput = useInput("");
  const emailInput = useInput(navigation.getParam("email", ""));
  const [loading, setLoading] = useState(false);
  const [createAccountMutation] = useMutation(CREATE_ACCOUNT, {
    variables: {
      username: usernameInput.value,
      email: emailInput.value,
      firstName: fNameInput.value,
      lastName: lNameInput.value
    }
  });
  const handleSignup = async () => {
    const { value: email } = emailInput;
    const { value: fName } = fNameInput;
    const { value: lName } = lNameInput;
    const { value: username } = usernameInput;
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailRegex.test(email)) {
      return Alert.alert("이메일 형식이 올바르지 않습니다");
    }
    if (fName === "") {
      return Alert.alert("이름을 입력하세요");
    }
    if (username === "") {
      return Alert.alert("사용자 이름을 입력하세요");
    }
    try {
      setLoading(true);
      const {
        data: { createAccount }
      } = await createAccountMutation();
      if (createAccount) {
        Alert.alert("계정이 생성되었습니다", "로그인 하세요");
        navigation.navigate("Login", { email });
      }
    } catch (e) {
      console.log(e);
      Alert.alert("이미 존재하는 사용자 이름입니다", "로그인을 해주세요");
      navigation.navigate("Login", { email });
    } finally {
      setLoading(false);
    }
  };
  const fbLogin = async () => {
    try {
      setLoading(true);
      await Facebook.initializeAsync("2581951582039309");
      const { type, token } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ["public_profile", "email"]
      });
      if (type === "success") {
        // Get the user's name using Facebook's Graph API
        const response = await fetch(
          `https://graph.facebook.com/me?access_token=${token}&fields=id,last_name,first_name,email`
        );
        const { email, first_name, last_name } = await response.json();
        updateFormData(email, first_name, last_name);
        setLoading(false);
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  };
  const googleLogin = async () => {
    const GOOGLE_ID =
      "833953929743-4uabolefg96qkhhokvgjg133atdp1ptp.apps.googleusercontent.com";
    try {
      setLoading(true);
      const result = await Google.logInAsync({
        iosClientId: GOOGLE_ID,
        scopes: ["profile", "email"]
      });

      if (result.type === "success") {
        const user = await fetch("https://www.googleapis.com/userinfo/v2/me", {
          headers: { Authorization: `Bearer ${result.accessToken}` }
        });
        const { email, family_name, given_name } = await user.json();
        updateFormData(email, given_name, family_name);
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };
  const updateFormData = (email, firstName, lastName) => {
    fNameInput.setValue(firstName);
    lNameInput.setValue(lastName);
    emailInput.setValue(email);
    usernameInput.setValue(email.split("@")[0]);
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View>
        <AuthInput
          {...emailInput}
          placeholder="이메일"
          keyboardType="email-address"
          returnKeyType="send"
          autoCorrect={false}
        />
        <AuthInput {...fNameInput} placeholder="이름" autoCapitalize="words" />
        <AuthInput {...lNameInput} placeholder="성" autoCapitalize="words" />
        <AuthInput
          {...usernameInput}
          placeholder="사용자 이름"
          returnKeyType="send"
          autoCorrect={false}
        />

        <AuthButton loading={loading} onPress={handleSignup} text="가입하기" />
        <FBContainer>
          <AuthButton
            bgColor={"#2D4DA7"}
            loading={false}
            onPress={fbLogin}
            text="Facebook으로 로그인"
          />
          <AuthButton
            bgColor={"#EE1922"}
            loading={false}
            onPress={googleLogin}
            text="Google로 로그인"
          />
        </FBContainer>
      </View>
    </TouchableWithoutFeedback>
  );
};

import React from "react";
import { TouchableWithoutFeedback, Keyboard } from "react-native";
import styled from "styled-components";
import AuthButton from "../../components/AuthButton";
import AuthInput from "../../components/AuthInput";
import useInput from "../../hooks/useInput";
import { Alert } from "react-native";

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const Text = styled.Text``;

export default () => {
  const emailInput = useInput("");
  const handleLogin = () => {
    const { value } = emailInput;
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (value === "") {
      return Alert.alert("이메일을 입력해 주세요");
    } else if (!value.includes("@") || !value.includes(".")) {
      return Alert.alert("이메일 형식에 맞춰서 입력해주세요");
    } else if (!emailRegex.test(value)) {
      return Alert.alert("이메일 형식이 올바르지 않습니다");
    }
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View>
        <AuthInput
          {...emailInput}
          placeholder="이메일"
          keyboardType="email-address"
          returnKeyType="send"
          onEndEditing={handleLogin}
          autoCorrect={false}
        />
        <AuthButton onPress={handleLogin} text="로그인" />
      </View>
    </TouchableWithoutFeedback>
  );
};

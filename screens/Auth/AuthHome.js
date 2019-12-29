import React from "react";
import styled from "styled-components";
import constants from "../../constants";
import AuthButton from "../../components/AuthButton";

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const Image = styled.Image`
  width: ${constants.width / 2};
  margin-bottom: -80px;
`;

const Touchable = styled.TouchableOpacity``;

const LoginLink = styled.View``;

const LoginLinkText = styled.Text`
  color: ${props => props.theme.blueColor};
  margin-top: 20px;
`;

export default ({ navigation }) => (
  <View>
    <Image resizeMode={"contain"} source={require("../../assets/logo.png")} />
    <AuthButton
      text={"가입하기"}
      onPress={() => navigation.navigate("Signup")}
    />
    <Touchable onPress={() => navigation.navigate("Login")}>
      <LoginLink>
        <LoginLinkText>로그인</LoginLinkText>
      </LoginLink>
    </Touchable>
  </View>
);

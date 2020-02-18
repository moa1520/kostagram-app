import React, { useState, useEffect } from "react";
import { Image, ScrollView, TouchableOpacity, Platform } from "react-native";
import * as Permissions from "expo-permissions";
import * as MediaLibrary from "expo-media-library";
import styled from "styled-components";
import Loader from "../../components/Loader";
import constants from "../../constants";
import styles from "../../styles";
import { Ionicons } from "@expo/vector-icons";

const View = styled.View`
  flex: 1;
`;

const Text = styled.Text`
  color: black;
  font-weight: 600;
`;

const Button = styled.TouchableOpacity`
  width: 100px;
  height: 30px;
  position: absolute;
  right: 5px;
  top: 15px;
  background-color: white;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  opacity: 0.8;
  border: 0.2px solid ${styles.darkGreyColor};
`;

const MultiIcon = styled.TouchableOpacity`
  position: absolute;
  width: 50px;
  height: 50px;
  left: 10px;
  top: 15px;
  background-color: ${styles.blackColor};
  padding: 10px;
  border: 0.2px solid ${styles.darkGreyColor};
  border-radius: 30px;
  opacity: 0.8;
`;

const ImageContainer = styled.View``;
const CheckBox = styled.View`
  position: absolute;
  top: 5px;
  right: 5px;
  width: 25px;
  height: 25px;
  border: 2px solid white;
  border-radius: 50px;
  background-color: ${props =>
    props.isSelected ? props.theme.blueColor : "rgba(255, 255, 255, 0.3)"};
`;

export default ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [hasPermission, setHasPermission] = useState(false);
  const [selected, setSelected] = useState();
  const [allPhotos, setAllPhotos] = useState();
  const [isMulti, setIsMulti] = useState(false);
  const isSelected = item => {
    if (selected.indexOf(item) === -1) {
      return false;
    } else {
      return true;
    }
  };
  const changeSelected = photo => {
    if (!isMulti) {
      setSelected(photo);
    } else {
      if (!isSelected(photo)) {
        setSelected([photo, ...selected]);
      } else {
        selected.splice(selected.indexOf(photo), 1);
      }
    }
  };
  const getPhotos = async () => {
    try {
      const { assets } = await MediaLibrary.getAssetsAsync({ first: 100 });
      const [firstPhoto] = assets;
      setSelected(firstPhoto);
      setAllPhotos(assets);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };
  const askPermission = async () => {
    try {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status === "granted") {
        setHasPermission(true);
        getPhotos();
      }
    } catch (e) {
      console.log(e);
      setHasPermission(false);
    }
  };
  const handleSelected = () => {
    navigation.navigate("Upload", { photo: selected, isMulti });
  };
  const handleMulti = () => {
    setIsMulti(p => !p);
    if (!isMulti) {
      setSelected([selected]);
    }
  };
  useEffect(() => {
    askPermission();
  }, []);
  return (
    <View>
      {loading ? (
        <Loader />
      ) : (
        <View>
          {hasPermission ? (
            <>
              <Image
                style={{ width: constants.width, height: constants.height / 2 }}
                source={{ uri: isMulti ? selected[0].uri : selected.uri }}
              />
              <Button onPress={handleSelected}>
                <Text>사진 선택</Text>
              </Button>
              <MultiIcon onPress={handleMulti}>
                <Ionicons
                  color={"white"}
                  size={32}
                  name={Platform.OS === "ios" ? "ios-images" : "md-images"}
                />
              </MultiIcon>
              <ScrollView
                contentContainerStyle={{
                  flexDirection: "row",
                  flexWrap: "wrap"
                }}
              >
                {allPhotos.map(photo => (
                  <TouchableOpacity
                    key={photo.id}
                    onPress={() => changeSelected(photo)}
                  >
                    <ImageContainer>
                      <Image
                        key={photo.id}
                        source={{ uri: photo.uri }}
                        style={{
                          width: constants.width / 3,
                          height: constants.height / 6,
                          opacity: photo.id === selected.id ? 0.3 : 1
                        }}
                      />
                      {isMulti ? (
                        <CheckBox isSelected={isSelected(photo)} />
                      ) : null}
                    </ImageContainer>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </>
          ) : null}
        </View>
      )}
    </View>
  );
};

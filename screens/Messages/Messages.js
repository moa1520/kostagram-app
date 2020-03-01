import React from "react";
import styled from "styled-components";
import { ScrollView, Image, TouchableOpacity } from "react-native";
import withSuspense from "../../components/withSuspense";
import { useQuery } from "react-apollo-hooks";
import { SEE_ROOMS } from "../../components/Queries";
import styles from "../../styles";
import { withNavigation } from "react-navigation";

const Container = styled.View``;

const Line = styled.View`
  padding: 15px;
  flex-direction: row;
`;

const Text = styled.Text`
  font-size: 16px;
`;

const Grey = styled.Text`
  color: ${styles.darkGreyColor};
  font-size: 16px;
`;

const TextArea = styled.View`
  margin-left: 10px;
  justify-content: center;
  width: 80%;
`;

const Messages = ({ navigation }) => {
  const {
    data: { seeRooms },
    error
  } = useQuery(SEE_ROOMS, { suspend: true });
  return (
    <ScrollView>
      <Container>
        {seeRooms.map(room => (
          <TouchableOpacity
            key={room.id}
            onPress={() => navigation.navigate("Message", { roomId: room.id })}
          >
            <Line>
              <Image
                style={{ width: 60, height: 60, borderRadius: 50 }}
                source={{ uri: room.participants[1].avatar }}
              />
              <TextArea>
                <Text>{room.participants[1].username}</Text>
                <Grey>{room.messages[room.messages.length - 1].text}</Grey>
              </TextArea>
            </Line>
          </TouchableOpacity>
        ))}
      </Container>
    </ScrollView>
  );
};

export default withSuspense(withNavigation(Messages));

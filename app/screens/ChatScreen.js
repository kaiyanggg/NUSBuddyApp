import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";

function ChatScreen(props) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Are you a junior looking for a senior to talk to for advice regarding
        university life? Or are you a senior looking to provide information
        regarding your university experiences? {"\n\n"}
        If so, head over to our fully anonymous telegram chatbot @NusBudChatBot{" "}
        {"\n\n"}
      </Text>
      <Image
        source={require("../../assets/NUSBuddyChat.png")}
        style={styles.image}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    margin: 10,
  },
  text: {
    fontSize: 16,
  },
  image: {
    width: 300,
    height: 400,
    marginBottom: 8,
    marginTop: 10,
    marginRight: 20,
  },
});
export default ChatScreen;

import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../../firebase";
import Ionicons from "@expo/vector-icons/Ionicons";
import { SafeAreaView } from "react-native-safe-area-context";

function HomeScreen(props) {
  const navigation = useNavigation();

  const handleButtonPress = (screenName) => {
    navigation.navigate(screenName);
  };

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Login");
      })
      .catch((error) => alert(error.message));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Welcome to NUSBuddy!</Text>
          <Text style={styles.standardText}>How can we help you today?</Text>
        </View>
        <View style={styles.iconContainer}>
          <Ionicons
            name="person-circle"
            style={styles.personCircleIcon}
            size={30}
            color="black"
            onPress={() => handleButtonPress("Profile")}
          />
          <Ionicons
            name="search-outline"
            size={30}
            color="black"
            onPress={() => handleButtonPress("Search")}
          />
        </View>
      </View>
      <View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleButtonPress("Courses")}
        >
          <Text style={styles.buttonText}>Courses</Text>
          <Image
            source={require("../../assets/book-stack.png")}
            style={styles.buttonImage}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleButtonPress("Residences")}
        >
          <Text style={styles.buttonText}>Residences</Text>
          <Image
            source={require("../../assets/home.png")}
            style={styles.buttonImage}
          />
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleButtonPress("Event")}
        >
          <Text style={styles.buttonText}>Events</Text>
          <Image
            source={require("../../assets/calendar.png")}
            style={styles.buttonImage}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleButtonPress("For You")}
        >
          <Text style={styles.buttonText}>For You</Text>
          <Image
            source={require("../../assets/user.png")}
            style={styles.buttonImage}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleButtonPress("Chat")}
        >
          <Text style={styles.buttonText}>Chat</Text>
          <Image
            source={require("../../assets/chat.png")}
            style={styles.buttonImage}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 100,
    height: 100,
  },
  button: {
    width: 370,
    height: 100,
    borderRadius: 20, // Adds rounded corners
    backgroundColor: "lightblue",
    margin: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  buttonText: {
    color: "black",
    fontSize: 20,
    fontWeight: "700",
    marginLeft: 25,
  },
  buttonImage: {
    width: 50,
    height: 50,
    marginBottom: 8,
    marginTop: 10,
    marginRight: 20,
  },
  row: {
    flexDirection: "row",
  },
  signoutButton: {
    width: 150,
    height: 40,
    backgroundColor: "lightgrey",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 100,
    margin: 20,
  },
  signoutButtonText: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
  },
  headerText: {
    color: "black",
    fontSize: 20,
    fontWeight: "bold",
    marginRight: 65,
  },
  standardText: {
    color: "black",
    fontSize: 16,
    fontWeight: "normal",
  },
  topContainer: {
    flexDirection: "row",
    position: "absolute",
    top: 25,
    alignItems: "center",
  },
  iconContainer: {
    flexDirection: "row",
  },
  personCircleIcon: {
    marginRight: 10,
  },
});

export default HomeScreen;

import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import jsonData from "../../../data/nusmajors.json";

function CHSScreen(props) {
  const navigation = useNavigation();
  const majorArray = [];

  for (const data of jsonData) {
    if (data.Faculty === "College of Humanities and Sciences") {
      const major = data.Major;
      majorArray.push(major);
    }
  }

  const handleMajorPress = (major) => {
    console.log(`Button pressed for major: ${major}`);
    navigation.navigate(major);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Majors</Text>
      {majorArray.map((major, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => handleMajorPress(major)}
          style={styles.majorButton}
        >
          <Text style={styles.majorButtonText}>{major}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    paddingHorizontal: 16,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    marginTop: 12,
  },
  majorButton: {
    marginBottom: 8,
    backgroundColor: "lightblue",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
  },
  majorButtonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default CHSScreen;

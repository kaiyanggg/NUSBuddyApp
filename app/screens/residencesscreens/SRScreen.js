import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import jsonData from "../../../data/residences.json";

function SRScreen(props) {
  const navigation = useNavigation();

  const residenceArray = [];

  for (const data of jsonData) {
    if (data.Type === "Student Residences") {
      const residence = data.Residence;
      residenceArray.push(residence);
    }
  }

  const handleResidencePress = (residence) => {
    // Handle the button press for a specific faculty
    console.log(`Button pressed for residence: ${residence}`);
    navigation.navigate(residence);
    // You can add your desired functionality here
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Student Residences</Text>
      {residenceArray.map((residence, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => handleResidencePress(residence)}
          style={styles.residenceButton}
        >
          <Text style={styles.residenceButtonText}>{residence}</Text>
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
  residenceButton: {
    marginBottom: 8,
    backgroundColor: "lightblue",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
  },
  residenceButtonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default SRScreen;

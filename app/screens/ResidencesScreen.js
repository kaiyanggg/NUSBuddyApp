import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import jsonData from "../../data/residences.json"; // Import the JSON data file

function ResidencesScreen(props) {
  const navigation = useNavigation();

  const extractResTypeNames = () => {
    const resTypeSet = new Set(); // Use a Set to store unique residence types

    jsonData.forEach((item) => {
      const resType = item.Type;
      if (!resTypeSet.has(resType) && resType != "") {
        resTypeSet.add(resType);
      }
    });

    const resTypeNames = Array.from(resTypeSet); // Convert the Set to an array
    return resTypeNames;
  };

  const resTypeNames = extractResTypeNames(); // Call the function to extract residence types

  const handleResTypePress = (resType) => {
    // Handle the button press for a specific residence type
    console.log(`Button pressed for faculty: ${resType}`);
    navigation.navigate(resType);
    // You can add your desired functionality here
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Residential Types</Text>
      {resTypeNames.map((resType, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => handleResTypePress(resType)}
          style={styles.resTypeButton}
        >
          <Text style={styles.resTypeButtonText}>{resType}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start", // Align content to the top
    alignItems: "flex-start", // Align items to the left
    paddingHorizontal: 16, // Add horizontal padding for better spacing
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    marginTop: 12,
  },
  resTypeButton: {
    marginBottom: 8,
    backgroundColor: "lightblue",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
  },
  resTypeButtonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ResidencesScreen;

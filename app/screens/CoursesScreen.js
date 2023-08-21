import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import jsonData from "../../data/nusmajors.json";

function CoursesScreen(props) {
  const navigation = useNavigation();

  const extractFacultyNames = () => {
    const facultySet = new Set(); // Use a Set to store unique faculty names

    jsonData.forEach((item) => {
      const faculty = item.Faculty;
      if (!facultySet.has(faculty)) {
        facultySet.add(faculty);
      }
    });

    const facultyNames = Array.from(facultySet); // Convert the Set to an array
    return facultyNames;
  };

  const facultyNames = extractFacultyNames(); // Call the function to extract faculty names

  const handleFacultyPress = (faculty) => {
    console.log(`Button pressed for faculty: ${faculty}`);
    navigation.navigate(faculty);
  };

  console.log({ facultyNames });
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Faculties</Text>
      {facultyNames.map((faculty, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => handleFacultyPress(faculty)}
          style={styles.facultyButton}
        >
          <Text style={styles.facultyButtonText}>{faculty}</Text>
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
  facultyButton: {
    marginBottom: 8,
    backgroundColor: "lightblue",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
  },
  facultyButtonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default CoursesScreen;

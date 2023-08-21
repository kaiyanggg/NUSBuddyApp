import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { getDocs, collection, addDoc } from "firebase/firestore";
import { auth, db } from "../../firebase";
import courseData from "../../data/nusmajors.json";
import residenceData from "../../data/residences.json";

function OnboardingScreen() {
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [course, setCourse] = useState("");
  const [residence, setResidence] = useState("");
  const [yearOfStudy, setYearOfStudy] = useState("");
  const [yearDropdownOpen, setYearDropdownOpen] = useState(false);
  const [courseDropdownOpen, setCourseDropdownOpen] = useState(false);
  const [residenceDropdownOpen, setResidenceDropdownOpen] = useState(false);
  const [profileList, setProfileList] = useState([]);
  const profileCollectionRef = collection(db, "userinfo");

  const getProfileList = async () => {
    try {
      const data = await getDocs(profileCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setProfileList(filteredData);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getProfileList();
  }, []);

  const validateFields = () => {
    if (!name || !course || !residence || !yearOfStudy) {
      Alert.alert("Incomplete Form", "Please fill in all the fields.");
      return false;
    }
    return true;
  };

  const onSubmitProfile = async () => {
    if (!validateFields()) {
      return;
    }

    console.log("Name:", name);
    console.log("Course:", course);
    console.log("Preferred Residence:", residence);
    console.log("Year of Study:", yearOfStudy);

    navigation.replace("Home");

    try {
      await addDoc(profileCollectionRef, {
        name: name,
        course: course,
        residence: residence,
        yearOfStudy: yearOfStudy,
        userId: auth?.currentUser?.uid,
      });
      getProfileList();
    } catch (err) {
      console.error(err);
    }
  };

  const toggleYearDropdown = () => {
    setYearDropdownOpen(!yearDropdownOpen);
  };
  const toggleCourseDropdown = () => {
    setCourseDropdownOpen(!courseDropdownOpen);
  };
  const toggleResidenceDropdown = () => {
    setResidenceDropdownOpen(!residenceDropdownOpen);
  };

  const yearOfStudyOptions = ["Pre Uni", "1", "2", "3", "4"];
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Name:</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Enter your name"
      />

      <TouchableOpacity style={styles.dropdown} onPress={toggleCourseDropdown}>
        <Text style={styles.dropdownLabel}>Course:</Text>
        <Text style={styles.dropdownValue}>{course}</Text>
      </TouchableOpacity>

      {courseDropdownOpen && (
        <View style={styles.dropdownContainer}>
          <ScrollView style={styles.dropdownScroll}>
            {courseData.map((courseItem) => (
              <TouchableOpacity
                key={courseItem.Major}
                style={styles.dropdownOption}
                onPress={() => {
                  setCourse(courseItem.Major);
                  toggleCourseDropdown();
                }}
              >
                <Text style={styles.dropdownOptionText}>
                  {courseItem.Major}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}

      <TouchableOpacity
        style={styles.dropdown}
        onPress={toggleResidenceDropdown}
      >
        <Text style={styles.dropdownLabel}>Residence:</Text>
        <Text style={styles.dropdownValue}>{residence}</Text>
      </TouchableOpacity>

      {residenceDropdownOpen && (
        <View style={styles.dropdownContainer}>
          <ScrollView>
            {residenceData.map((residenceItem) => (
              <TouchableOpacity
                key={residenceItem.Residence}
                style={styles.dropdownOption}
                onPress={() => {
                  setResidence(residenceItem.Residence);
                  toggleResidenceDropdown();
                }}
              >
                <Text style={styles.dropdownOptionText}>
                  {residenceItem.Residence}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}

      <TouchableOpacity style={styles.dropdown} onPress={toggleYearDropdown}>
        <Text style={styles.dropdownLabel}>Year of Study:</Text>
        <Text style={styles.dropdownValue}>{yearOfStudy}</Text>
      </TouchableOpacity>

      {yearDropdownOpen && (
        <View style={styles.dropdownOptions}>
          {yearOfStudyOptions.map((option) => (
            <TouchableOpacity
              key={option}
              style={styles.dropdownOption}
              onPress={() => {
                setYearOfStudy(option);
                toggleYearDropdown();
              }}
            >
              <Text style={styles.dropdownOptionText}>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      <TouchableOpacity style={styles.button} onPress={onSubmitProfile}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: "gray",
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  dropdown: {
    height: 40,
    borderWidth: 1,
    borderColor: "gray",
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dropdownLabel: {
    fontSize: 16,
  },
  dropdownValue: {
    fontSize: 16,
    fontWeight: "bold",
  },
  dropdownOptions: {
    marginTop: 5,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 10,
  },
  dropdownOption: {
    padding: 10,
  },
  dropdownOptionText: {
    fontSize: 16,
  },
  dropdownContainer: {
    flex: 1,
    maxHeight: "50%",
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 10,
    marginTop: 5,
  },
  button: {
    width: 150,
    height: 40,
    backgroundColor: "dodgerblue",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 100,
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default OnboardingScreen;

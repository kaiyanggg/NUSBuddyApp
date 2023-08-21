import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  getDocs,
  collection,
  updateDoc,
  doc,
  query,
  where,
} from "firebase/firestore";
import { auth, db } from "../../firebase";
import courseData from "../../data/nusmajors.json";
import residenceData from "../../data/residences.json";

function EditProfileScreen() {
  const navigation = useNavigation();
  const uid = auth?.currentUser?.uid;
  const [profileList, setProfileList] = useState([]);
  const [name, updateName] = useState("");
  const [course, updateCourse] = useState("");
  const [residence, updateResidence] = useState("");
  const [yearOfStudy, updateYearOfStudy] = useState("");
  const [yearDropdownOpen, setYearDropdownOpen] = useState(false);
  const [courseDropdownOpen, setCourseDropdownOpen] = useState(false);
  const [residenceDropdownOpen, setResidenceDropdownOpen] = useState(false);

  const profileCollectionRef = collection(db, "userinfo");
  const dataset = query(profileCollectionRef, where("userId", "==", uid));

  // Getting current profile details
  const getProfileList = async () => {
    try {
      const data = await getDocs(dataset);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setProfileList(filteredData);
      const profile = filteredData[0];
      updateName(profile.name || "");
      updateCourse(profile.course || "");
      updateResidence(profile.residence || "");
      updateYearOfStudy(profile.yearOfStudy || "");
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getProfileList();
  }, []);

  const docId = profileList.map((item) => item.id).toString();

  //Submit Button
  const onSaveProfile = async () => {
    console.log("Name:", name);
    console.log("Course:", course);
    console.log("Preferred Residence:", residence);
    console.log("Year of Study:", yearOfStudy);
    navigation.replace("Profile");

    try {
      const profileDoc = doc(db, "userinfo", docId);

      await updateDoc(profileDoc, {
        name: name,
        course: course,
        residence: residence,
        yearOfStudy: yearOfStudy,
      });
    } catch (err) {
      console.log(err);
    }
  };

  // Dropdown feature
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
      <TextInput style={styles.input} value={name} onChangeText={updateName} />

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
                  updateCourse(courseItem.Major);
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
                  updateResidence(residenceItem.Residence);
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
                updateYearOfStudy(option);
                toggleYearDropdown();
              }}
            >
              <Text style={styles.dropdownOptionText}>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      <TouchableOpacity style={styles.button} onPress={onSaveProfile}>
        <Text style={styles.buttonText}>Save</Text>
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

export default EditProfileScreen;

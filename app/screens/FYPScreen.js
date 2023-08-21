import React, { useState, useEffect } from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import { db, auth } from "../../firebase";
import { getDocs, collection, where, query } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";

function FYPScreen(props) {
  const navigation = useNavigation();
  const uid = auth.currentUser.uid;
  const [profileList, setProfileList] = useState([]);
  const profileCollectionRef = collection(db, "userinfo");
  const dataset = query(profileCollectionRef, where("userId", "==", uid));

  const getProfileList = async () => {
    try {
      const data = await getDocs(dataset);
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

  // Profile
  const course = profileList.map((profile) => profile.course);
  const residence = profileList.map((profile) => profile.residence);

  const handleButtonPress = (screenName) => {
    navigation.navigate(screenName);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => handleButtonPress(course[0])}
        style={styles.majorButton}
      >
        <Text style={styles.majorButtonText}>{course[0]}</Text>
      </TouchableOpacity>
      {residence[0] !== "NIL" && (
        <TouchableOpacity
          onPress={() => handleButtonPress(residence[0])}
          style={styles.majorButton}
        >
          <Text style={styles.majorButtonText}>{residence[0]}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    paddingHorizontal: 16,
    marginTop: 20,
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
export default FYPScreen;

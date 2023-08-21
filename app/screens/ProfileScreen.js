import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { db, auth } from "../../firebase";
import { getDocs, collection, where, query } from "firebase/firestore";
import { Avatar } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

function ProfileScreen(props) {
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

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.reset({
          index: 0,
          routes: [{ name: "Login" }],
        });
      })
      .catch((error) => alert(error.message));
  };

  // Profile
  const name = profileList.map((profile) => profile.name);
  const year = profileList.map((profile) => profile.yearOfStudy);
  const course = profileList.map((profile) => profile.course);
  const residence = profileList.map((profile) => profile.residence);
  const nameFirst = name.toString().slice(0, 1);

  const navigation = useNavigation();

  const onSubmitProfile = async () => {
    navigation.navigate("Edit Profile");
  };

  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <Avatar.Text label={nameFirst} />
        <Text style={styles.name}>{name}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>Email:</Text>
        <Text style={styles.infoValue}>{auth.currentUser.email}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>Year Of Study:</Text>
        <Text style={styles.infoValue}>{year}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>Course:</Text>
        <Text style={styles.infoValue}>{course}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>Residence:</Text>
        <Text style={styles.infoValue}>{residence}</Text>
      </View>
      <TouchableOpacity style={styles.editbutton} onPress={onSubmitProfile}>
        <Text style={styles.buttonText}>Edit Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.signoutbutton} onPress={handleSignOut}>
        <Text style={styles.buttonText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  avatarContainer: {
    alignItems: "center",
    marginTop: 20,
    justifyContent: "center",
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 5,
  },
  infoContainer: {
    marginTop: 20,
  },
  infoLabel: {
    fontWeight: "bold",
    fontSize: 15,
  },
  infoValue: {
    marginTop: 5,
    fontSize: 15,
  },
  editbutton: {
    width: 150,
    height: 40,
    backgroundColor: "lightblue",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 100,
    marginTop: 40,
    marginLeft: "25%",
  },
  signoutbutton: {
    width: 150,
    height: 40,
    backgroundColor: "lightblue",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 100,
    marginTop: 10,
    marginLeft: "25%",
  },
  buttonText: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ProfileScreen;

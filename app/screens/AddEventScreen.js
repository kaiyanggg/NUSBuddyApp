import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { auth, db } from "../../firebase";
import { useNavigation } from "@react-navigation/native";
import DateTimePickerModal from "react-native-modal-datetime-picker";

function AddEventScreen(props) {
  const navigation = useNavigation();
  const [eventname, setEventName] = useState("");
  const [eventdatetime, setEventDateTime] = useState(null);
  const [eventList, setEventList] = useState([]);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const eventCollectionRef = collection(db, "events");
  const validateFields = () => {
    if (!eventname || !eventdatetime) {
      Alert.alert("Incomplete Form", "Please fill in all the fields.");
      return false;
    }
    return true;
  };

  const onSubmitEvent = async () => {
    if (!validateFields()) {
      return;
    }
    console.log("Event Name:", eventname);
    navigation.navigate("Event");

    try {
      await addDoc(eventCollectionRef, {
        eventname: eventname,
        eventdatetime: Timestamp.fromDate(eventdatetime),
        userId: auth?.currentUser?.uid,
      });
      //getEventList();
    } catch (err) {
      console.error(err);
    }
  };

  // Functions to handle datetime picker visibility
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setEventDateTime(date);
    hideDatePicker();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Event Name:</Text>
      <TextInput
        style={styles.input}
        value={eventname}
        onChangeText={setEventName}
        placeholder="Enter your name"
      />
      <Text style={styles.label}>Event Date and Time:</Text>
      {eventdatetime ? (
        <TouchableOpacity style={styles.button} onPress={showDatePicker}>
          <Text style={styles.selectedDateTime}>
            {eventdatetime.toString().slice(0, -12)}
          </Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.button} onPress={showDatePicker}>
          <Text style={styles.buttonText}>Select Date and Time</Text>
        </TouchableOpacity>
      )}
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="datetime"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
      <View style={styles.submitButtonContainer}>
        <TouchableOpacity style={styles.submitButton} onPress={onSubmitEvent}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
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
  button: {
    height: 40,
    borderWidth: 1,
    borderColor: "gray",
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 10,
    justifyContent: "center",
  },
  buttonText: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
  },
  selectedDateTime: {
    fontSize: 16,
    marginBottom: 10,
    marginTop: 10,
  },
  submitButton: {
    width: 200,
    height: 40,
    backgroundColor: "dodgerblue",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 100,
    marginTop: 20,
  },
  submitButtonContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default AddEventScreen;

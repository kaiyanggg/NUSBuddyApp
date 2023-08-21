import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { db, auth } from "../../firebase";
import {
  getDocs,
  collection,
  query,
  where,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";

function EventScreen(props) {
  const [eventList, setEventList] = useState([]);
  const eventCollectionRef = collection(db, "events");
  const uid = auth.currentUser.uid;
  const dataset = query(eventCollectionRef, where("userId", "==", uid));

  const getEventList = async () => {
    try {
      const data = await getDocs(dataset);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      filteredData.sort((a, b) => a.eventdatetime - b.eventdatetime);
      setEventList(filteredData);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getEventList();
  }, []);

  const handleDeleteEvent = async (eventId) => {
    try {
      await deleteDoc(doc(eventCollectionRef, eventId));
      getEventList();
    } catch (err) {
      console.error(err);
    }
  };

  const navigation = useNavigation();

  const handleButtonPress = (screenName) => {
    navigation.navigate(screenName);
  };

  const renderEventItem = ({ item }) => (
    <View style={styles.eventContainer}>
      <View style={styles.row}>
        <View>
          <Text style={styles.eventName}>{item.eventname}</Text>
          <Text style={styles.eventDateTime}>
            {item.eventdatetime.toDate().toLocaleString([], {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
              hourCycle: "h23",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Text>
        </View>
        <View style={styles.icon}>
          <Ionicons
            name="trash-sharp"
            size={30}
            color="black"
            onPress={() => handleDeleteEvent(item.id)}
          />
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={eventList}
        renderItem={renderEventItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.flatListContent}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No events found</Text>
        }
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => handleButtonPress("Add Event")}
      >
        <Text style={styles.addButtonLabel}>Add Event</Text>
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
  flatListContent: {
    flexGrow: 1,
  },
  eventContainer: {
    marginBottom: 20,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "lightblue",
  },
  eventName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  eventDateTime: {
    fontSize: 16,
    color: "black",
    marginTop: 5,
  },
  addButton: {
    height: 40,
    backgroundColor: "lightgrey",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 20,
    margin: 10,
  },
  addButtonLabel: {
    fontSize: 15,
    fontWeight: "bold",
  },
  emptyText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  deleteButton: {
    backgroundColor: "red",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: "white",
  },
  row: {
    flexDirection: "row",
  },
  icon: {
    marginLeft: "auto",
    justifyContent: "center",
  },
});

export default EventScreen;

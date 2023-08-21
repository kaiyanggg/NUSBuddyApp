import { useCallback } from "react";
import React, { useState } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { Agenda, AgendaEntry } from "react-native-calendars";
import { Text, Avatar } from "react-native-paper";

function CalendarScreen(props) {
  const [items, setItems] = useState({});

  const timeToString = (time) => {
    const date = new Date(time);
    return date.toISOString().split("T")[0];
  };

  const loadItems = useCallback((day) => {
    setTimeout(() => {
      for (let i = -15; i < 85; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = timeToString(time);

        if (!items[strTime]) {
          items[strTime] = [];

          const numItems = Math.floor(Math.random() * 3 + 1);
          for (let j = 0; j < numItems; j++) {
            items[strTime].push({
              name: "Item for " + strTime + " #" + j,
              height: Math.max(50, Math.floor(Math.random() * 150)),
              day: strTime,
            });
          }
        }
      }
      const newItems = {};
      Object.keys(items).forEach((key) => {
        newItems[key] = items[key];
      });
      setItems(newItems);
    }, 1000);
  }, []);

  const renderItem = (item) => {
    return (
      <View>
        <TouchableOpacity
          style={styles.itemBox}
          onPress={() => Alert.alert(reservation.name)}
        >
          <Text>{item.name}</Text>
          <Avatar.Text label="J"></Avatar.Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Agenda
        items={items}
        loadItemsForMonth={loadItems}
        selected={"2023-07-12"}
        renderItem={renderItem}
      ></Agenda>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  itemBox: {
    backgroundColor: "white",
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default CalendarScreen;

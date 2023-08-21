import React, { useState, useEffect } from "react";
import majorsData from "../../data/nusmajors.json"; // Import the JSON data file
import residencesData from "../../data/residences.json"; // Import the JSON data file
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

function SearchScreen(props) {
  const navigation = useNavigation();
  const searchArray = [];

  for (const data of majorsData) {
    const major = data.Major;
    searchArray.push(major);
  }

  for (const data of residencesData) {
    const residence = data.Residence;
    searchArray.push(residence);
  }

  const [masterData, setMasterData] = useState(searchArray);
  const [filteredItems, setFilteredItems] = useState(searchArray);

  const ItemSeparatorView = () => {
    return <View style={{ height: 0.5, width: "100%" }} />;
  };

  const searchFilter = (text) => {
    if (text) {
      const newData = searchArray.filter((item) => {
        const itemData = item.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredItems(newData);
    } else {
      setFilteredItems(masterData);
    }
  };

  const ItemView = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.itemButton}
        onPress={() => handleItemPress(item)}
      >
        <Text style={styles.itemText}>{item}</Text>
      </TouchableOpacity>
    );
  };

  const handleItemPress = (item) => {
    navigation.navigate(item);
  };

  return (
    <View>
      <TextInput
        style={styles.searchInput}
        onChangeText={searchFilter}
        placeholder="Search"
      />
      <FlatList
        data={filteredItems}
        keyExtractor={(item, index) => index.toString()}
        ItemSeparatorComponent={ItemSeparatorView}
        renderItem={ItemView}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  searchInput: {
    height: 40,
    borderWidth: 1,
    borderColor: "gray",
    marginVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  itemSeparator: {
    height: 0.5,
    width: "100%",
    backgroundColor: "gray",
  },
  itemButton: {
    padding: 10,
  },
  itemText: {
    fontSize: 16,
  },
});

export default SearchScreen;

import React from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import jsonData from "../../../../data/nusmajors.json";

function AccScreen(props) {
  const facDataArray = [];

  for (const data of jsonData) {
    if (data.Major === "Business Administration (Accountancy)") {
      const facData = Object.values(data);
      facDataArray.push(facData);
    }
  }

  const facDataKey = [];

  for (const data of jsonData) {
    if (data.Major === "Business Administration (Accountancy)") {
      const facData = Object.keys(data);
      facDataKey.push(facData);
    }
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.headerText}>
          Business Administration (Accountancy)
        </Text>
        <Text style={styles.dataText}>
          {facDataKey[0][2]} : {facDataArray[0][2]}
          {"\n"}
          {facDataKey[0][3]} : {facDataArray[0][3]}
          {"\n"}
          {facDataKey[0][4]} : {facDataArray[0][4]}
          {"\n"}
          {facDataKey[0][5]} : {facDataArray[0][5]}
          {"\n\n"}
          {facDataKey[0][6]} : {facDataArray[0][6]}
          {"\n\n"}
          {facDataKey[0][7]} : {facDataArray[0][7]}
          {"\n"}
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start", // Align content to the top
    alignItems: "flex-start", // Align items to the left
    paddingHorizontal: 10,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    marginTop: 8,
  },
  dataText: {
    fontSize: 16,
    fontWeight: "normal",
  },
  scrollView: {
    marginHorizontal: 5,
  },
});

export default AccScreen;

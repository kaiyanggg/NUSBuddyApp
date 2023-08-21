import React from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import jsonData from "../../../../data/residences.json";

function KE7Screen(props) {
  const resDataArray = [];

  for (const data of jsonData) {
    if (data.Residence === "King Edward VII Hall") {
      const resData = Object.values(data);
      resDataArray.push(resData);
    }
  }

  const resDataKey = [];

  for (const data of jsonData) {
    if (data.Residence === "King Edward VII Hall") {
      const resData = Object.keys(data);
      resDataKey.push(resData);
    }
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.headerText}>King Edward VII Hall</Text>
        <Text style={styles.dataText}>
          {resDataKey[0][2]} : {resDataArray[0][2]}
          {"\n\n"}
          {resDataKey[0][3]} : {resDataArray[0][3]}
          {"\n\n"}
          {resDataKey[0][4]} : {resDataArray[0][4]}
          {"\n"}
          {resDataKey[0][5]} : {resDataArray[0][5]}
          {"\n"}
          {resDataKey[0][6]} : {resDataArray[0][6]}
          {"\n\n"}
          {resDataKey[0][7]} : {resDataArray[0][7]}
          {"\n"}
          {resDataKey[0][8]} : {resDataArray[0][8]}
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

export default KE7Screen;

import { StyleSheet, Text, View } from "react-native";
import React from "react";








import { Redirect } from "expo-router";

const index = () => {
  const signedIn = false;

  if (signedIn) {
    return <Redirect href={"/(root)/(tabs)/home"} />;
  }
  else{
    return <Redirect href={"/(auth)/welcome"} />;
  }

};

export default index;

const styles = StyleSheet.create({});

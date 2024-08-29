import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";

import { Redirect } from "expo-router";
import auth from '@react-native-firebase/auth';


const index = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (user) {
    
    return <Redirect href={"/(root)/(tabs)/home"} />;
  }
  else{
    console.log('no user')
    return <Redirect href={"/(auth)/welcome"} />;
  }

};

export default index;

const styles = StyleSheet.create({});

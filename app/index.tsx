import {Text, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useRouter,useSegments } from "expo-router";
import auth,{FirebaseAuthTypes} from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useUserStore } from "@/store/useUserStore";

import firestore from '@react-native-firebase/firestore';
import { User } from "@/types/type";
import AsyncStorage from "@react-native-async-storage/async-storage";

const index = () => {
  const [initializing, setInitializing] = useState(true);
  const [appUser, setAppUser] = useState<FirebaseAuthTypes.User | null>();
  const segments=useSegments();
  const router = useRouter();
  const { user,userType, subscribeToUserChanges, unsubscribeFromUserChanges } = useUserStore();
  const [loading,setLoading]=useState(true);

  // Effect to subscribe to Firestore changes on component mount


  useEffect(() => {
    // Subscribe to Firestore user changes
    subscribeToUserChanges();
    // Cleanup function to unsubscribe from Firestore on unmount

    return () => {
      unsubscribeFromUserChanges();
    };
  }, []);


  function onAuthStateChanged(user:FirebaseAuthTypes.User | null) {
    console.log('onAuthStateChanged',user)
    setAppUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      
    console.log('index user',user)

    
    if(initializing) return;
 
    const isAuthGroup=segments[0]==="(root)";
 
  
    if(!appUser && isAuthGroup){
      setLoading(false);
      return router.replace("/(auth)/welcome");

    }
    else if(appUser && !isAuthGroup){
     if(userType==='teacher'){
      console.log('teacherType',userType)
      setLoading(false);
       return router.replace("/(teacher)/(tabs)/thome");
     }
     else{
      setLoading(false);
       return router.replace("/(root)/(tabs)/home");
     }
    }
    else if(appUser && isAuthGroup){
      setLoading(false);
     if(userType=='teacher'){
      console.log('teacherType',userType)
       return router.replace("/(teacher)/(tabs)/thome");
     }
     else{
      setLoading(false);
       return router.replace("/(root)/(tabs)/home");
     }
    }
    else{
      setLoading(false);
      return router.replace("/(auth)/welcome");
    }
    }, 1500);

  }, []);


  useEffect(()=>{
    GoogleSignin.configure({
      webClientId: process.env.GOOGLE_OAUTH,
    });
  },[]);

  {loading && <View>
    <View className="flex-1 bg-white justify-center items-center">
    <Text>Quran Teacher</Text>
  </View>
  </View>}

};

export default index;


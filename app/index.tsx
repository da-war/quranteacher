import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";

import { useRouter,useSegments } from "expo-router";
import auth,{FirebaseAuthTypes} from '@react-native-firebase/auth';


import { GoogleSignin } from '@react-native-google-signin/google-signin';

import * as Notifications from 'expo-notifications';
import { registerForPushNotificationsAsync } from "@/lib/notifications";
import { Platform } from "react-native";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});






const index = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>();
  const [expoPushToken, setExpoPushToken] = useState('');
  const [channels, setChannels] = useState<Notifications.NotificationChannel[]>([]);
  const [notification, setNotification] = useState<Notifications.Notification | undefined>(
    undefined
  );

  const notificationListener = useRef<Notifications.Subscription>();
  const responseListener = useRef<Notifications.Subscription>();

  const segments=useSegments();
  const router = useRouter();

  function onAuthStateChanged(user:FirebaseAuthTypes.User | null) {
    console.log('onAuthStateChanged',user)
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => token! && setExpoPushToken(token));

    if (Platform.OS === 'android') {
      Notifications.getNotificationChannelsAsync().then(value => setChannels(value ?? []));
    }
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      notificationListener.current &&
        Notifications.removeNotificationSubscription(notificationListener.current);
      responseListener.current &&
        Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  console.log('push token',expoPushToken);


  useEffect(() => {

    
   if(initializing) return;

   const isAuthGroup=segments[0]==="(root)";
   if(!user && isAuthGroup){
     return router.replace("/(auth)/welcome");
   }
   else if(user && !isAuthGroup){
    return router.replace("/(root)/(tabs)/home");
   }
   else if(user && isAuthGroup){
    return router.replace("/(root)/(tabs)/home");
   }
   else{
     return router.replace("/(auth)/welcome");
   }

  }, [user,initializing]);


  useEffect(()=>{
    GoogleSignin.configure({
      webClientId: process.env.GOOGLE_OAUTH,
    });
    
  },[]);

  <View className="flex-1 bg-white justify-center items-center">
    <Text>Loading</Text>
  </View>

};

export default index;

const styles = StyleSheet.create({});

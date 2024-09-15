import { useRouter,useSegments } from "expo-router";
import auth,{FirebaseAuthTypes} from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useUserStore } from "@/store/useUserStore";

import firestore from '@react-native-firebase/firestore';
import { User } from "@/types/type";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Text, View } from "react-native";
import { useEffect, useState } from "react";

const index = () => {
  const [initializing, setInitializing] = useState(true);
  const [appUser, setAppUser] = useState<FirebaseAuthTypes.User | null>();
  const segments=useSegments();
  const router = useRouter();
  const { user,userType,setUserType, subscribeToUserChanges, unsubscribeFromUserChanges } = useUserStore();
  const [loading,setLoading]=useState(true);

  // Effect to subscribe to Firestore changes on component mount


  useEffect(() => {
    // Subscribe to Firestore user changes
    subscribeToUserChanges();
    // Cleanup function to unsubscribe from Firestore on unmount

    console.log('User Type',userType)
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
    setLoading(true);
    setTimeout(() => {

    console.log('index user',user)


    if(initializing) return;

    const isAuthGroup=segments[0]==="(root)";


    if(!appUser && isAuthGroup){
      setLoading(false);
      return router.replace("/(auth)/welcome");
      console.log('this is 1')

    }
    else if(appUser && !isAuthGroup){
     if(userType==='teacher'){
      console.log(' this is 2')
      console.log('teacherType',userType)
      setLoading(false);
       return router.replace("/(teacher)/(tabs)/thome");
       console.log('teacherType',userType)
     }
     else{
      console.log(' this is 3')
      setLoading(false);
       return router.replace("/(root)/(tabs)/home");
     }
    }
    else if(appUser && isAuthGroup){
      console.log(' this is 4')
      setLoading(false);
     if(userType=='teacher'){
      console.log('teacherType',userType)
       return router.replace("/(teacher)/(tabs)/thome");
     }
     else{
      setLoading(false);
      console.log(' this is 5')
       return router.replace("/(root)/(tabs)/home");
      
     }
    }
    else{
      console.log(' this is last')
      setLoading(false);
      return router.replace("/(auth)/welcome");
    }
    }, 1500);

  }, [appUser,initializing,user]);


 
  {loading && <View>
    <View className="flex-1 bg-white justify-center items-center">
    <Text>Quran Teacher</Text>
  </View>
  </View>}

};
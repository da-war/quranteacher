import { Teacher } from '@/types/type';
import AsyncStorage from '@react-native-async-storage/async-storage';

import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { Alert } from 'react-native';
import { router } from 'expo-router';

export const getTeacherFromAsyncStorage = async (): Promise<Teacher | null> => {
    console.log("Getting teacher from async storage ____________");
  try {
    const user = await AsyncStorage.getItem('teacher');
    if (user) {
        console.log("Teacher----------",JSON.parse(user));
      return JSON.parse(user) as Teacher;
    }
    return null; 
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getTeacherAppliedJobs = async (): Promise<Teacher | null> => {
    console.log("Getting teacher from firestore");
    //the doc id is the user.id
    const userId=auth().currentUser?.uid;
    console.log("User id",userId);
    const doc = await firestore().collection('teacherapplications').doc(userId).get();
    if (doc.exists) {
      const teacher = doc.data() as Teacher;
      if(teacher){
        await AsyncStorage.setItem('teacher', JSON.stringify(teacher));
      }
      return JSON.parse(JSON.stringify(teacher)) as Teacher;
    }
    else if(!doc.exists){
        console.log("No teacher found");
    }
    return null;
  };


  export function toArabicNumeral(num: number): string {
    const arabicNumerals = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
    return num
      .toString()
      .split('')
      .map(digit => arabicNumerals[parseInt(digit)])
      .join('');
  }

 


   export const logout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      { text: 'OK', onPress: ()=>{
        auth().signOut().then(()=>{
          AsyncStorage.removeItem('user');
          AsyncStorage.removeItem('arabicFontSize');
          AsyncStorage.removeItem('translationFontSize');
          AsyncStorage.removeItem('teacher-storage');
          AsyncStorage.removeItem("user-storage");
          router.replace('/welcome');
          Alert.alert('Logged out successfully');

        }).catch((e)=>{
          console.log(e);
        })
      } },
    ]);

  };
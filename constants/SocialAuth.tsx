import React, { useEffect } from "react";
import { Alert, Image, Text, View } from "react-native";
import CustomButton from "../components/CustomButton";
import { icons } from "./index";
import * as Animatable from "react-native-animatable";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import auth from "@react-native-firebase/auth"; // Firebase Auth
import firestore from "@react-native-firebase/firestore"; // Firestore
import { router } from "expo-router";

// Configure Google Signin

const SocialAuth = () => {
  useEffect(() => {
    GoogleSignin.configure({
      webClientId: process.env.GOOGLE_OAUTH, // Replace with your Google Web Client ID
    });
  }, []);
  const signInWithGoogle = async () => {
    try {
      // Start the Google Sign-In process
      const response = await GoogleSignin.hasPlayServices();
      console.log("response", response);
      const { data, type } = await GoogleSignin.signIn();
      console.log("data", data);
      const token = data?.idToken;
      console.log("type", type);

      if (type.toLocaleLowerCase() === "cancelled") {
        return;
      }

      console.log("idToken", data?.idToken);

      if (!token) {
        throw new Error("Google Sign-In failed");
      }

      const googleCredential = auth.GoogleAuthProvider.credential(token!);

      // Sign-in with credential from the Google user
      const userCredential = await auth().signInWithCredential(
        googleCredential
      );
      const user = userCredential.user;
      console.log("user", user);

      // Check if the user exists in Firestore
      const userDoc = await firestore().collection("users").doc(user.uid).get();
      if (!userDoc.exists) {
        await firestore().collection("users").doc(user.uid).set({
          id: user.uid,
          name: user.displayName,
          email: user.email,
          profilePicture: user.photoURL,
          createdAt: firestore.FieldValue.serverTimestamp(),
          role: "student",
          bookings: [],
          phoneNumber: "",
          passwordHash: "",
          city: "",
          country: "",
          qualifications: [],
          verified: false,
          availability: [],
          classes: [],
          videoIntro: "",
          bio: "",
          rating: 0,
          expoNotificationToken: "",
          isTeacherApplied: false,
        });
      }

      Alert.alert("Success", "You are signed in with Google!");
      router.replace("/(root)/(tabs)/home");
    } catch (error) {
      console.error(error);
      Alert.alert("Something went wrong");
    }
  };

  return (
    <Animatable.View
      animation="slideInUp"
      duration={500}
      className="justify-center items-center mt-3"
    >
      <Text className="text-lg font-JakartaBold text-neutral-500 mb-3">
        Continue With
      </Text>
      <View className="flex flex-row items-center justify-center mx-4">
        <CustomButton
          bgVariant="outline"
          title="Google"
          IconLeft={() => (
            <Image
              source={icons.google}
              resizeMode="contain"
              style={{ width: 20, height: 20, marginRight: 10 }}
            />
          )}
          textVariant="primary"
          style={{ width: "100%" }}
          onPress={signInWithGoogle}
        />
      </View>
    </Animatable.View>
  );
};

export default SocialAuth;

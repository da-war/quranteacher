import { useRootNavigationState, useRouter, useSegments } from "expo-router";
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { Text, View } from "react-native";
import { useEffect, useState } from "react";

const Index = () => {
  const [initializing, setInitializing] = useState(true); // Track Firebase auth initialization
  const [firebaseAuthUser, setFirebaseAuthUser] = useState<FirebaseAuthTypes.User | null>(null); // Store Firebase auth user
  const router = useRouter();
  const rootNavigationState = useRootNavigationState();
  
  const isRootNavigationReady = rootNavigationState?.key !== undefined; // Check if navigation is ready
  const segments = useSegments();
  const isAuthGroup = segments[0] === '(root)'; // Check if the current segment is part of the authenticated route group

  useEffect(() => {
    // Subscribe to Firebase Auth state changes
    const subscriber = auth().onAuthStateChanged(user => {
      setFirebaseAuthUser(user);
      setInitializing(false); // Set initializing to false when Firebase is done restoring the user state
    });

    return subscriber; // Unsubscribe on unmount
  }, []);

  useEffect(() => {
    if (initializing || !isRootNavigationReady) {
      // Don't attempt to navigate until Firebase and the router are initialized
      return;
    }

    if (firebaseAuthUser && !isAuthGroup) {
      router.replace('/(root)/(tabs)/home'); // Navigate to home if user is authenticated
    } else if (!firebaseAuthUser && isAuthGroup) {
      router.replace('/(auth)/welcome'); // Navigate to welcome screen if the user is not authenticated
    }
  }, [firebaseAuthUser, initializing, isRootNavigationReady]);

  if (initializing || !isRootNavigationReady) {
    // Show loading screen while Firebase or the router is still initializing
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-3xl font-JakartaBold">Loading...</Text>
      </View>
    );
  }

  return null;
};

export default Index;

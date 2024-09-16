import React, { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useUserStore } from '@/store/useUserStore';
import { User } from '@/types/type';

interface AuthContextType {
  userType: string | null;
  loading: boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userTypeC, setUserTypeC] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const {setUser,setUserType}=useUserStore();

  useEffect(() => {
    // Subscribe to auth changes
    const unsubscribeAuth = auth().onAuthStateChanged(async (user) => {
      if (user) {
        try {
          const userDoc = await firestore().collection('users').doc(user.uid).get();
          if (userDoc.exists) {
            const userData = userDoc.data() as User;
            setUserTypeC(userData?.role || 'student'); // Default to 'student'
            setUser(userData);
            setUserType(userData?.role || 'student');
            if(userData?.role === 'teacher'){
              router.replace('/(teacher)/(tabs)/thome');
            }else{
              router.replace('/(root)/(tabs)/home');
            }
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      } else {
        setUserTypeC(null);
        router.replace('/welcome');
      }
      setLoading(false);
    });

    return () => unsubscribeAuth(); // Cleanup subscription on unmount
  }, [router]);

  const logout = () => {
    auth()
      .signOut()
      .then(() => {
        console.log('Signed out');
        router.replace('/welcome');
      })
      .catch((error) => {
        console.error('Sign out error:', error);
      });
  };

  return (
    <AuthContext.Provider value={{ userType: userTypeC, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

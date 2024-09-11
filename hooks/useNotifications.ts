import { Platform } from 'react-native'
import React, { useEffect } from 'react';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants'
import * as Device from 'expo-device'
import { registerForPushNotificationsAsync } from '@/lib/notifications';

export interface PushNotificationState {
    notification?:Notifications.Notification,
    expoPushToken?:Notifications.ExpoPushToken
}

export const usePushNotifications=():PushNotificationState=>{
    Notifications.setNotificationHandler({
        handleNotification: async () => ({
          shouldShowAlert: true,
          shouldPlaySound: false,
          shouldSetBadge: false,
        }),
      });

      const [expoPushToken, setExpoPushToken] = React.useState<Notifications.ExpoPushToken | undefined>();
    const [notification, setNotification] = React.useState<Notifications.Notification | undefined>();
    const notificationListener = React.useRef<Notifications.Subscription>();
    const responseListener = React.useRef<Notifications.Subscription>();
    const [initializing, setInitializing] = React.useState(true);


    const registerForPushNotificationsAsync= async ()=> {
        let token;
      
        if (Platform.OS === 'android') {
          await Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
          });
        }
      
        if (Device.isDevice) {
          const { status: existingStatus } = await Notifications.getPermissionsAsync();
          let finalStatus = existingStatus;
          if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
          }
          if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!');
          }
          // Learn more about projectId:
          // https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid
          // EAS projectId is used here.
          try {
            const projectId =
              Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId;
            if (!projectId) {
              throw new Error('Project ID not found');
            }
            token = (
              await Notifications.getExpoPushTokenAsync({
                projectId,
              })
            ).data;
            console.log(token);
          } catch (e) {
            token = `${e}`;
          }
        } else {
          alert('Must use physical device for Push Notifications');
        }
      
        return token;
      }


      useEffect(() => {
        registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

        // This listener is fired whenever a notification is received while the app is foregrounded
        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
          setNotification(notification);
        });



        // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
          console.log(response);
        });

        return () => {
          Notifications.removeNotificationSubscription(notificationListener.current);
          Notifications.removeNotificationSubscription(responseListener.current);
        };


      }, []);



}
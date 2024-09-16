export default{
  "expo": {
    "name": "QuranTeacher",
    "slug": "QuranTeacher",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/images/icon.png",
    "scheme": "quranteacher",
    "userInterfaceStyle": "automatic",
    "splash": {
      "image": "./assets/images/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#004d00"
    },
    "ios": {
      "supportsTablet": true,
      "googleServicesFile": process.env.EXPO_PUBLIC_GOOGLE_SERVICE_INFO_PLIST ||"./GoogleService-Info.plist",
      "bundleIdentifier": "com.ranadawar.quranteacher",
      "infoPlist": {
        "CFBundleAllowMixedLocalizations": true,
        "ExpoLocalization_supportsRTL": true,
        "UIBackgroundModes": [
          "audio",
          "fetch",
          "location",
          "remote-notification",
        ],
        "NSLocationWhenInUseUsageDescription": "Allow the app to access your location in order to determine where you are.",
        "NSLocationAlwaysAndWhenInUseUsageDescription": "Allow the app to access your location in order to determine where you are.",
        "UIUserNotificationCategories": [
          {
            "UIUserNotificationAction": "Stop",
            "identifier": "Stop"
          }
        ],
        "UIUserNotificationType": [
          "Sound",
          "Alert",
          "Badge"
        ],
        "NSLocationAlwaysUsageDescription": "Allow the app to access your location in order to determine where you are.",
      }
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/images/adaptive-icon.png",
        "backgroundColor": "#ffffff"
      },
      "googleServicesFile": process.env.EXPO_PUBLIC_GOOGLE_SERVICE_JSON||"./google-services.json",
      "package": "com.ranadawar.quranteacher",
      "permissions": [
        "android.permission.ACCESS_COARSE_LOCATION",
        "android.permission.ACCESS_FINE_LOCATION"
      ]
    },
    "web": {
      "bundler": "metro",
      "output": "static",
      "favicon": "./assets/images/favicon.png"
    },
    "plugins": [
      "expo-router",
      "@react-native-firebase/app",
      "@react-native-firebase/auth",
      "@react-native-google-signin/google-signin",
      "react-native-iap",
      [
        "expo-av",
        {
          "microphonePermission": "Allow Quran Teacher to access your microphone."
        }
      ],
      [
        "expo-build-properties",
        {
          "ios": {
            "useFrameworks": "static"
          }
        }
      ],
      "expo-font",
      "expo-localization",
      [
        "expo-location",
        {
          "locationAlwaysAndWhenInUsePermission": "Allow $(PRODUCT_NAME) to use your location."
        }
      ],
      [
        "@react-native-google-signin/google-signin"
      ],
      [
        "expo-image-picker",
        {
          "photosPermission": "The app accesses your photos to let you share them with your friends."
        }
      ],
      
    ],
    "experiments": {
      "typedRoutes": true
    },
    "extra": {
      "supportsRTL": true,
      "router": {
        "origin": false
      },
      "eas": {
        "projectId": "dbbdfb71-71d5-48e8-96c3-fe31063d3d24"
      }
    },
    "owner": "ranadawar"
  }
}

import "dotenv/config";
export default {
  extra: {
    BASE_API_URL: process.env.BASE_API_URL,
    BASE_API_PUSH_URL: process.env.BASE_API_PUSH_URL,
    API_KEY_NEWSAPI: process.env.API_KEY_NEWSAPI,
    API_KEY_NEWSDATA: process.env.PI_KEY_NEWSDATA,
    eas: {
      projectId: "70297aaf-289f-4e8b-bcb2-fa1b7e866003",
    },
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/adaptive-icon.png",
      backgroundColor: "#ffffff",
    },
    package: "com.newsapp.chimi",
    googleServicesFile: "./google-services.json",
  },
  ios: {
    supportsTablet: true,
    bundleIdentifier: "com.newsapp.chimi",
    config: {
      googleSignIn: {
        reservedClientId: "<YOUR_REVERSED_IOS_CLIENT_ID>",
      },
    },
    plugins: ["@react-native-google-signin/google-signin",  [
      'expo-location',
      {
        isAndroidBackgroundLocationEnabled: ''
      }
    ]],
    googleServicesFile: "./GoogleService-Info.plist",
  },
};

import React, { useEffect, useState } from "react";
import { View, Image, Text, Center } from "native-base";
import { ActivityIndicator, TouchableOpacity } from "react-native";
import { useAppDispatch } from "../state/store";
import { setIsLoggedIn } from "../state/auth-state/authSlice";
import auth from "@react-native-firebase/auth";
import { Ionicons } from "@expo/vector-icons";
import {
  GoogleSignin,
  GoogleSigninButton,
} from "@react-native-google-signin/google-signin";

const Login = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  GoogleSignin.configure({
    webClientId:
      "367988516952-cb1s1hsreiqepmltmmkuj7noep0n2adv.apps.googleusercontent.com",
  });

  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(false);

  // Handle user state changes
  function onAuthStateChanged(user: any) {
    if (user) {
      dispatch(setIsLoggedIn());
      if (initializing) setInitializing(false);
    }
  }

  const onGoogleButtonPress = async () => {
    try {
      setInitializing(true);
      // Check if your device supports Google Play
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });
      // Get the users ID token
      const { idToken } = await GoogleSignin.signIn();

      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      // Sign-in the user with the credential
      const user_sign_in = auth().signInWithCredential(googleCredential);
      console.log("this is user_sign_in");
      user_sign_in
        .then((user) => {
          onAuthStateChanged(user);
          console.log("this is user", user);
        })
        .catch((error) => console.log("this is user error", error));
    } catch (error) {
      console.log("this is onGoogleButtonPress", error);
    }
  };

  if (initializing)
    return (
      <Center flex={1}>
        <ActivityIndicator size="large" color="#3182CE" />;
      </Center>
    );

  return (
    <View justifyContent="center" alignItems="center" bg="white" height="100%">
      <View marginBottom={8}>
        <Image
          source={require("../../assets/news-app-logo.png")}
          alt="Logo"
          resizeMode="contain"
          size="2xl"
        />
      </View>
      <View width="80%">
        <TouchableOpacity
          onPress={() =>
            onGoogleButtonPress().then(() =>
              console.log("Google setup successful")
            )
          }
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "#DB4437",
            borderRadius: 5,
            paddingVertical: 10,
            paddingHorizontal: 15,
            marginBottom: 10,
          }}
        >
          <Ionicons
            name="logo-google"
            size={24}
            color="white"
            style={{ marginRight: 10 }}
          />
          <Text style={{ color: "white", fontSize: 16 }}>
            Login with Google
          </Text>
        </TouchableOpacity>
        {/* <GoogleSigninButton
          style={{ width: 300, height: 65 }}
          onPress={() =>
            onGoogleButtonPress().then(() =>
              console.log("Google Signin Successful")
            )
          }
        /> */}
      </View>
    </View>
  );
};
export default Login;

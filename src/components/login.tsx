import React, { useEffect, useState } from "react";
import { View, Image, Text, Center } from "native-base";
import { ActivityIndicator, TouchableOpacity } from "react-native";
import { useAppDispatch } from "../state/store";
import { setIsLoggedIn } from "../state/auth-state/authSlice";
import auth from "@react-native-firebase/auth";
import { Ionicons } from "@expo/vector-icons";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import * as Location from "expo-location";

const Login = () => {
  const dispatch = useAppDispatch();
  const [location, setLocation] = useState<Location.LocationObject>();
  const [errorMsg, setErrorMsg] = useState<string>();
  const [city, setCity] = useState<string>("");

  useEffect(() => {
    const getLocationAndCity = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);

      // Reverse geocode to get city name
      let address = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
      let city = address[0].city;
      setCity(city as string);
    };

    getLocationAndCity();

    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = `location: ${city}, Bhutan`;
  }

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
      <View width="100%" alignItems="center">
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
          <Text color="white" fontSize="16">
            Login with Google
          </Text>
        </TouchableOpacity>
        <Text color="primary.500" fontSize="14">
          {text}
        </Text>
      </View>
    </View>
  );
};
export default Login;

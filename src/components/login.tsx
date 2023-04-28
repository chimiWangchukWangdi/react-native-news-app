import React, { useState } from "react";
import { View, Button, Image } from "native-base";
import { TextInput, TouchableOpacity, Text } from "react-native";
import { FirebaseError } from "firebase/app";
import { useAppDispatch } from "../state/store";
import { setIsLoggedIn } from "../state/auth-state/authSlice";
import { auth } from "../../firebaseConfig";
import {
  GoogleAuthProvider,
  UserCredential,
  signInWithPopup,
  getRedirectResult,
  signInWithEmailAndPassword,
  signInWithRedirect,
} from "firebase/auth";
import { Ionicons } from "@expo/vector-icons";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const dispatch = useAppDispatch();

  const validateForm = () => {
    let isValid = true;
    setEmailError("");
    setPasswordError("");

    if (!email) {
      setEmailError("Email is required");
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Invalid email format");
      isValid = false;
    }

    if (!password) {
      setPasswordError("Password is required");
      isValid = false;
    }

    return isValid;
  };

  const handleLogin = () => {
    if (validateForm()) {
      signInWithEmailAndPassword(auth, email, password)
        .then(() => {
          debugger
          // Handle successful login
          console.log("User logged in successfully");
          dispatch(setIsLoggedIn());
        })
        .catch((error: FirebaseError) => {
          // Handle login error
          console.log("Login Error", error.message);
        });
    }
  };

  const handleLoginWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    // console.log('this is signInWithRedirect', signInWithRedirect( auth, provider))
    debugger
    // signInWithRedirect(auth, provider); 
    signInWithPopup(auth, provider);
    debugger   
    getRedirectResult(auth)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access Google APIs.
      const credential = GoogleAuthProvider.credentialFromResult(result as UserCredential );
      const token = credential?.accessToken;
  
      // The signed-in user info.
      const user = result?.user;
      // IdP data available using getAdditionalUserInfo(result)
      // ...
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
  };

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
        <TextInput
          style={{
            height: 40,
            borderColor: "gray",
            borderWidth: 1,
            borderRadius: 5,
            marginBottom: 10,
            paddingLeft: 10,
          }}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        {emailError ? (
          <Text style={{ color: "red", fontSize: 12 }}>{emailError}</Text>
        ) : null}
        <TextInput
          style={{
            height: 40,
            borderColor: "gray",
            borderWidth: 1,
            borderRadius: 5,
            marginBottom: 10,
            paddingLeft: 10,
          }}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        {passwordError ? (
          <Text style={{ color: "red", fontSize: 12 }}>{passwordError}</Text>
        ) : null}
        <Button onPress={() => handleLogin()} style={{ marginBottom: 10 }}>
          Login
        </Button>
        <TouchableOpacity
          onPress={() => handleLoginWithGoogle()}
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
      </View>
    </View>
  );
};

export default Login;

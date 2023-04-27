import React, { useState } from "react";
import { View, Button, Image } from "native-base";
import { TextInput, TouchableOpacity, Text } from "react-native";
import { FirebaseError } from "firebase/app";
import { useAppDispatch } from "../state/store";
import { setIsLoggedIn } from "../state/auth-state/authSlice";
import { auth } from "../../firebaseConfig";
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
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
    if (validateForm()) {
    signInWithPopup(auth, provider)
      .then(() => {
        // Handle successful login
        console.log("User logged in successfully with Google");
        dispatch(setIsLoggedIn());
      })
      .catch((error: FirebaseError) => {
        // Handle login error
        console.log("Google Login Error", error.message);
      });}
  };

  const handleLoginWithFacebook = () => {
    // Implement Facebook login logic here
  };

  const handleLoginWithApple = () => {
    // Implement Apple login logic here
  };

  return (
    <View justifyContent="normal" alignItems="center" bg="white">
      <View marginTop={20} marginBottom={0}>
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
        <TouchableOpacity
          onPress={() => handleLoginWithFacebook()}
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "#1877F2",
            borderRadius: 5,
            paddingVertical: 10,
            paddingHorizontal: 15,
            marginBottom: 10,
          }}
        >
          <Ionicons
            name="logo-facebook"
            size={24}
            color="white"
            style={{ marginRight: 10 }}
          />
          <Text style={{ color: "white", fontSize: 16 }}>
            Login with Facebook
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleLoginWithApple()}
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "#000000",
            borderRadius: 5,
            paddingVertical: 10,
            paddingHorizontal: 15,
          }}
        >
          <Ionicons
            name="logo-apple"
            size={24}
            color="white"
            style={{ marginRight: 10 }}
          />
          <Text style={{ color: "white", fontSize: 16 }}>Login with Apple</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;

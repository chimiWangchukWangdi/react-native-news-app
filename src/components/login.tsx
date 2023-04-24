import React, { useState } from "react";
import { View, Button, Alert, Image } from "native-base";
import { TextInput, TouchableOpacity, Text } from "react-native";
import { FirebaseError } from "firebase/app";
import { useAppDispatch } from "../state/store";
import { setIsLoggedIn } from "../state/auth-state/authSlice";
import { auth } from "../../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useAppDispatch();

  const handleLogin = () => {
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
  };

  const handleLoginWithGoogle = () => {
    // Implement Google login logic here
  };

  const handleLoginWithFacebook = () => {
    // Implement Facebook login logic here
  };

  const handleLoginWithApple = () => {
    // Implement Apple login logic here
  };

  return (
    <View
      justifyContent="normal"
      alignItems="center"
      bg="white"
    >
      <View marginTop={20} marginBottom={0}>
        <Image
          source={require("../../assets/news-app.png")}
          alt="Logo"
          size="2xl"
          resizeMode="contain"
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
        <Button
          onPress={() => handleLogin()}
          style={{ marginBottom: 10 }}
        >
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
          <Text style={{ color: "white", fontSize: 16 }}>
            Login with Apple
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;


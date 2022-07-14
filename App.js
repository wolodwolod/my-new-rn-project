// import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

import { NavigationContainer } from "@react-navigation/native";

// import * as Font from "expo-font";
import { AppLoading } from "expo";

import { Provider } from "react-redux";

import { useRoute } from "./router";
import { store } from "./redux/store";

import app from "./firebase/config";
import { getAuth, onAuthStateChanged } from "firebase/auth";

// const loadApplication = async () => {
//   await
//   Font.loadAsync({
//     "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
//   });
// };

export default function App() {
  // const [isReady, setIsReady] = useState(false);
  const [user, setUser] = useState(null);

  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log("user change", user);
      setUser(user);
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      const uid = user.uid;
      // ...
    } else {
      console.log("no user");
      setUser(null);
      // User is signed out
      // ...
    }
  });

  const routing = useRoute(user);

  // if (!isReady) {
  //   return (
  //     <AppLoading
  //       startAsync={loadApplication}
  //       onFinish={() => setIsReady(true)}
  //       onError={console.warn}
  //     />
  //   );
  // }

  return (
    <Provider store={store}>
      <NavigationContainer>{routing}</NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

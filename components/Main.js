import React, { useState, useEffect } from "react";
import {} from "react-native";
import { useSelector, useDispatch } from "react-redux";

import { NavigationContainer } from "@react-navigation/native";
import { useRoute } from "../router";
import app from "../firebase/config";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const auth = getAuth(app);

const Main = () => {
  const [user, setUser] = useState(null);
  const state = useSelector((state) => state);
  console.log("state", state);

  useEffect(() => {
    return () => {};
  }, []);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log("user change", user);
      setUser(user);
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      //   const uid = user.uid;
      // ...
    } else {
      console.log("no user");
      setUser(null);
      // User is signed out
      // ...
    }
  });

  const routing = useRoute(user);

  return <NavigationContainer>{routing}</NavigationContainer>;
};

export default Main;

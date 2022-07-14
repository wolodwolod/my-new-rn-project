import React, { useEffect } from "react";
import {} from "react-native";
import { useSelector, useDispatch } from "react-redux";

import { NavigationContainer } from "@react-navigation/native";
// import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useRoute } from "../router";
// import app from "../firebase/config";
import { authStateCahngeUser } from "../redux/auth/authOperatoins";

// const auth = getAuth(app);

const Main = () => {
  const state = useSelector((state) => state);
  console.log("state", state);

  const { stateChange } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authStateCahngeUser());
  }, []);

  const routing = useRoute(stateChange);

  return <NavigationContainer>{routing}</NavigationContainer>;
};

export default Main;

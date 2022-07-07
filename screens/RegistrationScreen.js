import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";

const initialState = {
  login: "",
  email: "",
  password: "",
};

export default function RegisterScreen() {
  console.log(Platform.OS);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [state, setState] = useState(initialState);

  const [dimensions, setDimensions] = useState(
    Dimensions.get("window").width
  );

  useEffect(() => {
    const onChange = () => {
      const width = Dimensions.get("window").width;
      setDimensions(width);
    };
    const listener = Dimensions.addEventListener("change", onChange);
    return () => {
      listener.remove("change", onChange);
    };
  }, []);

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    console.log(state);
    setState(initialState);
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <ImageBackground
          style={styles.image}
          source={require("../assets/images/photo-bg.jpg")}
        >
          <KeyboardAvoidingView
            // behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <View
              style={{
                ...styles.form,
                // marginBottom: isShowKeyboard ? 20 : 150,
                width: dimensions,
              }}
            >
              <View style={{
                ...styles.header,

                marginTop: isShowKeyboard ? 60 : 60,
                marginBottom: isShowKeyboard ? 30 : 30
              } }>
                <Text style={styles.headerTitle}>Registration</Text>              
              </View>
              <View>
                {/* <Text style={styles.inputTitle}>NICKNAME</Text> */}
                <TextInput
                  style={styles.input}
                  // textAlign={"center"}
                  onFocus={() => setIsShowKeyboard(true)}
                  value={state.login}
                  onChangeText={(value) =>
                    setState((prevState) => ({ ...prevState, login: value }))
                  }
                  placeholder={"Login"}
                  placeholderTextColor={"#BDBDBD"}
                />
              </View>
              <View style={{ marginTop: 20 }}>
                {/* <Text style={styles.inputTitle}>EMAIL ADDRES</Text> */}
                <TextInput
                  style={styles.input}
                  // textAlign={"center"}
                  onFocus={() => setIsShowKeyboard(true)}
                  value={state.email}
                  onChangeText={(value) =>
                    setState((prevState) => ({ ...prevState, email: value }))
                  }
                 placeholder={"Email address"} 
                 placeholderTextColor={"#BDBDBD"}                
                />
              </View>
              <View style={{ marginTop: 20 }}>
                {/* <Text style={styles.inputTitle}>PASSWORD</Text> */}
                <TextInput
                  style={styles.input}
                  // textAlign={"center"}
                  secureTextEntry={true}
                  onFocus={() => setIsShowKeyboard(true)}
                  value={state.password}
                  onChangeText={(value) =>
                    setState((prevState) => ({ ...prevState, password: value }))
                  }
                  placeholder={"Password"}
                  placeholderTextColor={"#BDBDBD"}      
                />
              </View>
              <View style={styles.btnWrapper}>
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.firstBtn}
                onPress={keyboardHide}
              >
                <Text style={styles.firstBtnTitle}>SIGN UP</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.5}
                style={styles.secondBtn}
                onPress={keyboardHide}
              >
                  <Text
                    style={styles.secondBtnTitle}>Have an account? Sign in</Text>
                {/* <Text style={styles.btnTitle}></Text> */}
              </TouchableOpacity>  
              </View>
              
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "flex-end",
    backgroundColor: "#fff",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  input: {
    minHeight: 50,
    marginHorizontal: 16, 
   paddingLeft: 16,
backgroundColor: "#F6F6F6",


// border: 1px solid #E8E8E8;


    borderWidth: 1,
    borderColor: "#E8E8E8",
    height: 40,
    borderRadius: 8,
    fontSize: 16,

    // color: "#BDBDBD",
  },
  form: {
    // flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "#FFFFFF"
    // marginHorizontal: 40,
  },
  // inputTitle: {
  //   color: "#f0f8ff",
  //   marginBottom: 10,
  //   fontSize: 18,
  //   fontFamily: "DMMono-Regular",
  // },
  btnWrapper: {
    marginTop: 25,
    marginBottom: 50
  },
  firstBtn: {
    borderRadius: 100,
    borderWidth: 1,
    minHeight: 50,
    marginTop: 16,
    justifyContent: "center",
    alignItems: "center",   
    marginHorizontal: 16,
    // color: "#FFFFFF",
    
    ...Platform.select({
      ios: {
        backgroundColor: "transparent",
        borderColor: "#f0f8ff",
      },
      android: {
        backgroundColor: "#FF6C00",
        borderColor: "transparent",
      },
    }),
  },
  secondBtn: {
    borderRadius: 100,
    borderWidth: 1,
    minHeight: 50,
    marginTop: 16,
    justifyContent: "center",
    alignItems: "center",   
    marginHorizontal: 16,
    // color: "#1B4371",
    
    ...Platform.select({
      ios: {
        backgroundColor: "transparent",
        borderColor: "#f0f8ff",
      },
      android: {
        backgroundColor: "transparent",
        borderColor: "transparent",
      },
    }),
  },
  firstBtnTitle: {
    color: Platform.OS === "ios" ? "#4169e1" : "#FFFFFF",
    fontSize: 16,
    fontFamily: 'Roboto',
  },
  secondBtnTitle: {
    color: Platform.OS === "ios" ? "#4169e1" : "#1B4371",
    fontSize: 16,
    fontFamily: 'Roboto',
  },
  header: {
    alignItems: "center",
    // marginBottom: 120,
  },
  headerTitle: {
    fontFamily: 'Roboto',
fontStyle: "normal",
fontWeight: "500",
fontSize: 30,
lineHeight: 35,
textAlign: "center",
letterSpacing: 0.01,

color: "#212121"
  },
});
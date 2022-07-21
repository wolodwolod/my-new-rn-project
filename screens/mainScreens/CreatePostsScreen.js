import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  //   Platform,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  RefreshControl,
  Dimensions,
} from "react-native";

import { useIsFocused } from "@react-navigation/native";

import { Camera, CameraType } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import * as Location from "expo-location";
import { manipulateAsync, FlipType, SaveFormat } from "expo-image-manipulator";

import {
  ref,
  uploadBytes,
  // uploadString,
  getDownloadURL,
} from "firebase/storage";
import { storage, db } from "../../firebase/config";
import { collection, addDoc } from "firebase/firestore";
// import { TouchableOpacity } from "react-native-gesture-handler";

const initialState = {
  title: "",
  locality: "",
};

const CreatePostsScreen = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(CameraType.back);

  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState(null);

  const [isShowKeyboard, setIsShowKeyboard] = useState(false);

  const [state, setState] = useState(initialState);

  const [dimensions, setDimensions] = useState(
    Dimensions.get("window").width - 16 * 2
  );

  const [location, setLocation] = useState(null);
  // const [errorMsg, setErrorMsg] = useState(null);

  const { userId, login } = useSelector((state) => state.auth);

  useEffect(() => {
    const onChange = () => {
      const width = Dimensions.get("window").width - 16 * 2;
      setDimensions(width);
    };
    const dimensionsListener = Dimensions.addEventListener("change", onChange);
    return () => {
      dimensionsListener.remove("change", onChange);
    };
  }, []);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();

      setHasPermission(status === "granted");
    })();
  }, []);

  useEffect(() => {
    const showKeyboardListener = Keyboard.addListener("keyboardDidShow", () => {
      setIsShowKeyboard(true);
    });
    const hideKeyboardListener = Keyboard.addListener("keyboardDidHide", () => {
      setIsShowKeyboard(false);
    });

    return () => {
      showKeyboardListener.remove();
      hideKeyboardListener.remove();
    };
  }, []);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  const takePhoto = async () => {
    if (camera) {
      const data = await camera.takePictureAsync();
      const manipResult = await manipulateAsync(data.uri, [], {
        compress: 0.5,
      });
      setPhoto(manipResult.uri);

      console.log("dataTakePhoto", data);
      console.log("photo", data.uri);
      console.log("location", location);

      await MediaLibrary.createAssetAsync(data.uri);
    }
  };

  const uploadPhotoToServer = async () => {
    try {
      const photoResponse = await fetch(photo);

      const photoFile = await photoResponse.blob();
      const uniquePostId = Date.now().toString();

      const postImagesRef = ref(storage, `postImages/${uniquePostId}`);

      const snapshot = await uploadBytes(postImagesRef, photoFile);
      // console.log("snapshot", snapshot);

      const downloadPhoto = await getDownloadURL(postImagesRef);
      console.log("downloadPhoto", downloadPhoto);
      // console.log("photoResponse", photoResponse);
      return downloadPhoto;
    } catch (error) {
      console.log("error", error);
      console.log("error.message", error.message);
    }
  };

  const uploadPostToServer = async () => {
    const photo = await uploadPhotoToServer();
    const createPost = await addDoc(collection(db, "posts"), {
      photo,
      title: state.title,
      location: location.coords,
      userId,
      login,
    });
    // console.log("createPost", createPost);
  };

  const publishPost = () => {
    uploadPostToServer();
    navigation.navigate("Posts");

    setPhoto(null);
    setState(initialState);
  };

  const takePhotoAgain = async () => {
    setPhoto(null);
  };

  const changeType = () => {
    setType(
      type === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  };

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    // console.log(state);
    setState(initialState);
  };

  const isFocused = useIsFocused();

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <ImageBackground
          style={styles.image}
          source={require("../../assets/images/photo-bg.jpg")}
        >
          {!photo && !isShowKeyboard && isFocused && (
            <View style={styles.preview}>
              <Camera
                style={styles.camera}
                type={type}
                ref={(ref) => {
                  setCamera(ref);
                }}
              >
                <TouchableOpacity onPress={takePhoto} style={styles.snapBtn}>
                  <Text style={styles.snap}>SNAP</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={changeType} style={styles.turnBtn}>
                  <Text style={styles.snap}>TURN</Text>
                </TouchableOpacity>
              </Camera>
            </View>
          )}
          {photo && !isShowKeyboard && (
            <View style={styles.takePhotoContainer}>
              <Image
                source={{ uri: photo }}
                style={{ height: 250, width: 250, borderRadius: 10 }}
              />
              <TouchableOpacity
                onPress={takePhotoAgain}
                style={styles.snapAgainBtn}
              >
                <Text style={styles.snap}>SNAP AGAIN</Text>
              </TouchableOpacity>
            </View>
          )}
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
              <View style={{ marginTop: 20 }}>
                {/* <Text style={styles.inputTitle}>EMAIL ADDRES</Text> */}
                <TextInput
                  style={styles.input}
                  // textAlign={"center"}
                  onFocus={() => setIsShowKeyboard(true)}
                  value={state.title}
                  onChangeText={(value) =>
                    setState((prevState) => ({ ...prevState, title: value }))
                  }
                  placeholder={"Title"}
                  placeholderTextColor={"#BDBDBD"}
                />
              </View>
              <View
                style={{ marginTop: 20, marginBottom: isShowKeyboard ? 30 : 0 }}
              >
                {/* <Text style={styles.inputTitle}>PASSWORD</Text> */}
                <TextInput
                  style={styles.input}
                  // textAlign={"center"}
                  secureTextEntry={true}
                  onFocus={() => setIsShowKeyboard(true)}
                  value={state.locality}
                  onChangeText={(value) =>
                    setState((prevState) => ({ ...prevState, locality: value }))
                  }
                  placeholder={"Locality"}
                  placeholderTextColor={"#BDBDBD"}
                />
              </View>
              {!isShowKeyboard && (
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={styles.firstBtn}
                  onPress={publishPost}
                >
                  <Text style={styles.firstBtnTitle}>PUBLISH</Text>
                </TouchableOpacity>
              )}
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "flex-end",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "space-around",
    alignItems: "center",
    borderRadius: 10,
  },
  preview: {
    borderRadius: 10,
  },
  camera: {
    // flex: 1,
    maxHeight: 300,
    width: 225,
    marginTop: 50,
    marginHorizontal: 16,

    alignItems: "center",
    borderWidth: 1,
    borderRadius: 10,

    // borderTopLeftRadius: 25,
  },
  snap: {
    color: "#fff",
    marginHorizontal: 5,
  },
  snapBtn: {
    marginTop: 100,
    borderWidth: 1,
    borderColor: "#ff0000",
    width: 70,
    height: 70,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  snapAgainBtn: {
    // marginTop: 100,
    borderWidth: 1,
    borderColor: "#ff0000",
    // width: 70,
    height: 70,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
  },
  turnBtn: {
    marginTop: 40,
    borderWidth: 1,
    borderColor: "#ff0000",
    width: 70,
    height: 70,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  takePhotoContainer: {
    // position: "absolute",
    marginTop: 50,
    // left: 10,
    borderColor: "#fff",
    borderWidth: 1,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "flex-end",
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
    backgroundColor: "#FFFFFF",
    marginHorizontal: 16,
    borderRadius: 10,
    // borderTopLeftRadius: 25,
    // borderTopRightRadius: 25,
    // marginHorizontal: 40,
    // position: "relative",
    // zIndex: 999999,
  },
  firstBtn: {
    borderRadius: 100,
    borderWidth: 1,
    minHeight: 50,
    marginTop: 16,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 16,
    marginTop: 25,
    marginBottom: 50,
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
  firstBtnTitle: {
    color: Platform.OS === "ios" ? "#4169e1" : "#FFFFFF",
    fontSize: 16,
    fontFamily: "Roboto",
  },
});

export default CreatePostsScreen;

import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  //   ImageBackground,
  //   TextInput,
  TouchableOpacity,
  //   Platform,
  //   KeyboardAvoidingView,
  //   Keyboard,
  //   TouchableWithoutFeedback,
  // Dimensions,
} from "react-native";

import { Camera, CameraType } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
// import { TouchableOpacity } from "react-native-gesture-handler";

const CreatePostsScreen = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(CameraType.back);

  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();

      setHasPermission(status === "granted");
    })();
  }, []);

  const takePhoto = async () => {
    if (camera) {
      const data = await camera.takePictureAsync();
      setPhoto(data.uri);

      console.log("photo", data);
      console.log("photo", data.uri);

      await MediaLibrary.createAssetAsync(data.uri);
    }
  };
  const changeType = () => {
    setType(
      type === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  };

  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        type={type}
        ref={(ref) => {
          setCamera(ref);
        }}
      >
        {photo && (
          <View style={styles.takePhotoContainer}>
            <Image
              source={{ uri: photo }}
              style={{ height: 200, width: 200 }}
            />
          </View>
        )}
        <TouchableOpacity onPress={takePhoto} style={styles.snapBtn}>
          <Text style={styles.snap}>SNAP</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={changeType} style={styles.turnBtn}>
          <Text style={styles.snap}>TURN</Text>
        </TouchableOpacity>
      </Camera>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    height: 300,
    marginTop: 50,
    alignItems: "center",
  },
  snap: {
    color: "#fff",
  },
  snapBtn: {
    marginTop: 100,
    borderWidth: 1,
    borderColor: "#ff0000",
    width: 70,
    height: 70,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  turnBtn: {
    marginTop: 40,
    borderWidth: 1,
    borderColor: "#ff0000",
    width: 70,
    height: 70,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  takePhotoContainer: {
    position: "absolute",
    top: 50,
    left: 10,
    borderColor: "#fff",
    borderWidth: 1,
  },
});

export default CreatePostsScreen;

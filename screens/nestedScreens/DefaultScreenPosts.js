import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Button,
  Dimensions,
} from "react-native";

import { db } from "../../firebase/config";
import { collection, getDocs, onSnapshot } from "firebase/firestore";

const DefaultScreenPosts = ({ route, navigation }) => {
  const [posts, setPosts] = useState([]);
  const [dimensions, setDimensions] = useState(
    Dimensions.get("window").width - 16 * 2
  );

  // console.log("route.params", route.params);

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
    getAllPosts();
  }, []);

  const getAllPosts = async () => {
    onSnapshot(collection(db, "posts"), (data) => {
      setPosts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });

    // const allPosts = querySnapshot.docs.map((doc) => ({
    //   ...doc.data(),
    //   id: doc.id,
  };
  // setPosts(allPosts);
  // console.log("allPosts", allPosts);

  return (
    <View style={styles.container}>
      <FlatList
        style={{
          marginTop: 20,
        }}
        data={posts}
        keyExtractor={(item, indx) => indx.toString()}
        renderItem={({ item }) => (
          <View
            style={{
              marginTop: 10,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              source={{ uri: item.photo }}
              style={{
                width: dimensions,
                height: dimensions / 1.5,
              }}
            />
            <View>
              <Text>{item.title}</Text>
            </View>
            <View>
              <Button
                title="go to map"
                onPress={() =>
                  navigation.navigate("Map", {
                    location: item.location,
                    title: item.title,
                  })
                }
              />
              <Button
                title="go to Comments"
                onPress={() =>
                  navigation.navigate("Comments", { postId: item.id })
                }
              />
            </View>
          </View>
        )}
      />
      {/* <Button
        style={{ marginBottom: 10 }}
        title="go to Map"
        onPress={() => navigation.navigate("Map")}
      />
      <Button
        style={styles.btn}
        title="go to Comments"
        onPress={() => navigation.navigate("Comments")}
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 16,
  },
  btn: {
    marginTop: 10,
  },
});

export default DefaultScreenPosts;

// await navigation.navigate("Posts", {
//   screen: "DefaultScreen",
//   params: { photo },
// });

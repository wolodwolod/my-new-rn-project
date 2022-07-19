import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Button, FlatList, Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  collection,
  addDoc,
  doc,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { authSignOutUser } from "../../redux/auth/authOperatoins";
import { db } from "../../firebase/config";
// import { signOut } from "firebase/auth";
// import { auth } from "../../firebase/config";
// const auth = getAuth(app);

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const [userPosts, setUserPosts] = useState([]);
  const { userId } = useSelector((state) => state.auth);

  useEffect(() => {
    getUserPosts();
  }, []);

  const getUserPosts = async () => {
    const q = query(collection(db, "posts"), where("userId", "==", userId));
    // const postRef = doc(db, "posts");

    onSnapshot(q, (data) => {
      setUserPosts(data.docs.map((doc) => ({ ...doc.data() })));
    });

    // await db
    //   .firestore()
    //   .collection("posts")
    //   .where("userId", "==", userId)
    //   .onSnapshot((data) =>
    //     setUserPosts(data.docs.map((doc) => ({ ...doc.data() })))
    //   );
  };

  const signOut = () => {
    dispatch(authSignOutUser());
  };

  return (
    <View style={styles.container}>
      <Button style={styles.btn} title="signOut" onPress={signOut} />
      <View>
        <View style={{ padding: 10 }}>
          <Text style={{ marginLeft: 10, fontSize: 20, fontWeight: "500" }}>
            MY POSTS
          </Text>
        </View>
        <FlatList
          data={userPosts}
          keyExtractor={(item, indx) => indx.toString()}
          renderItem={({ item }) => (
            <View
              style={{
                marginBottom: 20,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                source={{ uri: item.photo }}
                style={{ width: 350, height: 200 }}
              />
            </View>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    marginTop: 25,
  },
  btn: {
    marginTop: 0,
  },
});

export default ProfileScreen;

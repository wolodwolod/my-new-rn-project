import app from "../../firebase/config";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { authSlice } from "./authReducer";

const auth = getAuth(app);

export const authSignUpUser =
  ({ login, email, password }) =>
  async (dispatch, getState) => {
    console.log("email, password, login", email, password);
    try {
      await createUserWithEmailAndPassword(auth, email, password);

      await updateProfile(auth.currentUser, {
        displayName: login,
      });

      const { displayName, uid } = auth.currentUser;

      // console.log("user", user);
      // console.log("displayName", user.displayName);
      // console.log("uid", user.uid);

      const userUpdateProfile = {
        login: displayName,
        userId: uid,
      };

      dispatch(authSlice.actions.updateUserProfile(userUpdateProfile));
    } catch (error) {
      console.log("error", error);
      console.log("error.message", error.message);
    }
  };

export const authSignInUser =
  ({ email, password }) =>
  async (dispatch, getState) => {
    console.log("email, password", email, password);
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);

      console.log("user", user);
    } catch (error) {
      console.log("error", error);
      console.log("error.code", error.code);
      console.log("error.message", error.message);
    }
  };

export const authSignOutUser = () => async (dispatch, getSatte) => {};

export const authStateCahngeUser = () => async (dispatch, getState) => {};

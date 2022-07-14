import app from "../../firebase/config";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

export const authSignUpUser =
  ({ login, email, password }) =>
  async (dispatch, getState) => {
    console.log("email, password, login", email, password);
    try {
      const auth = getAuth(app);
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log("user", user);
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
      const auth = getAuth(app);
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log("user", user);
    } catch (error) {
      console.log("error", error);
      console.log("error.code", error.code);
      console.log("error.message", error.message);
    }
  };

export const authSignOutUser = () => async (dispatch, getSatte) => {};

import app from "../../firebase/config";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export const authSignUpUser =
  ({ login, email, password }) =>
  async (dispatch, getSatte) => {
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

export const authSignInUser = () => async (dispatch, getSatte) => {};

export const authSignOutUser = () => async (dispatch, getSatte) => {};

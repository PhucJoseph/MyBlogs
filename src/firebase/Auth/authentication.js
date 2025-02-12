import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  signInAnonymously,
} from "firebase/auth";
import { auth } from "../firebase";

export const signUp = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log("User signed up:", userCredential.user);
  } catch (error) {
    console.error("Sign up error:", error.message);
  }
};

export const signIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const token = await userCredential.user.getIdToken();
    localStorage.setItem("token", token);
    return {success: true, message: "Đăng nhập thành công ヾ(≧▽≦*)o "}
  } catch (error) {
    return {success: false, message: "Đăng nhập thất bại `(*>﹏<*)′ "}
  }
};

export const loginAsGuest = async () => {
  try {
    await signInAnonymously(auth);
    return {success: true, message: "Đăng nhập thành công ヾ(≧▽≦*)o "}
  } catch (error) {
    return {success: false, message: "Đăng nhập thất bại `(*>﹏<*)′ "}
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
    console.log("User signed out");
    localStorage.removeItem("token");
  } catch (error) {
    console.error("Logout error:", error.message);
  }
};

export function getCurrentUser() {
  const user = onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log("User is logged in:", user);
    } else {
      console.log("No user logged in.");
    }
  });

  return user;
}

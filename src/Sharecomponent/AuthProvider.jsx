import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import PropTypes from "prop-types";
import { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import auth from "../Firebase/firebase.init";
import useAxiosPublic from "../useHooks/useAxiosPublic";

export const Context = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [enrollPrice, setEnrollPrice] = useState(0);
  // dark theme togol
  const [togol, setTogol] = useState(
    localStorage.getItem("EduHubTheme") === "true"
  );

  const axiosPublic = useAxiosPublic();

  const googleProvider = new GoogleAuthProvider();

  // create user with email and password
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  //login with gmail & password
  const loginUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // login with google
  const googleLogin = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  //update user profile
  const updateUserProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  // logout
  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  // on auth state change
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      // console.log("current user", currentUser);
      if (currentUser) {
        // get token and store client
        const userInfo = { email: currentUser.email };
        axiosPublic.post("/jwt", userInfo).then((res) => {
          if (res.data.token) {
            localStorage.setItem("accessToken", res.data.token);
            setLoading(false);
          }
        });
      } else {
        // remove token (if token store in the client side: Local storage, caching, in memory)
        localStorage.removeItem("accessToken");
        setLoading(false);
      }
    });
    return () => {
      return unsubscribe();
    };
  }, [axiosPublic]);

  const authInfo = {
    user,
    loading,
    togol,
    enrollPrice,
    setEnrollPrice,
    setTogol,
    setUser,
    setLoading,
    googleLogin,
    loginUser,
    createUser,
    updateUserProfile,
    logOut,
  }; // Replace with the actual context data you want to provide

  return <Context.Provider value={authInfo}>{children}</Context.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired, // Changed to accept any valid React node
};

export default AuthProvider;

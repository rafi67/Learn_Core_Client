import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { GoogleAuthProvider } from "firebase/auth";
import { auth } from "../firebase/firebase.config";
import useAxiosPublic from "../hooks/useAxiosPublic";
import AuthContext from "../context/authContext";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [paginatedData, setPaginatedData] = useState(null);
  const [searchClass, setSearchClass] = useState("");
  const [selected, setSelected] = useState(0);
  const { post } = useAxiosPublic();

  const provider = new GoogleAuthProvider();

  const createUser = (email, password) => {
    setUser(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signInUser = (email, password) => {
    setUser(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, provider);
  };

  const updateUserProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  useEffect(() => {
    const unSubscribe = () => {
      onAuthStateChanged(auth, async (currentUser) => {
        if (currentUser) {
          const userInfo = {
            email: currentUser.email,
          };
          await post("/jwt", userInfo).then((res) => {
            if (res.data.token) {
              localStorage.setItem("access-token", res.data.token);
            }
          });
        } else {
          localStorage.removeItem("access-token");
        }
        setUser(currentUser);
        setLoading(false);
      });
    };
    return () => {
      unSubscribe();
    };
  });

  const authInfo = {
    createUser,
    user,
    loading,
    paginatedData,
    searchClass,
    selected,
    setSelected,
    setSearchClass,
    setPaginatedData,
    setLoading,
    signInUser,
    signInWithGoogle,
    updateUserProfile,
    logOut,
  };

  return <AuthContext value={authInfo}>{children}</AuthContext>;
};

export default AuthProvider;

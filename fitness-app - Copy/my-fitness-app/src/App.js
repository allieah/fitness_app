import "./App.css";
import "./style.css";
import "./pp1.css";
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  sendEmailVerification,
} from "firebase/auth";
import SignIn from "./Signin";
import Firstpage from "./firstpage";
import SignUp from "./SignUp";
import Mainpage from "./mainpage";

import { initializeApp } from "firebase/app";
import { useNavigate } from "react-router-dom";
import Workoutpage from "./workoutpage";

import ResetPassword from "./reset";
import ExerciseChart from "./charts";
import Profile from "./profilr";
import UserNameUpdate from "./userNameUpdate";
// use createRoot() here

const firebaseConfig = {
  apiKey: "AIzaSyAGXetBSdnw6vwg6YftJmhfYombC1q5ltA",
  authDomain: "fitness-63f57.firebaseapp.com",
  databaseURL: "https://fitness-63f57-default-rtdb.firebaseio.com",
  projectId: "fitness-63f57",
  storageBucket: "fitness-63f57.appspot.com",
  messagingSenderId: "691218369167",
  appId: "1:691218369167:web:afa8abda4abbb40d737efa",
};

const app = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(app);
const provider = new GoogleAuthProvider();
export { firebaseAuth, provider };

function App() {
  let navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  //for signup

  let registrationHandler = (email, password) => {
    const auth = getAuth(app);

    return createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(userCredential);

        setErrorMessage("Successful log in");
        return sendEmailVerification(auth.currentUser).then(() => {
          console.log("email sent");
          alert("email sent");
          return new Promise((resolve, reject) => {
            const interval = setInterval(() => {
              user
                ?.reload()
                .then(() => {
                  if (user?.emailVerified) {
                    clearInterval(interval);
                    resolve(true);
                  }
                })
                .catch((err) => {
                  console.log(err);
                  reject(err);
                });
            }, 1000);
          });
        });
      })
      .catch((error) => {
        console.log(error);
        const errorMessage = error.message;
        console.log(errorMessage);
        setErrorMessage(errorMessage);
        throw new Error(errorMessage);
      });
  };

  //for login page

  let loginHandler = (event, email, password) => {
    event.preventDefault();
    const auth = getAuth(app);
    return signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        return true; // return true if login is successful
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
        setErrorMessage(errorMessage);
        return false; // return false if login fails
      });
  };

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Firstpage />} />
        <Route path="/LogIn" element={<SignIn login={loginHandler} />} />
        <Route
          path="/SignUp"
          element={
            <SignUp
              message={errorMessage}
              register={registrationHandler}
              errorMessage={errorMessage}
            />
          }
        />
        <Route path="/userNameUpdate" element={<UserNameUpdate />} />
        <Route path="/charts" element={<ExerciseChart />} />
        <Route path="/profilr" element={<Profile />} />
        <Route path="/reset" element={<ResetPassword />} />
        <Route path="/mainpage" element={<Mainpage />} />
        <Route path="/workputpage" element={<Workoutpage />} />
      </Routes>
    </div>
  );
}

export default App;

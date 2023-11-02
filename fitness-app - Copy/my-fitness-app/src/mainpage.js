import React, { useEffect, useState, useLayoutEffect } from "react";
import { Link } from "react-router-dom";
import graph from "./img/graph.png";
import Homeicon from "./img/home.png";
import watch from "./img/watch.png";
import dumbell from "./img/exercise.png";
import logout from "./img/logout.png";
import Profile from "./profilr";
import firebase from "./firebase";
import { useNavigate } from "react-router-dom";
import "firebase/compat/auth";
import { Dateauto } from "./data";
import { Greetingauto } from "./data";
import { getDatabase, ref, get } from "firebase/database";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Dropdown from "./dropdown";

function Mainpage() {
  const d = new Date();
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const currentDay = days[d.getDay()];
  const [signedIn, setSignedIn] = useState(false);
  const [greeting, setGreeting] = useState("");

  const [stepsCounter, setstepsCounter] = useState(0);
  const [squatsCounter, setsquatsCounter] = useState(0);
  const [bicepsCounter, setbicepsCounter] = useState(0);

  const [selectedValue, setSelectedValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), (user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  console.log("Current user:", currentUser);
  const db = getDatabase();

  // Check if user is signed in before accessing their uid
  useEffect(() => {
    if (!currentUser) {
      return;
    }

    const fetchData = async () => {
      const path = `${currentUser.uid}/${currentDay.toLowerCase()}/exercise`;
      try {
        const snapshot = await get(ref(db, path));
        if (snapshot.exists()) {
          const data = snapshot.val();
          setstepsCounter(data.stepsCounter);
          setbicepsCounter(data.bicepsCounter);
          setsquatsCounter(data.squatsCounter);
          console.log(data);
          console.log(data.stepsCounter);
          console.log(data.bicepsCounter);
          console.log(data.squatsCounter);
        } else {
          console.log("No data available");
        }
      } catch (error) {
        console.error(error);
        alert("Failed to get exercise data!");
      }
    };

    fetchData();
  }, [currentUser]);

  const database = firebase.database();
  useEffect(() => {
    const updateFirebase = async () => {
      const stepsElement = document.querySelector("#stepsCounter");
      console.log(stepsElement);
      const bicepsElement = document.querySelector("#bicepsCounter");
      const squatsElement = document.querySelector("#squatsCounter");
      console.log(squatsElement);

      if (currentUser && stepsCounter !== null && stepsElement !== null) {
        const innerHTMLValue = stepsElement.textContent;
        console.log("steps:", innerHTMLValue);
        database.ref(`${currentUser.uid}/steps`).set(innerHTMLValue);
      }

      if (currentUser && bicepsCounter !== null && bicepsElement !== null) {
        const innerHTMLValue = bicepsElement.textContent;
        console.log("biceps:", innerHTMLValue);
        database.ref(`${currentUser.uid}/biceps`).set(innerHTMLValue);
      }
      if (currentUser && squatsCounter !== null && squatsElement !== null) {
        const innerHTMLValue = squatsElement.textContent;
        console.log("squats:", innerHTMLValue);
        database.ref(`${currentUser.uid}/squats`).set(innerHTMLValue);
      }
    };

    updateFirebase();
  }, [currentUser, stepsCounter, squatsCounter, bicepsCounter]);

  //signout
  const handleSignOut = () => {
    const user = firebase.auth().currentUser;
    if (user) {
      firebase
        .auth()
        .signOut()
        .then(() => {
          firebase
            .database()
            .ref("users/" + user.uid)
            .update({
              signedIn: false, // Set the signedIn property to false
            });
          setSignedIn(false); // Update the state in your component
          navigate("/"); // Redirect the user to the login page after signing out
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      console.log("No user signed in.");
    }
  };

  let navigate = useNavigate();
  const [clicked, setClicked] = useState(false);

  function handleClick() {
    setClicked(true);
    alert("Navigate To Workout Page To use This Feature!");
  }

  return (
    <div>
      <div className="header">
        <img src={logout} height="28" width="28" onClick={handleSignOut} />
        <Dateauto />
        <div></div>
      </div>

      <div id="greeting">
        <Greetingauto />
        <div>
          <Dropdown />
        </div>
      </div>

      <div id="content">
        <div className="box">
          <p className="title">Steps</p>
          <p className="count" id="stepsCounter">
            {stepsCounter}
          </p>
        </div>

        <div className="box">
          <p className="title">Biceps Curls</p>
          <p className="count" id="bicepsCounter">
            {bicepsCounter}
          </p>
        </div>

        <div className="box">
          <p className="title">Squats</p>
          <p className="count " id="squatsCounter">
            {squatsCounter}
          </p>
        </div>

        <div className="box">
          {/* <p className="title"></p>
          <p className="count">0</p> */}
        </div>
      </div>

      <div className="footer">
        <nav className="nav">
          <div className="home footercontent">
            <Link to="/mainpage">
              {" "}
              <img src={Homeicon} height="30" width="30" />
            </Link>
          </div>

          <div className="startworkout footercontent">
            <Link to="/workputpage">
              {" "}
              <img src={dumbell} height="40" width="40" />
            </Link>
          </div>
          <div className=" footercontent">
            <Link to="/charts">
              <img src={graph} height="30" width="30" />
            </Link>
          </div>

          <div className="connect footercontent">
            <img src={watch} height="30" width="30" />
          </div>
        </nav>
      </div>
    </div>
  );
}

export default Mainpage;

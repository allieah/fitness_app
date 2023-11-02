import Chart from "chart.js/auto";
import React, { useState, useEffect } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import firebase from "./firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Link } from "react-router-dom";
import graph from "./img/graph.png";
import Homeicon from "./img/home.png";
import watch from "./img/watch.png";
import dumbell from "./img/exercise.png";

function ExerciseChart() {
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

  const [exerciseData, setExerciseData] = useState(null);
  const db = getDatabase();

  const days = [
    {
      name: "Sunday",
      path: `${currentUser?.uid}/sunday/exercise`,
    },
    {
      name: "Monday",
      path: `${currentUser?.uid}/monday/exercise`,
    },
    {
      name: "Tuesday",
      path: `${currentUser?.uid}/tuesday/exercise`,
    },
    {
      name: "Wednesday",
      path: `${currentUser?.uid}/wednesday/exercise`,
    },
    {
      name: "Thursday",
      path: `${currentUser?.uid}/thursday/exercise`,
    },
    {
      name: "Friday",
      path: `${currentUser?.uid}/friday/exercise`,
    },
    {
      name: "Saturday",
      path: `${currentUser?.uid}/saturday/exercise`,
    },
  ];

  const [selectedDay, setSelectedDay] = useState(days[0]);

  useEffect(() => {
    if (currentUser) {
      const exerciseRef = ref(db, selectedDay.path);
      onValue(exerciseRef, (snapshot) => {
        setExerciseData(snapshot.val());
      });
    }
  }, [db, selectedDay, currentUser]);

  // useEffect(() => {
  //   if (exerciseData) {
  //     const ctx = document.getElementById("exercise-chart");
  //     const chart = new Chart(ctx, {
  //       type: "bar",
  //       data: {
  //         labels: ["Steps", "Pushups"],
  //         datasets: [
  //           {
  //             label: "Exercise Data",
  //             data: [
  //               exerciseData?.stepsCounter || 0,
  //               exerciseData?.pushupsCounter || 0,
  //             ],
  //             backgroundColor: [
  //               "rgba(255, 99, 132, 0.2)",
  //               "rgba(54, 162, 235, 0.2)",
  //             ],
  //             borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
  //             borderWidth: 1,
  //           },
  //         ],
  //       },
  //       options: {
  //         scales: {
  //           y: {
  //             beginAtZero: true,
  //           },
  //         },
  //       },
  //     });
  //   }
  // }, [exerciseData]);

  useEffect(() => {
    let chart = null;

    if (exerciseData) {
      const ctx = document.getElementById("exercise-chart");

      if (Chart.instances.length > 0) {
        // Destroy any existing charts
        chart = Chart.instances[0];
        chart.destroy();
      }

      chart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: ["Steps", "Pushups"],
          datasets: [
            {
              label: "Exercise Data",
              data: [
                exerciseData?.stepsCounter || 0,
                exerciseData?.pushupsCounter || 0,
              ],
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
              ],
              borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }

    return () => {
      // Destroy chart when component unmounts
      if (chart) {
        chart.destroy();
      }
    };
  }, [exerciseData]);

  return (
    <div>
      <div className="charts-container">
        <canvas
          id="exercise-chart"
          className="chart"
          width="290"
          height="300"
        ></canvas>

        <div>
          <select
            className="select-container"
            onChange={(event) =>
              setSelectedDay(
                days.find((day) => day.name === event.target.value)
              )
            }
          >
            {days.map((day) => (
              <option key={day.name} value={day.name}>
                {day.name}
              </option>
            ))}
          </select>
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
            <img
              src={graph}
              height="30"
              width="30"
              className="sign_out"
              // onClick={handleSignOut}
            />
          </div>
          <div className="connect footercontent">
            <img src={watch} height="30" width="30" />
          </div>
        </nav>
      </div>
    </div>
  );
}

export default ExerciseChart;

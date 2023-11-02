import React from "react";
import { useNavigate } from "react-router-dom";
import background from "./img/background.png";
function Firstpage() {
  let navigate = useNavigate();

  return (
    <div
      className="flex-container"
      style={{
        backgroundImage: `url(${background})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",

        height: "900px",
      }}
    >
      <button
        className="sign_up"
        onClick={() => {
          navigate("/SignUp");
        }}
      >
        Sign Up
      </button>
      <button
        className="sign_in"
        onClick={() => {
          navigate("/LogIn");
        }}
      >
        Log In
      </button>
    </div>
  );
}

export default Firstpage;

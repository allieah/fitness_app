import React from "react";
import { useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";
import { firebaseAuth, provider } from "./App.js";
import { signInWithPopup } from "firebase/auth";
import { ic_person_outline_outline } from "react-icons-kit/md/ic_person_outline_outline";
import { Icon } from "react-icons-kit";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import { eye } from "react-icons-kit/feather/eye";
import { ic_lock_outline } from "react-icons-kit/md/ic_lock_outline";
import { ic_mail_outline } from "react-icons-kit/md/ic_mail_outline";

import { useEffect, useState } from "react";
//second pagee
function LogIn(props) {
  let navigate = useNavigate();

  //password hide or unhide
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(eyeOff);
  const handleToggle = () => {
    if (type === "password") {
      setIcon(eye);
      setType("text");
    } else {
      setIcon(eyeOff);
      setType("password");
    }
  };

  // usual sign in
  const handleloginSubmit = async (event) => {
    event.preventDefault();
    const email = event.target.querySelector(".user_email").value;
    const password = event.target.querySelector(".user_password").value;
    const loginSuccess = await props.login(event, email, password);

    if (loginSuccess) {
      navigate("/mainpage");
    } else {
      console.log("Login failed");
      alert("wrong password or email");
    }
  };

  // google sign in
  const SignInWithGoogle = () => {
    signInWithPopup(firebaseAuth, provider)
      .then((result) => {
        const name = result.user.displayName;
        const email = result.user.email;
        console.log(result);
        localStorage.setItem("name", name);
        localStorage.setItem("email", email);

        navigate("/mainpage"); // navigate to MainPage component
      })
      .catch((error) => {
        console.log(error);
        alert("Error signing in with Google"); // display error message
      });
  };
  return (
    <div className="container">
      <div className="welcome_message">
        <span className="hey">Hey there</span>
        <div className="create">Welcome Back</div>
      </div>
      <div className="middle">
        <form onSubmit={handleloginSubmit}>
          <div className="email name">
            <Icon icon={ic_mail_outline} />
            <input
              type="email"
              className="user_email input_field"
              placeholder="   Email"
            />
          </div>
          <div className="password name">
            <Icon icon={ic_lock_outline} />
            <input
              type={type}
              className="user_password input_field pass"
              placeholder="   Password"
            />
            <span onClick={handleToggle} style={{ color: "grey" }}>
              <Icon icon={icon} size={20} />
            </span>
          </div>

          <Link to="/reset" className="forgot_password">
            Forgot Password
          </Link>

          <button className="sign" type="submit">
            Sign In
          </button>
        </form>
      </div>
      <div className="hr-sect">OR</div>
      <div className="bottom">
        <button onClick={SignInWithGoogle} className="login-with-google-btn">
          Sign in with Google
        </button>
        <p className="acct">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}

export default LogIn;

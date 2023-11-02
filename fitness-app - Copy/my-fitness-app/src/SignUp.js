import React, { useState } from "react";
import Mainpage from "./mainpage.js";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { signInWithPopup, updateProfile } from "firebase/auth";
import { provider } from "./App.js";
import { ic_person_outline_outline } from "react-icons-kit/md/ic_person_outline_outline";
import { Icon } from "react-icons-kit";
import { ic_lock_outline } from "react-icons-kit/md/ic_lock_outline";
import { ic_mail_outline } from "react-icons-kit/md/ic_mail_outline";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import { eye } from "react-icons-kit/feather/eye";
import { firebaseAuth } from "./App.js";

function SignUp(props) {
  let navigate = useNavigate();
  // const [currentUser, setCurrentUser] = useState("");
  const handleSubmit = async (event) => {
    event.preventDefault();
    const name = event.target.querySelector(".user_name").value;
    const email = event.target.querySelector(".user_email").value;
    const password = event.target.querySelector(".user_password").value;

    try {
      const signupSuccess = await props.register(email, password);
      console.log("signup success", signupSuccess);

      if (signupSuccess) {
        const user = firebaseAuth.currentUser;
        await updateProfile(user, { displayName: name });
        navigate("/mainpage");
      } else {
        console.log("Registration failed");
      }
    } catch (error) {
      console.log("Registration failed with error:", error.message);
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
  return (
    <div className="container">
      <div className="welcome_message">
        <div className="hey">Hey there</div>

        <div className="create">Create an Account</div>
      </div>
      <div className="middle">
        <form onSubmit={handleSubmit}>
          <div className="name">
            <Icon icon={ic_person_outline_outline} />
            <input
              type="text"
              className="user_name input_field"
              placeholder="Full Name"
            />
          </div>
          <div className="email name">
            <Icon icon={ic_mail_outline} />
            <input
              type="email"
              className="user_email input_field"
              placeholder="Email"
            />
          </div>
          <div className="password name">
            <Icon icon={ic_lock_outline} />
            <input
              type={type}
              className="user_password input_field pass"
              placeholder="Password"
            />
            <span onClick={handleToggle} style={{ color: "grey" }}>
              <Icon icon={icon} size={20} />
            </span>
          </div>
          <button className="sign" type="submit">
            Sign Up
          </button>
        </form>
      </div>
      <div className="hr-sect">OR</div>
      <div className="bottom">
        <button onClick={SignInWithGoogle} className="login-with-google-btn">
          Sign in with Google
        </button>
        <p className="acct">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default SignUp;

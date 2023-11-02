import React, { useEffect, useState } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { Link } from "react-router-dom";
function ResetPassword() {
  const [email, setEmail] = useState("");
  const auth = getAuth();

  const triggerResetEmail = async () => {
    await sendPasswordResetEmail(auth, email);
    console.log("Password reset email sent");
  };

  return (
    <>
      <div className="top">
        <div className="purple_circlep2"></div>
        <div className="green_shadep2"></div>
        <div className="black_circlep2"></div>{" "}
      </div>
      <div className="reset">
        <input
          className="resetEmailInput"
          placeholder="Enter email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          requirednter
        />
        <br />
        <button className="resetBtn" type="button" onClick={triggerResetEmail}>
          Reset password
        </button>

        <Link to="/login" className="forgot_password">
          Back to Log in page
        </Link>
      </div>
    </>
  );
}

export default ResetPassword;

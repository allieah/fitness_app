import React from "react";
import { firebaseAuth } from "./App";
import { updateProfile } from "firebase/auth";

export default function UserNameUpdate() {
  const update = async () => {
    // event.preventDefault();

    const name = document.querySelector(".user_name").value;
    console.log(name);

    try {
      const user = firebaseAuth.currentUser;
      await updateProfile(user, { displayName: name });
      console.log("Update successful");
    } catch (error) {
      console.log("Update failed with error:", error.message);
    }
  };

  return (
    <div style={{ color: "white" }}>
      userNameUpdate
      <div>
        <div className="name">
          <input
            type="text"
            className="user_name input_field"
            placeholder="Full Name"
          />
        </div>
        <button className="userName" type="button" onClick={update}>
          update
        </button>
      </div>
    </div>
  );
}

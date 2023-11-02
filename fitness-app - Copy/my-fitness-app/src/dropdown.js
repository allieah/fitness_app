import React, { useState, useEffect } from "react";
import { useAuth, uploadFile } from "./firebase";
import { useNavigate } from "react-router-dom";

function Dropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");

  const navigate = useNavigate();
  const handleSelectionChange = (event) => {
    const value = event.target.value;
    setSelectedValue(value);
    console.log(value);
    if (value === "option1") {
      console.log("working");
      navigate("/profilr");
    } else if (value === "option2") {
      console.log("working");
      navigate("/UserNameUpdate");
    } else if (value === "option3") {
      var appUrl = "spotify:playlist:37i9dQZF1DX76t638V6CA8";
      var webUrl = "https://open.spotify.com/playlist/37i9dQZF1DX76t638V6CA8";

      // Check if user is on a mobile device
      if (
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        )
      ) {
        // Check if Spotify app is installed
        if (navigator.userAgent.match(/(spotify)/i)) {
          window.location.replace(appUrl);
        } else {
          window.open(webUrl, "_blank");
        }
      } else {
        window.open(webUrl, "_blank");
      }
    }
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const currentUser = useAuth();
  // const [photo, setPhoto] = useState(null);
  // const [loading, setLoading] = useState(false);
  const [photoURL, setPhotoURL] = useState(
    "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
  );
  const [isInputVisible, setIsInputVisible] = useState(false);

  // function handleChange(e) {
  //   if (e.target.files[0]) {
  //     setPhoto(e.target.files[0]);
  //   }
  // }

  // function handleClick() {
  //   uploadFile(photo, currentUser, setLoading);
  //   setIsInputVisible(false);
  // }

  useEffect(() => {
    if (currentUser?.photoURL) {
      setPhotoURL(currentUser.photoURL);
    }
  }, [currentUser]);

  return (
    <div>
      <div
        style={{ width: "40px", position: "relative" }}
        onClick={toggleDropdown}
      >
        <img
          src={photoURL}
          className="avatar"
          onClick={() => setIsInputVisible(true)}
        />
      </div>
      {isOpen && (
        <div style={{ position: "absolute", marginLeft: "-100px" }}>
          <select
            id="dropdown"
            value={selectedValue}
            onChange={handleSelectionChange}
          >
            <option value="">Choose an option</option>
            <option value="option1">Upload Picture</option>
            <option value="option2">Edit Username</option>
            <option value="option3">Workout playlist</option>
          </select>
        </div>
      )}
    </div>
  );
}

export default Dropdown;

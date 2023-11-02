import { useEffect, useState } from "react";
import { useAuth, uploadFile } from "./firebase";
import { Link } from "react-router-dom";
import Dropdown from "./dropdown";

export default function Profile() {
  const currentUser = useAuth();
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [photoURL, setPhotoURL] = useState(
    "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
  );
  const [isInputVisible, setIsInputVisible] = useState(false);

  function handleChange(e) {
    if (e.target.files[0]) {
      setPhoto(e.target.files[0]);
    }
    var name = document.getElementById("file");
    alert("Selected file: " + name.files.item(0).name);
  }

  function handleClick() {
    uploadFile(photo, currentUser, setLoading);
    setIsInputVisible(false);
  }

  useEffect(() => {
    if (currentUser?.photoURL) {
      setPhotoURL(currentUser.photoURL);
    }
  }, [currentUser]);

  return (
    <div>
      <Link to="/mainpage">
        <p className="backbutton"> BACK</p>
      </Link>
      <img
        src={photoURL}
        // alt="Avatar"
        className="avatar"
        onClick={() => setIsInputVisible(true)}
      />

      {isInputVisible && (
        <div className="display">
          <label htmlFor="file" className="label ">
            choose file
          </label>
          <input
            id="file"
            style={{ visibility: "hidden" }}
            type={"file"}
            onChange={handleChange}
          />

          <button disabled={loading || !photo} onClick={handleClick}>
            Upload
          </button>
        </div>
      )}
    </div>
  );
}

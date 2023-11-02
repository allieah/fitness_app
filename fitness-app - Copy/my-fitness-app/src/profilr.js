import { useEffect, useState } from "react";
import { useAuth, uploadFile, deleteFile } from "./firebase";
import { Link } from "react-router-dom";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
  deleteObject,
} from "firebase/storage";
import "firebase/storage";
import firebase from "./firebase";
import { updateProfile } from "firebase/auth";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

export default function Profile() {
  const currentUser = useAuth();
  let flag = 1;
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [photoURL, setPhotoURL] = useState(
    "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
  );
  // const fileRef = ref(storage, currentUser.uid + ".png");
  const [photoRemoved, setPhotoRemoved] = useState(false);
  const [isInputVisible, setIsInputVisible] = useState(false);
  const storage = getStorage();
  function handleRemove() {
    deleteFile(currentUser.uid);
  }
  function handleChange(e) {
    if (e.target.files[0]) {
      setPhoto(e.target.files[0]);
    }
    var name = document.getElementById("file");
    // flag = 1;
    toast.info("Selected file: " + name.files.item(0).name);
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

      <div className="profile">
        <img
          src={photoURL}
          className="avatar"
          onClick={() => setIsInputVisible(true)}
          alt="defaultPic.png"
          style={{
            width: "200px",
            height: "200px",
            borderRadius: "50%",
            objectFit: "cover",
          }}
        />

        <div className="display" style={{ marginTop: "90px" }}>
          <label htmlFor="file" className="label ">
            choose file
          </label>
          <input
            id="file"
            style={{ visibility: "hidden" }}
            type={"file"}
            onChange={handleChange}
          />
          <button
            className="upload"
            disabled={loading || !photo}
            onClick={handleClick}
          >
            Upload
          </button>
          <button className="remove_pic" onClick={handleRemove}>
            remove
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

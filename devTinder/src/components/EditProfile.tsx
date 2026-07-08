import { useState } from "react";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { addUser } from "../utils/userSlice";
import UserCard from "./UserCard";


const EditProfile = ({ user }: { user: any }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [age, setAge] = useState(user.age);
  const [gender, setGender] = useState(user.gender);
  const [about, setAbout] = useState(user.about);
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);

  const saveProfile = async () => {
    //Clear Errors
    setError("");
    try{
      const res = await axios.patch(BASE_URL + "/profile/edit", 
        {firstName, lastName, photoUrl, age, gender, about}, 
        {withCredentials: true});
  
      dispatch(addUser(res?.data?.data));
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }catch(err: any){
      setError(err?.response?.data || "Something went wrong!");
    }
  }

  return (
    <div className="flex justify-center">
      {showToast && <div className="toast toast-top toast-center">
        <div className="alert alert-success">
          <span>Profile updated successfully.</span>
        </div>
      </div>}
      <div className="card card-border bg-base-300 w-96 mx-4">
        <div className="card-body">
          <h2 className="card-title justify-center text-xl">Edit Profile</h2>
          <div>
            <fieldset className="fieldset my-2">
              <legend className="fieldset-legend">First Name</legend>
              <input type="text" className="input" value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
            </fieldset>
            <fieldset className="fieldset my-2">
              <legend className="fieldset-legend">Last Name</legend>
              <input type="text" className="input" value={lastName} onChange={(e) => setLastName(e.target.value)} />
            </fieldset>
            <fieldset className="fieldset my-2">
              <legend className="fieldset-legend">Photo Url</legend>
              <input type="text" className="input" value={photoUrl} onChange={(e) => setPhotoUrl(e.target.value)}/>
            </fieldset>
            <fieldset className="fieldset my-2">
              <legend className="fieldset-legend">Age</legend>
              <input type="text" className="input" value={age} onChange={(e) => setAge(e.target.value)} />
            </fieldset>
            <fieldset className="fieldset my-2">
              <legend className="fieldset-legend">Gender</legend>
              <input type="text" className="input" readOnly value={gender} />
              <div className="dropdown dropdown-start">
                <div tabIndex={0} role="button" className="btn m-1">⬇️</div>
                <ul tabIndex={-1} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                  <li onClick={() => setGender("male")}><a>male</a></li>
                  <li onClick={() => setGender("female")}><a>female</a></li>
                  <li onClick={() => setGender("others")}><a>others</a></li>
                </ul>
              </div>
            </fieldset>
            <fieldset className="fieldset my-2">
              <legend className="fieldset-legend">About</legend>
              <textarea className="textarea" value={about} onChange={(e) => setAbout(e.target.value)}></textarea>
            </fieldset>
          </div>
          <p className="text-red-500">{error}</p>
          <div className="card-actions justify-center">
            <button className="btn btn-primary my-2" onClick={saveProfile}>Save Profile</button>
          </div>
        </div>
      </div>
      <UserCard user={{firstName, lastName, photoUrl, age, gender, about}}/>
    </div>
  )
}

export default EditProfile;
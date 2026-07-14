import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/constants";
import { useNavigate } from "react-router-dom";

const Login = () => {

  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);

  const onLoginHandler = async () => {
    try{
      const res = await axios.post(BASE_URL + "/login", 
        {emailId, password}, 
        {withCredentials: true});

      dispatch(addUser(res.data));
      navigate("/");
    }catch(err: any){
      setError(err?.response?.data || "Something went wrong!");
    }
  }

  const onSignUpHandler = async () => {
    try{
      const res = await axios.post(BASE_URL + "/signup", 
        {firstName, lastName, emailId, password}, 
        {withCredentials: true});

      dispatch(addUser(res.data.data));
      navigate("/profile");
    }catch(err: any){
      setError(err?.response?.data || "Something went wrong!");
    }
  }

  return (
    <div className="flex justify-center">
    <div className="card card-border bg-base-300 w-96">
      <div className="card-body">
        <h2 className="card-title justify-center text-xl">{isLoginForm ? "Login" : "Sign Up"}</h2>
        <div>
          {!isLoginForm && <><fieldset className="fieldset my-2">
            <legend className="fieldset-legend">First Name</legend>
            <input type="text" className="input" value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
          </fieldset>
          <fieldset className="fieldset my-2">
            <legend className="fieldset-legend">Last Name</legend>
            <input type="text" className="input" value={lastName} onChange={(e) => setLastName(e.target.value)}/>
          </fieldset></>}
          <fieldset className="fieldset my-2">
            <legend className="fieldset-legend">Email</legend>
            <input type="text" className="input" value={emailId} onChange={(e) => setEmailId(e.target.value)}/>
          </fieldset>
          <fieldset className="fieldset my-2">
            <legend className="fieldset-legend">Password</legend>
            <input type="text" className="input" value={password} onChange={(e) => setPassword(e.target.value)} />
          </fieldset>
        </div>
        <p className="text-red-500">{error}</p>
        <div className="card-actions justify-center">
          <button className="btn btn-primary my-2" onClick={isLoginForm? onLoginHandler: onSignUpHandler}>{isLoginForm ? "Login" : "Sign Up"}</button>
        </div>
        <p className="py-2 mx-auto cursor-pointer" onClick={() => setIsLoginForm(value => !value)}>{!isLoginForm ? "Already a user? Login now" : "Not registered? Sign Up now"}</p>
      </div>
    </div>
    </div>
  )
}

export default Login;
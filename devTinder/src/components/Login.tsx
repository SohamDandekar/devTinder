import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/constants";
import { useNavigate } from "react-router-dom";

const Login = () => {

  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const onSubmitHandler = async () => {
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

  return (
    <div className="flex justify-center">
    <div className="card card-border bg-base-300 w-96">
      <div className="card-body">
        <h2 className="card-title justify-center text-xl">Login</h2>
        <div>
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
          <button className="btn btn-primary my-2" onClick={onSubmitHandler}>Login</button>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Login
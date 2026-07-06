import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCArd";


const Feed = () => {

  const userData = useSelector((store:any) => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const feed = useSelector((store:any) => store.feed);
  const UserCardAny = UserCard as any;

  const getFeed = async() => {
    try{
      const res = await axios.get(BASE_URL + "/feed", {withCredentials: true});
      dispatch(addFeed(res?.data?.data));
    }catch(err){
      console.error(err);
    }
  }

  useEffect(()=>{
    if(!userData){
        navigate("/login");
    }
    
    if(!feed){
      getFeed();
    }
  },[]);

  return (
    feed && (
    <div className="flex justify-center my-10">
      <UserCardAny user={feed[0]}/>
    </div>
    )
  );
}

export default Feed
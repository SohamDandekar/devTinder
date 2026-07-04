import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


const Feed = () => {

  const userData = useSelector((store:any) => store.user);
  const navigate = useNavigate();

  useEffect(()=>{
    if(!userData)
        navigate("/login");
  },[]);

  return (
    <div>Feed</div>
  )
}

export default Feed
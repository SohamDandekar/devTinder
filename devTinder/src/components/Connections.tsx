import axios from "axios"
import { BASE_URL } from "../utils/constants"
import { useDispatch, useSelector } from "react-redux"
import { addConnections } from "../utils/connectionsSlice";
import { useEffect } from "react";


const Connections = () => {

  const connections = useSelector((store:any) => store.connections);
  const dispatch = useDispatch();

  const fetchConnections = async () => {
    try{
        const res = await axios.get(BASE_URL + "/user/connections", 
            {withCredentials: true});
        dispatch(addConnections(res?.data?.data));
    }catch(err){
        console.error(err);
    }
  }

  useEffect(()=>{
    if(!connections){
        fetchConnections();
    }
  }, []);

  if(!connections) return;

  if(connections.length === 0) {
    return( 
        <div className="text-center font-bold text-xl my-10">
            No Connections Found!
        </div>
        );
    }

  return (
    <div className="text-center my-10">
        <h1 className="text-2xl font-bold text-white">Connections</h1>
        {connections.map((connection:any) => {

        const {_id, firstName, lastName, photoUrl, age, gender, about} = connection;
        return( 
        <div key={_id} className="card card-side bg-base-300 shadow-sm w-1/2 m-4 p-4 mx-auto">
            <figure className="rounded-full">
                <img
                src={photoUrl}
                alt="photo" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{firstName + " " + lastName}</h2>
                {gender && age && <p>{age + ", " + gender}</p>}
                <p>{about}</p>
            </div>
        </div>)
        })
        }
    </div>
  )
}

export default Connections;
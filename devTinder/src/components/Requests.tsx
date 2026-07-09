import axios from "axios"
import { BASE_URL } from "../utils/constants"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react";
import { addRequests, removeRequest } from "../utils/requestsSlice";


const Connections = () => {

  const requests = useSelector((store:any) => store.requests);
  const dispatch = useDispatch();

  const fetchRequests = async () => {
    try{
        const res = await axios.get(BASE_URL + "/user/requests/received", 
            {withCredentials: true});
        dispatch(addRequests(res?.data?.data));
    }catch(err){
        console.error(err);
    }
  }

  const requestReview = async (status:string, _id:string) => {
    try{
      await axios.post(BASE_URL + "/request/review/" + status + "/" + _id, {}, {withCredentials:true});
      dispatch(removeRequest(_id));
    }catch(err){
      console.error(err);
    }
  }

  useEffect(()=>{
    if(!requests){
        fetchRequests();
    }
  }, []);

  if(!requests) return;

  if(requests.length === 0) {
    return( 
        <div className="text-center font-bold text-xl my-10">
            No Requests Found!
        </div>
        );
    }

  return (
    <div className="text-center my-10">
        <h1 className="text-2xl font-bold text-white">Requests</h1>
        {requests.map((request:any) => {

        const {_id, firstName, lastName, photoUrl, age, gender, about} = request;
        return( 
        <div key={_id} className="flex items-center justify-between card card-side bg-base-300 shadow-sm w-2/3 m-4 p-4 mx-auto">
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
            <div>
                <button className="btn btn-primary mx-2" 
                onClick={() => requestReview("rejected", request._id)}>Reject</button>
                <button className="btn btn-secondary mx-2"
                onClick={() => requestReview("accepted", request._id)}>Accept</button>
            </div>
        </div>)
        })
        }
    </div>
  )
}

export default Connections;
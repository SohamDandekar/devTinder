import { useSelector } from "react-redux";
import EditProfile from "./EditProfile"

const Profile = () => {

  const user = useSelector((store:any) => store.user);
  const {firstName, lastName, photoUrl, age, gender, about} = user;

  return (
    <div>
      <EditProfile user={{firstName, lastName, photoUrl, age, gender, about}} />
    </div>
  )
}

export default Profile;
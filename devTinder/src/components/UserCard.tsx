import React from "react";

interface User {
    firstName: string;
    lastName?: string;
    photoUrl?: string;
    age?: number;
    gender?: string;
    about?: string;
}

interface Props {
    user: User;
}

const UserCard: React.FC<Props> = ({ user }) => {

    const {firstName, lastName, photoUrl, age, gender, about} = user;

  return (
        <div className="card bg-base-300 w-96 shadow-sm">
                <figure>
                    <img
                        src={photoUrl}
                        alt="Photo" />
                </figure>
                <div className="card-body">
                <h2 className="card-title">{firstName + " " + lastName}</h2>
                {age && gender && <p>{age + ", " + gender}</p>}
                <p>{about}</p>
                <div className="card-actions justify-center my-4">
                    <button className="btn btn-primary">Ignore</button>
                    <button className="btn btn-secondary">Interested</button>
                </div>
            </div>
        </div>
  )
}

export default UserCard
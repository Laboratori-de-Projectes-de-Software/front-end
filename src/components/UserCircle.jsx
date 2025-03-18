import React from "react";
import { FaUser } from "react-icons/fa";

export default function UserCircle({ user }) {
  return (
    <div className="user-circle">
      {user && user.photoUrl ? (
        <img src={user.photoUrl} alt="User Profile" />
      ) : (
        <FaUser className="default-icon" />
      )}
    </div>
  );
}

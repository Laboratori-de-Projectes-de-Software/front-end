import { FaUser } from "react-icons/fa";

interface User {
  photoUrl?: string;
}

export default function UserCircle({ user }: { user?: User }) {
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

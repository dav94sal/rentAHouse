import { LiaDrupal } from "react-icons/lia";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";

function ProfileButton({ user }) {
  const dispatch = useDispatch();

  const handleLogout = e => {
    e.preventDefault();
    dispatch(logout())
  }

  return (
    <>
      <button>
        <ProfileIcon />
      </button>

      <ul className="profile-dropdown">
        <li>{user.username}</li>
        <li>{user.firstName} {user.lastName}</li>
        <li>{user.email}</li>
        <li>
          <button onClick={handleLogout}>Logout</button>
        </li>
      </ul>
    </>
  )
}

function ProfileIcon() {
  return (
    <div style={{color: "white", fontSize: "40px"}}>
      <LiaDrupal />
    </div>
  )
}

export default ProfileButton;

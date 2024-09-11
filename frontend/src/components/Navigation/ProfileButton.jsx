import { useEffect, useState, useRef } from "react";
import { LiaDrupal } from "react-icons/lia";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import './Navigation.css'
import { Link } from "react-router-dom";

function ProfileButton({ user }) {
  const [showMenu, setShowMenu] = useState(false)
  const dispatch = useDispatch();
  const ulref = useRef();

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (ulref.current && !ulref.current.contains(e.target))
      setShowMenu(false)
    }

    document.addEventListener('click', closeMenu)

    return () => document.removeEventListener('click', closeMenu)
  }, [showMenu])

  const handleLogout = e => {
    e.preventDefault();
    dispatch(logout())
  }

  const toggleMenu = e => {
    e.stopPropagation();
    setShowMenu(!showMenu)
  }

  return (
    <>
      <button onClick={toggleMenu}  id='profile-button'>
        <ProfileIcon />
      </button>

      <div className={
          `profile-dropdown ${showMenu? '' : 'hidden'}`
        }
        ref={ulref}
      >
        <div className="dropdown-intro-container">
          <li>Hello, {user.username}</li>
          {/* <li>{user.firstName} {user.lastName}</li> */}
          <li>{user.email}</li>
        </div>
        <li className="manage-spots"><Link to='/spots/current'>Manage Spots</Link></li>
        <li>
          <button onClick={handleLogout}>Logout</button>
        </li>
      </div>
    </>
  )
}

function ProfileIcon() {
  return (
    <div style={{color: "white", fontSize: "50px"}}>
      <LiaDrupal />
    </div>
  )
}

export default ProfileButton;

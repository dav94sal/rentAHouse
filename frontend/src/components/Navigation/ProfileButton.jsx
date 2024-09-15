import { useEffect, useState, useRef } from "react";
import { LiaDrupal } from "react-icons/lia";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/session";
import './Navigation.css'
import { Link } from "react-router-dom";

function ProfileButton({ user }) {
  const [showMenu, setShowMenu] = useState(false)
  const [hasSpots, setHasSpots] = useState(false)
  const userSpots = useSelector(state => state.spots.current)
  const dispatch = useDispatch();
  const ulref = useRef();

  useEffect(() => {
    const usersArray = Object.values(userSpots)
    if (usersArray.length > 0) setHasSpots(true)
  }, [userSpots])

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
    // try to navigate from here
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

      <ul className={
          `profile-dropdown ${showMenu? '' : 'hidden'}`
        }
        ref={ulref}
      >
        <div className="dropdown-intro-container">
          <li>Hello, {user.username}</li>
          {/* <li>{user.firstName} {user.lastName}</li> */}
          <li>{user.email}</li>
        </div>
        <li
          className="manage-spots"
          onClick={toggleMenu}
        >
          {
            hasSpots?
            <Link to='/spots/current'>Manage Spots</Link> :
            <Link to='/spots/new'>Create Spot</Link>
          }
        </li>
        <li>
          <button onClick={handleLogout}>Logout</button>
        </li>
      </ul>
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

import { useEffect, useState, useRef } from "react";
import { LiaDrupal } from "react-icons/lia";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";

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
      <button onClick={toggleMenu}>
        <ProfileIcon />
      </button>

      <ul className={
          `profile-dropdown ${showMenu? '' : 'hidden'}`
        }
        ref={ulref}
      >
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

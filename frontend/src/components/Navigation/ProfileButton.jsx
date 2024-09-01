import { LiaDrupal } from "react-icons/lia";

function ProfileButton() {
  return (
    <button>
      <ProfileIcon />
    </button>
  )
}

function ProfileIcon() {
  return (
    <div style={{color: "blue", fontSize: "30px"}}>
      <LiaDrupal />
    </div>
  )
}

export default ProfileButton;

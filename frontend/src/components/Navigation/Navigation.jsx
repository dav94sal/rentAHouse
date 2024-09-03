import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import OpenModalButton from '../OpenModalButton/OpenModalButton';
import LoginFormModal from '../LoginFormPage';
import ProfileButton from './ProfileButton';
import './Navigation.css'

function Navigation() {
  const sessionUser = useSelector(state => state.session.user)

  return (
    <nav>
      <ul>
        <li id='home-link'>
          <Link to='/'>Home</Link>
        </li>

        {sessionUser?
          <li id='profile-button'>
            <ProfileButton user={sessionUser} />
          </li> :

          <div id='login-signup-container'>
            <li>
              <OpenModalButton
                buttonText='Log in'
                modalComponenet={<LoginFormModal />}
              />
            </li>

            <li>
              <Link to='/signup'>Signup</Link>
            </li>
          </div>
        }
      </ul>
    </nav>
  )
}

export default Navigation;

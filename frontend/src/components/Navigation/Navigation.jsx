import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import OpenModalButton from '../OpenModalButton/OpenModalButton';
import LoginFormModal from '../LoginFormPage';
import SignupFormModal from '../SignupFormPage';
import ProfileButton from './ProfileButton';
import './Navigation.css'

function Navigation() {
  const sessionUser = useSelector(state => state.session.user);

  return (
    <nav>
      <ul className='navigation-list'>
        <li id='home-link'>
          <Link to='/'>
            <div className='name-icon'>
              <img src='/android-chrome-192x192.png' className='home-button'/>
              <p id='name'>Rent-A-House</p>
            </div>
          </Link>
        </li>

        {sessionUser?
          <div className='profile-container'>
            <li id='create-a-new-spot'>
              <Link to='/spots/new'>Create a New Spot</Link>
            </li>
            <li>
              <ProfileButton user={sessionUser} />
            </li>
          </div> :

          <div id='login-signup-container'>
            <li className='LS-li'>
              <OpenModalButton
                buttonText='Log in'
                modalComponenet={<LoginFormModal />}
              />
            </li>

            <li className='LS-li'>
              <OpenModalButton
                buttonText='Sign up'
                modalComponenet={<SignupFormModal />}
              />
            </li>
          </div>
        }
      </ul>
    </nav>
  )
}

export default Navigation;

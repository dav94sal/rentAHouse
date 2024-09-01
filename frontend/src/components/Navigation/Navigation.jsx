import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../../store/session';
import ProfileButton from './ProfileButton';
import './Navigation.css'

function Navigation() {
  const sessionUser = useSelector(state => state.session.user)
  const dispatch = useDispatch();

  return (
    <nav>
      <ul>
        <li>
          <Link to='/'>Home</Link>
        </li>

        {sessionUser?
          <div>
            <li>
              <button
                onClick={() => dispatch(logout())}
              >
                Logout
              </button>
            </li>

            <ProfileButton />
          </div> :

          <div>
            <li>
              <Link to='/login'>Login</Link>
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

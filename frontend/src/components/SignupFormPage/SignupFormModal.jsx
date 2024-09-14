import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { signup } from '../../store/session';
import { useModal } from '../../context/Modal';
import './SignupForm.css'

function SignupFormModal() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({})
  const [validButton, setValidButton] = useState(false);
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  useEffect(() => {
    if (username.length > 3 &&
      password.length > 5 &&
      confirmPassword.length > 5 &&
      email && firstName && lastName
    ) {
      setValidButton(true);
    } else setValidButton(false)
  }, [username, password, confirmPassword, email, firstName, lastName])

  const handleSubmit = e => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return setErrors({confirmPassword: 'Passwords do not match'})
    }

    const newUser = {
      username,
      email,
      firstName,
      lastName,
      password
    }

    setErrors({})

    return dispatch(signup(newUser))
      .then(closeModal)
      .catch(async res => {
        const data = await res.json();
        if(data?.errors) setErrors(data.errors)
    })
  }

  return (
    <div className='form-container'>
      <h1>Signup</h1>

      <form onSubmit={handleSubmit}>
        <div className='input-container'>
          <input
            type="text"
            name="username"
            value={username}
            placeholder='Username'
            onChange={e => setUsername(e.target.value)}
            />

          {errors.username && <p className='errors'>{errors.username}</p>}

          <input
            type="email"
            name="email"
            value={email}
            placeholder='Email'
            onChange={e => setEmail(e.target.value)}
          />

          {errors.email && <p className='errors'>{errors.email}</p>}

          <input
            type="text"
            name="firstName"
            value={firstName}
            placeholder='First Name'
            onChange={e => setFirstName(e.target.value)}
            />

          {errors.firstName && <p className='errors'>{errors.firstName}</p>}

          <input
            type="text"
            name="lastName"
            value={lastName}
            placeholder='Last Name'
            onChange={e => setLastName(e.target.value)}
            />

          {errors.lastName && <p className='errors'>{errors.lastName}</p>}

          <input
            type="password"
            name="password"
            value={password}
            placeholder='Enter password'
            onChange={e => setPassword(e.target.value)}
            />

          {errors.password && <p className='errors'>{errors.password}</p>}

          <input
            type="password"
            name="confirm-password"
            value={confirmPassword}
            placeholder='Confirm password'
            onChange={e => setConfirmPassword(e.target.value)}
            />

          {errors.confirmPassword && <p className='errors'>{errors.confirmPassword}</p>}
        </div>

        <button
          className={`submit-button login-but ${validButton? '' : 'disabled'}`}
          type="submit"
          disabled={!validButton}
        >
          signup
        </button>
      </form>
    </div>
  )
}

export default SignupFormModal;

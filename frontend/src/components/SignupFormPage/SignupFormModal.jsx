import { useState } from 'react';
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
  const dispatch = useDispatch();
  const { closeModal } = useModal()

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
    <div className='signup-form-container'>
      <h1>Signup</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="username">
          Username
          <input
            type="text"
            name="username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            />
        </label>

          {errors.username && <p>{errors.username}</p>}

        <label htmlFor="email">
          Email
          <input
            type="email"
            name="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            />
        </label>

          {errors.email && <p>{errors.email}</p>}

        <label htmlFor="firstName">
          First Name
          <input
            type="text"
            name="firstName"
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
            />
        </label>

          {errors.firstName && <p>{errors.firstName}</p>}

        <label htmlFor="lastName">
          Last Name
          <input
            type="text"
            name="lastName"
            value={lastName}
            onChange={e => setLastName(e.target.value)}
            />
        </label>

         {errors.lastName && <p>{errors.lastName}</p>}

        <label htmlFor="password">
          Enter password
          <input
            type="password"
            name="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            />
        </label>

          {errors.password && <p>{errors.password}</p>}

        <label htmlFor="confirm-password">
          Confirm password
          <input
            type="password"
            name="confirm-password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            />
        </label>

        {errors.confirmPassword && <p>{errors.confirmPassword}</p>}

        <button type="submit">signup</button>
      </form>
    </div>
  )
}

export default SignupFormModal;

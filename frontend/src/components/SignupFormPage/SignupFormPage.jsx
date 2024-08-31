import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signup } from '../../store/session';
import './SignupForm.css'

function SignupForm() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({})
  const dispatch = useDispatch();

  const handleSubmit = e => {
    e.preventDefault();

    const newUser = {
      username,
      email,
      firstName,
      lastName,
      password
    }

    return dispatch(signup(newUser)).catch(async res => {
      const data = await res.json();
      if(data?.errors) setErrors(data.errors)
    })
  }

  return (
    <div className='form-container'>
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

        <label htmlFor="email">
          Email
          <input
            type="email"
            name="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            />
        </label>

        <label htmlFor="firstName">
          First Name
          <input
            type="text"
            name="firstName"
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
            />
        </label>

        <label htmlFor="lastName">
          Last Name
          <input
            type="text"
            name="lastName"
            value={lastName}
            onChange={e => setLastName(e.target.value)}
            />
        </label>

        <label htmlFor="password">
          Enter password
          <input
            type="password"
            name="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            />
        </label>

        {errors.credential && <p>{errors.credential}</p>}

        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default SignupForm;

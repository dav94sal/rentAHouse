import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { login } from "../../store/session";
import { Navigate } from 'react-router-dom';
import './LoginForm.css';

function LoginFormPage() {
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const sessionUser = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  if (sessionUser) return <Navigate to='/' replace={true} />

  const handleSubmit = e => {
    e.preventDefault()

    const user = {
      credential,
      password
    }

    return dispatch(login(user)).catch(
      async (res) => {
        const data = await res.json();
        if (data?.errors) setErrors(data.errors)
      }
    )
  }

  return (
    <div className="form-container">
      <h1>Login</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="credential">
          Enter username or email
          <input
            type="text"
            name="credential"
            value={credential}
            onChange={e => setCredential(e.target.value)}
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

export default LoginFormPage;

import { useEffect, useState } from "react";
import { useDispatch } from 'react-redux'
import { login } from "../../store/session";
import { useModal } from "../../context/Modal";
import './LoginForm.css';

function LoginFormModal() {
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [validButton, setValidButton] = useState(false);
  const { closeModal } = useModal();
  const dispatch = useDispatch();

  useEffect(() => {
    if (password.length > 5 && credential.length > 3) {
      setValidButton(true);
    }
  }, [password, credential])

  const handleSubmit = async e => {
    e.preventDefault()

    const user = {
      credential,
      password
    }

    return dispatch(login(user))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data?.errors) setErrors(data.errors)
      }
    )
  }

  const handleClick = e => {
    e.preventDefault();

    const demoUser = {
      credential: "demo-user",
      password: "password"
    }

    return dispatch(login(demoUser))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data?.errors) setErrors(data.errors)
      }
    )
  }

  return (
    <div className="form-container">
      <h1>Log In</h1>

      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <input
            type="text"
            name="credential"
            placeholder="Enter username or email"
            value={credential}
            onChange={e => setCredential(e.target.value)}
            />

          <input
            type="password"
            name="password"
            placeholder="Enter password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            />
        </div>

        <div className="error-container">
          {errors.credential && <p className="errors">{errors.credential}</p>}
        </div>

        <button
          className={`submit-button login-but ${validButton? '' : 'disabled'}`}
          type="submit"
          disabled={!validButton}
        >
          Log In
        </button>
      </form>

      <button
        className="demo-user-button"
        onClick={handleClick}
      >
        Demo User
      </button>

    </div>
  )
}

export default LoginFormModal;

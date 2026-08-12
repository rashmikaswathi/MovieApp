import {useState} from 'react'
import {useNavigate} from 'react-router'
import Cookies from 'js-cookie'

import './index.css'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMsg, setErrorMsg] = useState('')

  const navigate = useNavigate()

  const onSubmitLogin = async event => {
    event.preventDefault()

    const userDetails = {
      username,
      password,
    }

    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch('https://apis.ccbp.in/login', options)
    const data = await response.json()

    if (response.ok) {
      Cookies.set('jwt_token', data.jwt_token, {expires: 30})

      localStorage.setItem('username', username)
      localStorage.setItem('password', password)

      navigate('/')
    } else {
      setErrorMsg(data.error_msg)
    }
  }

  return (
    <div className="login-page">
      <div className="login-overlay">
        <header className="login-header">
          <img
            src="https://res.cloudinary.com/dssn7vrc0/image/upload/v1785911652/Group_7399_qxuseu.png"
            alt="login website logo"
            className="login-logo"
          />
        </header>

        <div className="login-form-container">
          <form className="login-form" onSubmit={onSubmitLogin}>
            <h1 className="login-heading">Login</h1>

            <div className="input-container">
              <label htmlFor="username" className="input-label">
                USERNAME
              </label>

              <input
                id="username"
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                className="login-input"
                placeholder="Enter Username"
              />
            </div>

            <div className="input-container">
              <label htmlFor="password" className="input-label">
                PASSWORD
              </label>

              <input
                id="password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="login-input"
                placeholder="Enter Password"
              />
            </div>

            {errorMsg !== '' && <p className="error-message">*{errorMsg}</p>}

            <button type="submit" className="login-button">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login

import {useNavigate} from 'react-router-dom'
import Cookies from 'js-cookie'
import Footer from '../Footer'
import Header from '../Header'
import './index.css'

const Account = () => {
  const navigate = useNavigate()

  const username = localStorage.getItem('username')
  const password = localStorage.getItem('password')

  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    navigate('/login')
  }

  return (
    <div className="account-page">
      <Header />

      <main className="account-content">
        <h1>Account</h1>

        <div className="account-line" />

        <div className="account-row">
          <p className="account-label">Member ship</p>

          <div className="account-value">
            <p>{username}</p>
            <p>
              Password :{' '}
              {password ? '*'.repeat(password.length) : '************'}
            </p>
          </div>
        </div>

        <div className="account-line" />

        <div className="account-row">
          <p className="account-label">Plan details</p>

          <div className="account-value plan-value">
            <p>Premium</p>
            <span>Ultra HD</span>
          </div>
        </div>

        <div className="account-line" />

        <div className="logout-container">
          <button type="button" onClick={onClickLogout}>
            Logout
          </button>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default Account

import {Link} from 'react-router-dom'
import {HiOutlineSearch} from 'react-icons/hi'

import './index.css'

const Header = () => {
  return (
    <nav className="header">
      <Link to="/">
        <img
          src="https://res.cloudinary.com/dssn7vrc0/image/upload/v1785911652/Group_7399_qxuseu.png"
          alt="website logo"
          className="website-logo"
        />
      </Link>

      <div className="nav-links">
        <Link to="/" className="nav-link">
          Home
        </Link>

        <Link to="/popular" className="nav-link">
          Popular
        </Link>
      </div>

      <div className="header-right">
        <Link to="/search" className="search-button" data-testid="searchButton">
          <HiOutlineSearch size={30} />
        </Link>

        <Link to="/account">
          <img
            src="https://res.cloudinary.com/dssn7vrc0/image/upload/v1785988348/Avatar_oxk4or.png"
            alt="profile"
            className="profile-image"
          />
        </Link>
      </div>
    </nav>
  )
}

export default Header

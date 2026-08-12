import {useState} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import BeatLoader from 'react-spinners/BeatLoader'
import {HiOutlineSearch} from 'react-icons/hi'
import Header from '../Header'

import './index.css'

const Search = () => {
  const [searchInput, setSearchInput] = useState('')
  const [searchValue, setSearchValue] = useState('')
  const [movies, setMovies] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [isSearched, setIsSearched] = useState(false)

  const getSearchMovies = async value => {
    setIsLoading(true)
    setIsError(false)
    setIsSearched(true)

    const jwtToken = Cookies.get('jwt_token')

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    try {
      const response = await fetch(
        `https://apis.ccbp.in/movies-app/movies-search?search=${encodeURIComponent(
          value,
        )}`,
        options,
      )

      if (response.ok) {
        const data = await response.json()
        setMovies(data.results)
      } else {
        setIsError(true)
      }
    } catch {
      setIsError(true)
    }

    setIsLoading(false)
  }

  const onSearch = event => {
    event.preventDefault()

    if (searchInput.trim() !== '') {
      setSearchValue(searchInput)
      getSearchMovies(searchInput)
    }
  }

  const renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <BeatLoader color="#D81F26" size={15} />
    </div>
  )

  const renderFailureView = () => (
    <div className="failure-container">
      <img
        src="https://res.cloudinary.com/dssn7vrc0/image/upload/v1786112046/Background-Complete_exx2ml.png"
        alt="failure view"
        className="failure-image"
      />

      <h1>Something went wrong. Please try again</h1>

      <button type="button" onClick={() => getSearchMovies(searchValue)}>
        Try Again
      </button>
    </div>
  )

  const renderNoMovies = () => (
    <div className="no-movies-container">
      <img
        src="https://res.cloudinary.com/dssn7vrc0/image/upload/v1786016929/Group_7394_u64shy.png"
        alt="no movies"
        className="no-movies-image"
      />

      <h1>Your search for {searchValue} did not find any matches.</h1>
    </div>
  )

  const renderMovies = () => (
    <ul className="search-movies-list">
      {movies.map(movie => (
        <li className="search-movie-item" key={movie.id} movie={movie}>
          <Link to={`/movies/${movie.id}`}>
            <img
              src={movie.poster_path}
              alt={movie.title}
              className="search-movie-image"
            />
          </Link>
        </li>
      ))}
    </ul>
  )

  return (
    <div className="search-container">
      <Header />

      <main className="search-content">
        <form className="search-form" onSubmit={onSearch}>
          <input
            type="search"
            value={searchInput}
            onChange={event => setSearchInput(event.target.value)}
            placeholder="Search"
            className="search-input"
          />

          <button
            type="submit"
            className="search-button"
            data-testid="searchButton"
          >
            <HiOutlineSearch size={22} />
          </button>
        </form>

        {isLoading
          ? renderLoader()
          : isError
          ? renderFailureView()
          : isSearched
          ? movies.length === 0
            ? renderNoMovies()
            : renderMovies()
          : null}
      </main>
    </div>
  )
}

export default Search

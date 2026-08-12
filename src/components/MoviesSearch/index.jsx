import {useState} from 'react'

import Cookies from 'js-cookie'
import BeatLoader from 'react-spinners/BeatLoader'

import Header from '../Header'
import Footer from '../Footer'
import MovieItem from '../MovieItem'

import './index.css'

const MovieSearch = () => {
  const [searchInput, setSearchInput] = useState('')
  const [movies, setMovies] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)

  const searchMovies = async () => {
    if (searchInput.trim() === '') {
      return
    }

    setIsLoading(true)
    setHasError(false)
    setHasSearched(true)

    const jwtToken = Cookies.get('jwt_token')

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    try {
      const response = await fetch(
        `https://apis.ccbp.in/movies-app/search-movies?search=${searchInput}`,
        options,
      )

      if (response.ok) {
        const data = await response.json()
        setMovies(data.results)
      } else {
        setHasError(true)
      }
    } catch {
      setHasError(true)
    }

    setIsLoading(false)
  }

  const renderLoader = () => (
    <div data-testid="loader" className="loader-container">
      <BeatLoader />
    </div>
  )

  const renderFailureView = () => (
    <div className="failure-view">
      <h1>Something went wrong. Please try again</h1>

      <button type="button" onClick={searchMovies}>
        Try Again
      </button>
    </div>
  )

  const renderNoMovies = () => (
    <div className="no-movies-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-movies-img.png"
        alt="no movies"
      />

      <h1>No results found</h1>
    </div>
  )

  const renderMovies = () => (
    <ul className="movies-list">
      {movies.map(movie => (
        <li key={movie.id} className="movie-list-item">
          <MovieItem movie={movie} />
        </li>
      ))}
    </ul>
  )

  return (
    <div className="movie-search-container">
      <Header />

      <main className="movie-search-content">
        <div className="search-container">
          <input
            type="search"
            value={searchInput}
            placeholder="Search"
            className="search-input"
            onChange={event => setSearchInput(event.target.value)}
          />

          <button
            type="button"
            data-testid="searchButton"
            className="search-button"
            onClick={searchMovies}
          >
            Search
          </button>
        </div>

        {isLoading
          ? renderLoader()
          : hasError
          ? renderFailureView()
          : hasSearched
          ? movies.length === 0
            ? renderNoMovies()
            : renderMovies()
          : null}
      </main>

      <Footer />
    </div>
  )
}

export default MovieSearch

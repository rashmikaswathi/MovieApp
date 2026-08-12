import {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import BeatLoader from 'react-spinners/BeatLoader'
import Footer from '../Footer'
import Header from '../Header'
import './index.css'

const Popular = () => {
  const [movies, setMovies] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)

  const getPopularMovies = async () => {
    setIsLoading(true)
    setIsError(false)

    const jwtToken = Cookies.get('jwt_token')

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    try {
      const response = await fetch(
        'https://apis.ccbp.in/movies-app/popular-movies',
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

  useEffect(() => {
    getPopularMovies()
  }, [])

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

      <button type="button" onClick={getPopularMovies}>
        Try Again
      </button>
    </div>
  )

  const renderMovies = () => (
    <ul className="popular-movies-list">
      {movies.map(movie => (
        <li className="popular-movie-item" key={movie.id} movie={movie}>
          <Link to={`/movies/${movie.id}`}>
            <img
              src={movie.poster_path}
              alt={movie.title}
              className="popular-movie-image"
            />
          </Link>
        </li>
      ))}
    </ul>
  )

  return (
    <>
      <div className="popular-container">
        <Header />

        <main className="popular-content">
          {isLoading
            ? renderLoader()
            : isError
            ? renderFailureView()
            : renderMovies()}
        </main>
      </div>
      <Footer />
    </>
  )
}

export default Popular

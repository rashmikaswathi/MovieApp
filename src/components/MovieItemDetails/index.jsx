import {useEffect, useState} from 'react'
import {Link, useParams} from 'react-router-dom'
import Cookies from 'js-cookie'
import ClipLoader from 'react-spinners/ClipLoader'
import Footer from '../Footer'
import Header from '../Header'

import './index.css'

const MovieItemDetails = () => {
  const {id} = useParams()

  const [movie, setMovie] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)

  const getMovieDetails = async () => {
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
        `https://apis.ccbp.in/movies-app/movies/${id}`,
        options,
      )

      if (response.ok) {
        const data = await response.json()
        setMovie(data.movie_details)
      } else {
        setIsError(true)
      }
    } catch {
      setIsError(true)
    }

    setIsLoading(false)
  }

  useEffect(() => {
    getMovieDetails()
  }, [id])

  const renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <ClipLoader color="#D81F26" size={50} />
    </div>
  )

  const renderFailureView = () => (
    <div className="failure-container">
      <img
        src="https://res.cloudinary.com/dssn7vrc0/image/upload/v1786418323/alert-triangle_dwjfz1.png"
        alt="failure view"
      />

      <h1>Something went wrong. Please try again</h1>

      <button type="button" onClick={getMovieDetails}>
        Try Again
      </button>
    </div>
  )

  const getRuntime = runtime => {
    const hours = Math.floor(runtime / 60)
    const minutes = runtime % 60

    if (hours === 0) {
      return `${minutes}m`
    }

    return `${hours}h ${minutes}m`
  }

  const renderMovieDetails = () => (
    <>
      <section
        className="movie-details-banner"
        style={{
          backgroundImage: `url(${movie.backdrop_path})`,
        }}
      >
        <div className="movie-details-overlay">
          <div className="movie-details-content">
            <h1>{movie.title}</h1>

            <div className="movie-info">
              <p>{movie.release_date}</p>

              <p>{movie.adult ? 'A' : 'U/A'}</p>

              <p>{getRuntime(movie.runtime)}</p>
            </div>

            <p className="movie-overview">{movie.overview}</p>

            <button type="button" className="play-button">
              Play
            </button>
          </div>
        </div>
      </section>

      <section className="details-section">
        <div>
          <h2>Genres</h2>

          <ul>
            {movie.genres.map(genre => (
              <li key={genre.id}>{genre.name}</li>
            ))}
          </ul>
        </div>

        <div>
          <h2>Audio Available</h2>

          <ul>
            {movie.spoken_languages.map(language => (
              <li key={language.id}>{language.english_name}</li>
            ))}
          </ul>
        </div>

        <div>
          <h2>Rating Count</h2>
          <p>{movie.vote_count}</p>
        </div>

        <div>
          <h2>Rating Average</h2>
          <p>{movie.vote_average}</p>
        </div>

        <div>
          <h2>Budget</h2>
          <p>{movie.budget}</p>
        </div>
      </section>

      <section className="similar-movies-section">
        <h2>More like this</h2>

        <ul className="similar-movies-list">
          {movie.similar_movies.map(similarMovie => (
            <li key={similarMovie.id}>
              <Link to={`/movies/${similarMovie.id}`}>
                <img
                  src={similarMovie.poster_path}
                  alt={similarMovie.title}
                  className="similar-movie-poster"
                />
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  )

  return (
    <>
      <div className="movie-details-container">
        <Header />

        {isLoading
          ? renderLoader()
          : isError
          ? renderFailureView()
          : renderMovieDetails()}
      </div>
      <Footer />
    </>
  )
}

export default MovieItemDetails

/*import {useEffect, useState} from 'react'
import {Link, useParams} from 'react-router'
import Cookies from 'js-cookie'
import BeatLoader from 'react-spinners/BeatLoader'

import Footer from '../Footer'
import Header from '../Header'
import MovieItem from '../MovieItem'

import './index.css'

const MovieDetails = () => {
  const {id} = useParams()

  const [movieDetails, setMovieDetails] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  const getMovieDetails = async () => {
    setIsLoading(true)
    setHasError(false)

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
        setMovieDetails(data.movie_details)
      } else {
        setHasError(true)
      }
    } catch {
      setHasError(true)
    }

    setIsLoading(false)
  }

  useEffect(() => {
    getMovieDetails()
  }, [id])

  const renderLoader = () => (
    <div data-testid="loader" className="loader-container">
      <BeatLoader />
    </div>
  )

  const renderFailureView = () => (
    <div className="failure-view">
      <h1>Something went wrong. Please try again</h1>
      <button type="button" onClick={getMovieDetails}>
        Try Again
      </button>
    </div>
  )

  if (isLoading) {
    return (
      <>
        <Header />
        {renderLoader()}
        <Footer />
      </>
    )
  }

  if (hasError) {
    return (
      <>
        <Header />
        {renderFailureView()}
        <Footer />
      </>
    )
  }

  return (
    <>
      <Header />

      <div className="movie-details-container">
        <section
          className="movie-details-banner"
          style={{
            backgroundImage: `url(${movieDetails.backdrop_path})`,
          }}
        >
          <div className="movie-details-overlay">
            <div className="movie-details-content">
              <h1>{movieDetails.title}</h1>

              <div className="movie-meta">
                <span>{movieDetails.adult ? 'A' : 'U/A'}</span>
                <span>{movieDetails.runtime} min</span>
                <span>{movieDetails.release_date}</span>
              </div>

              <p className="movie-overview">{movieDetails.overview}</p>

              <Link to={`/movies/${id}`}>
                <button type="button" className="play-button">
                  Play
                </button>
              </Link>
            </div>
          </div>
        </section>

        <section className="movie-info-section">
          <div>
            <h2>Genres</h2>

            <ul>
              {movieDetails.genres.map(genre => (
                <li key={genre.id}>{genre.name}</li>
              ))}
            </ul>
          </div>

          <div>
            <h2>Audio Available</h2>

            <ul>
              {movieDetails.spoken_languages.map(language => (
                <li key={language.id || language.name}>
                  {language.english_name || language.name}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2>Rating Count</h2>
            <p>{movieDetails.vote_count}</p>
          </div>

          <div>
            <h2>Rating Average</h2>
            <p>{movieDetails.vote_average}</p>
          </div>
        </section>

        <section className="similar-movies-section">
          <h2>More Like This</h2>

          <div className="similar-movies-list">
            {movieDetails.similar_movies.map(movie => (
              <MovieItem key={movie.id} movie={movie} />
            ))}
          </div>
        </section>
      </div>

      <Footer />
    </>
  )
}

export default MovieDetails

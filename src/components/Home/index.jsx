import {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import BeatLoader from 'react-spinners/BeatLoader'
import Slider from 'react-slick'

import Footer from '../Footer'
import Header from '../Header'
import MovieItem from '../MovieItem'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import './index.css'

const Home = () => {
  const [trendingMovies, setTrendingMovies] = useState([])
  const [originalMovies, setOriginalMovies] = useState([])

  const [trendingLoading, setTrendingLoading] = useState(true)
  const [originalLoading, setOriginalLoading] = useState(true)

  const [trendingError, setTrendingError] = useState(false)
  const [originalError, setOriginalError] = useState(false)

  const [randomMovie, setRandomMovie] = useState(null)

  const getTrendingMovies = async () => {
    setTrendingLoading(true)
    setTrendingError(false)

    const jwtToken = Cookies.get('jwt_token')

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    try {
      const response = await fetch(
        'https://apis.ccbp.in/movies-app/trending-movies',
        options,
      )

      if (response.ok) {
        const data = await response.json()
        setTrendingMovies(data.results)
      } else {
        setTrendingError(true)
      }
    } catch {
      setTrendingError(true)
    }

    setTrendingLoading(false)
  }

  const getOriginalMovies = async () => {
    setOriginalLoading(true)
    setOriginalError(false)

    const jwtToken = Cookies.get('jwt_token')

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    try {
      const response = await fetch(
        'https://apis.ccbp.in/movies-app/originals',
        options,
      )

      if (response.ok) {
        const data = await response.json()

        setOriginalMovies(data.results)

        if (data.results.length > 0) {
          const randomIndex = Math.floor(Math.random() * data.results.length)
          setRandomMovie(data.results[randomIndex])
        }
      } else {
        setOriginalError(true)
      }
    } catch {
      setOriginalError(true)
    }

    setOriginalLoading(false)
  }

  useEffect(() => {
    getTrendingMovies()
    getOriginalMovies()
  }, [])

  const sliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  }

  const renderLoader = () => (
    <div data-testid="loader" className="loader-container">
      <BeatLoader />
    </div>
  )

  const renderFailureView = retryFunction => (
    <div className="failure-view">
      <img
        src="https://res.cloudinary.com/dssn7vrc0/image/upload/v1786418323/alert-triangle_dwjfz1.png"
        alt="failure views"
      />
      <p>Something went wrong. Please try again</p>

      <button type="button" onClick={retryFunction}>
        Try Again
      </button>
    </div>
  )

  const renderMovieSlider = movies => (
    <Slider {...sliderSettings}>
      {movies.map(movie => (
        <MovieItem key={movie.id} movie={movie} />
      ))}
    </Slider>
  )

  return (
    <>
      <Header />
      <div className="home-container">
        {/* HERO */}
        {originalLoading ? (
          <div className="hero-loader">{renderLoader()}</div>
        ) : originalError ? (
          renderFailureView(getOriginalMovies)
        ) : (
          randomMovie && (
            <section
              className="hero-section"
              style={{
                backgroundImage: `url(${randomMovie.backdrop_path})`,
              }}
            >
              <div className="hero-overlay">
                <div className="hero-content">
                  <h1>{randomMovie.title}</h1>

                  <p>{randomMovie.overview}</p>

                  <Link to={`/movies/${randomMovie.id}`}>
                    <button type="button" className="play-button">
                      Play
                    </button>
                  </Link>
                </div>
              </div>
            </section>
          )
        )}

        {/* TRENDING */}
        <section className="movies-section">
          <h2>Trending Now</h2>

          {trendingLoading
            ? renderLoader()
            : trendingError
            ? renderFailureView(getTrendingMovies)
            : renderMovieSlider(trendingMovies)}
        </section>

        {/* ORIGINALS */}
        <section className="movies-section">
          <h2>Originals</h2>

          {originalLoading
            ? renderLoader()
            : originalError
            ? renderFailureView(getOriginalMovies)
            : renderMovieSlider(originalMovies)}
        </section>
      </div>

      <Footer />
    </>
  )
}

export default Home

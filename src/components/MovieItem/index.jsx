import {Link} from 'react-router-dom'
import './index.css'

const MovieItem = ({movie}) => {
  const {id, title, poster_path} = movie

  return (
    <li className="movie-item">
      <Link to={`/movies/${id}`} className="movie-link">
        <img src={poster_path} alt={title} className="movie-poster" />
      </Link>
    </li>
  )
}

export default MovieItem

import {Link} from 'react-router-dom'
import './index.css'

const MovieDetailsLink = props => {
  const {movieDetails} = props
  const {posterPath, title, voteAvg, id} = movieDetails
  return (
    <li>
      <img
        className="popular-img"
        alt={title}
        src={`https://image.tmdb.org/t/p/w500${posterPath}`}
      />
      <div className="text-cont">
        <h1>{title}</h1>
        <p>Vote Average: {voteAvg}</p>
      </div>
      <Link to={`/movies/${id}`}>
        {' '}
        <button type="button" className="btn">
          {' '}
          View Details
        </button>
      </Link>
    </li>
  )
}

export default MovieDetailsLink

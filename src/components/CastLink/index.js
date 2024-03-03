import './index.css'

const CastLink = props => {
  const {castDets} = props
  const {gender, name, profilePath, popularity, character} = castDets
  return (
    <li>
      <img
        className="popular-img"
        alt={name}
        src={`https://image.tmdb.org/t/p/original/${profilePath}`}
      />
      <div className="details">
        <h1>{name}</h1>
        <p>Playing character of: {character} </p>
        <p>Having popularity of {popularity}</p>
      </div>
    </li>
  )
}

export default CastLink

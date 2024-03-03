import {Component} from 'react'
import Header from '../Header'
import FailureView from '../FailureView'
import Loading from '../Loading'
import CastLink from '../CastLink'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class MovieDetailsView extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    movieDetailsList: {},
    genresList: [],
    spokenLanguagesList: [],
    castDetailsList: [],
  }

  componentDidMount() {
    this.getMovieDetailsList()
    this.getCastDetailsList()
  }

  getMovieDetailsList = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const {match} = this.props
    const {params} = match
    const {id} = params
    const apiKey = 'a58fe6e8cf6d8d65b061af330efe5072'
    const movieItemDetailsApi = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`
    const response = await fetch(movieItemDetailsApi)
    if (response.ok === true) {
      const data = await response.json()
      console.log(data)
      const updatedData = {
        id: data.id,
        adult: data.adult,
        backdropPath: data.backdrop_path,
        budget: data.budget,
        title: data.title,
        overview: data.overview,
        releaseDate: data.release_date,
        ratingCount: data.vote_count,
        ratingAverage: data.vote_average,
        runtime: data.runtime,
        posterPath: data.poster_path,
      }
      console.log(updatedData)

      const genresData = data.genres.map(eachGenre => ({
        id: eachGenre.id,
        name: eachGenre.name,
      }))
      console.log(genresData)

      const spokenLanguagesData = data.spoken_languages.map(eachLanguage => ({
        id: eachLanguage.id,
        language: eachLanguage.english_name,
      }))

      this.setState({
        apiStatus: apiStatusConstants.success,
        movieDetailsList: updatedData,
        genresList: genresData,
        spokenLanguagesList: spokenLanguagesData,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  getCastDetailsList = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const {match} = this.props
    const {params} = match
    const {id} = params
    const apiKey = 'a58fe6e8cf6d8d65b061af330efe5072'
    const movieItemDetailsApi = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apiKey}&language=en-US`
    const response = await fetch(movieItemDetailsApi)
    if (response.ok === true) {
      const data = await response.json()
      console.log(data)
      const updatedData = data.cast.map(each => ({
        id: each.id,
        adult: each.adult,
        gender: each.gender,
        name: each.name,
        profilePath: each.profile_path,
        popularity: each.popularity,
        character: each.character,
      }))
      console.log(updatedData)

      this.setState({
        apiStatus: apiStatusConstants.success,
        castDetailsList: updatedData,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  onClickRetry = () => {
    this.getMovieDetailsList()
  }

  renderFailureView = () => <FailureView onClickRetry={this.onClickRetry} />

  renderLoadingView = () => <Loading />

  renderSuccessView = () => {
    const {movieDetailsList, genresList, spokenLanguagesList, castDetailsList} =
      this.state
    const {
      adult,
      backdropPath,
      budget,
      overview,
      releaseDate,
      runtime,
      title,
      ratingAverage,
      ratingCount,
    } = movieDetailsList

    const hours = Math.floor(runtime / 60)
    const minutes = runtime % 60
    const movieRuntime = `${hours}h ${minutes}m `
    const censorCertificate = adult ? 'A' : 'U/A'
    const releaseYear = releaseDate.split('-')[0]
    return (
      <>
        <div
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/w500${backdropPath})`,
          }}
          className="movie-details-home-page"
        >
          <Header />
          <div className="home-page-container">
            <h1 className="title">{title}</h1>
            <div className="movie-details">
              <p className="run-time">{movieRuntime}</p>
              <p className="censor">{censorCertificate}</p>
              <p className="release-year">{releaseYear}</p>
            </div>
            <p className="over-view">{overview}</p>
            <button type="button" className="play-btn">
              Play
            </button>
          </div>
        </div>
        <div className="movie-information">
          <div className="movie-details-container">
            <div className="each-info">
              <h1 className="info-heading">Genres</h1>
              <ul className="list-items">
                {genresList.map(eachGenre => (
                  <li className="genre-name" key={eachGenre.id}>
                    <p>{eachGenre.name}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="each-info">
              <h1 className="info-heading">Audio Available</h1>
              <ul className="list-items">
                {spokenLanguagesList.map(eachLang => (
                  <li className="genre-name" key={eachLang.id}>
                    <p>{eachLang.language}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="each-info">
              <h1 className="info-heading">Rating Count</h1>
              <p className="genre-name">{ratingCount}</p>
              <h1 className="info-heading">Rating Average</h1>
              <p className="genre-name">{ratingAverage}</p>
            </div>
            <div className="each-info">
              <h1 className="info-heading">Budget</h1>
              <p className="genre-name">{budget}</p>
              <h1 className="info-heading">Release Date</h1>
              <p className="genre-name">{releaseDate}</p>
            </div>
          </div>
          <div className="cast-container">
            <h1 className="side-heading">Cast</h1>
            <ul className="cast-movies-list">
              {castDetailsList.map(each => (
                <CastLink castDets={each} key={each.id} />
              ))}
            </ul>
          </div>
        </div>
      </>
    )
  }

  renderMovieDetailsView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return <>{this.renderMovieDetailsView()}</>
  }
}
export default MovieDetailsView

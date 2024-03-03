import {Component} from 'react'
import MovieDetailsLink from '../MovieDetailsLink'
import FailureView from '../FailureView'
import Header from '../Header'
import Loading from '../Loading'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class TopRated extends Component {
  state = {
    activePage: 1,
    trendingMoviesList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getTrendingMovies()
  }

  getTrendingMovies = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {activePage} = this.state

    const apiKey = 'a58fe6e8cf6d8d65b061af330efe5072'
    const TrendingMoviesApi = `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=en-US&page=${activePage}`

    const response = await fetch(TrendingMoviesApi)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.results.map(eachMovie => ({
        id: eachMovie.id,
        posterPath: eachMovie.poster_path,
        title: eachMovie.title,
      }))
      this.setState({
        trendingMoviesList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  onClickRetry = () => {
    this.getOriginalsMovies()
  }

  renderFailureView = () => <FailureView onClickRetry={this.onClickRetry} />

  renderLoadingView = () => <Loading />

  onClickPrev = () => {
    const {activePage} = this.state
    if (activePage > 1) {
      this.setState(
        prev => ({activePage: prev.activePage - 1}),
        this.getTrendingMovies,
      )
    }
  }

  onClickNext = () => {
    const {activePage} = this.state
    if (activePage < 461) {
      this.setState(
        prev => ({activePage: prev.activePage + 1}),
        this.getTrendingMovies,
      )
    }
  }

  renderSuccessView = () => {
    const {trendingMoviesList, activePage} = this.state
    return (
      <div className="movie-cont">
        <ul className="popular-list">
          {trendingMoviesList.map(eachMovie => (
            <MovieDetailsLink movieDetails={eachMovie} key={eachMovie.id} />
          ))}
        </ul>
        <div className="pagination-cont">
          <button onClick={this.onClickPrev}>Prev</button>
          <div className="page">{activePage}</div>
          <button onClick={this.onClickNext}>Next</button>
        </div>
      </div>
    )
  }

  renderOriginalsCarousel = () => {
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
    return (
      <div className="trending-container">
        <Header />
        {this.renderOriginalsCarousel()}
      </div>
    )
  }
}

export default TopRated

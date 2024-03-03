import {Component} from 'react'
import FailureView from '../FailureView'
import Loading from '../Loading'
import Header from '../Header'
import MovieDetailsLink from '../MovieDetailsLink'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    popularMovieList: [],
    activePage: 1,
  }

  componentDidMount() {
    this.getPopularMovies()
  }

  getPopularMovies = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {activePage} = this.state

    const apiKey = 'a58fe6e8cf6d8d65b061af330efe5072'
    const popularMovieApi = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=${activePage}`
    const response = await fetch(popularMovieApi)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.results.map(eachMovie => ({
        backdropPath: eachMovie.backdrop_path,
        id: eachMovie.id,
        posterPath: eachMovie.poster_path,
        title: eachMovie.title,
        voteAvg: eachMovie.vote_average,
      }))

      this.setState({
        popularMovieList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onClickPrev = () => {
    const {activePage} = this.state
    if (activePage > 1) {
      this.setState(
        prev => ({activePage: prev.activePage - 1}),
        this.getPopularMovies,
      )
    }
  }

  onClickNext = () => {
    const {activePage} = this.state
    if (activePage < 500) {
      this.setState(
        prev => ({activePage: prev.activePage + 1}),
        this.getPopularMovies,
      )
    }
  }

  renderSuccessView = () => {
    const {popularMovieList, activePage} = this.state
    return (
      <div className="movie-cont">
        <ul className="popular-list">
          {popularMovieList.map(eachMovie => (
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

  onClickRetry = () => {
    this.getPopularMovies()
  }

  renderFailureView = () => <FailureView onClickRetry={this.onClickRetry} />

  renderLoadingView = () => <Loading />

  renderPopularPageView = () => {
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
      <div className="popular-container">
        <Header />
        {this.renderPopularPageView()}
      </div>
    )
  }
}

export default Home

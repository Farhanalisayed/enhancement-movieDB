import {Component} from 'react'
import Loading from '../Loading'

import Header from '../Header'
import MovieDetailsLink from '../MovieDetailsLink'
import FailureView from '../FailureView'

import './index.css'

const searchRoute = true

const renderConstraints = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  fail: 'FAIL',
  loading: 'LOADING',
}

class Search extends Component {
  state = {
    searchResultsList: [],
    renderStatus: renderConstraints.initial,
    searchValue: '',
  }

  getSearchMoviesData = async searchValue => {
    this.setState({renderStatus: renderConstraints.loading})
    const apiKey = 'a58fe6e8cf6d8d65b061af330efe5072'
    const searchApi = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${searchValue}&page=1`
    const response = await fetch(searchApi)
    if (response.ok) {
      const data = await response.json()
      const fetchedSearchMoviesData = data.results.map(eachMovie => ({
        backdropPath: eachMovie.backdrop_path,
        id: eachMovie.id,
        posterPath: eachMovie.poster_path,
        title: eachMovie.title,
      }))
      this.setState({
        searchResultsList: fetchedSearchMoviesData,
        renderStatus: renderConstraints.success,
        searchValue,
      })
    } else {
      this.setState({renderStatus: renderConstraints.fail})
    }
  }

  renderSuccessView = () => {
    const {searchResultsList} = this.state
    return searchResultsList.length > 0 ? (
      <ul className="search-items">
        {searchResultsList.map(eachMovie => (
          <MovieDetailsLink movieDetails={eachMovie} key={eachMovie.id} />
        ))}
      </ul>
    ) : (
      this.renderNoResultsView()
    )
  }

  renderNoResultsView = () => {
    const {searchValue} = this.state

    return (
      <div className="no-results-view">
        <img
          className="no-results-img"
          alt="no movies"
          src="https://res.cloudinary.com/dkbxi5qts/image/upload/v1660153718/movies%20prime%20app/No_Views_awtv8d.svg"
        />
        <p className="no-results-text">
          Your search for {searchValue} did not find any matches.
        </p>
      </div>
    )
  }

  renderLoaderView = () => <Loading />

  tryAgainSearchData = () => {
    this.getSearchMoviesData()
  }

  renderFailureView = () => <FailureView tryAgain={this.tryAgainSearchData} />

  renderSwitchView = () => {
    const {renderStatus} = this.state
    switch (renderStatus) {
      case renderConstraints.loading:
        return this.renderLoaderView()
      case renderConstraints.success:
        return this.renderSuccessView()
      case renderConstraints.fail:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="bg-color">
        <Header
          getSearchMoviesData={this.getSearchMoviesData}
          searchRoute={searchRoute}
        />
        <div className="search-container">{this.renderSwitchView()}</div>
      </div>
    )
  }
}
export default Search

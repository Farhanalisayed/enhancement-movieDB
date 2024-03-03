import {Component} from 'react'
import {Link} from 'react-router-dom'

import './index.css'

class Header extends Component {
  state = {fullMenu: false, searchValue: ''}

  menuShow = () => {
    this.setState({fullMenu: true})
  }

  menuHide = () => {
    this.setState({fullMenu: false})
  }

  getSearchInput = event => {
    this.setState({searchValue: event.target.value})
  }

  onSearch = () => {
    const {getSearchMoviesData} = this.props
    const {searchValue} = this.state
    if (searchValue !== '') {
      getSearchMoviesData(searchValue)
    }
  }

  render() {
    const {fullMenu, searchValue} = this.state
    const {searchRoute, isHome, isPopular, isAccount} = this.props
    const searchContainer = searchRoute
      ? 'search-input-route-container search-input-container'
      : 'search-input-container'
    const homeRoute = isHome ? 'menu-items highlight' : 'menu-items'
    const popularRoute = isPopular ? 'menu-items highlight' : 'menu-items'
    const accountRoute = isAccount ? 'menu-items highlight' : 'menu-items'

    return (
      <nav className="nav-bar">
        <div className="header">
          <Link to="/" className="img-link">
            <h1>movieDB</h1>
          </Link>
          <ul className="show-menu show1">
            <Link to="/" className={homeRoute}>
              <li>Popular</li>
            </Link>
            <Link to="/top-rated" className={popularRoute}>
              <li>Top Rated</li>
            </Link>
            <Link to="/upcoming" className={popularRoute}>
              <li>Upcoming</li>
            </Link>
          </ul>
        </div>
        <div className={searchContainer}>
          <input
            value={searchValue}
            onChange={this.getSearchInput}
            placeholder="Search"
            type="text"
            className="search-input"
          />
          <button onClick={this.getSearchInput} type='button'>Search</button>
        </div>

        <nav className="show">
          {fullMenu && (
            <ul className="show-menu">
              <Link to="/" className={homeRoute}>
                <li>Popular</li>
              </Link>
              <Link to="/top-rated" className={popularRoute}>
                <li>Top Rated</li>
              </Link>
              <Link to="/upcoming" className={accountRoute}>
                <li>Upcoming</li>
              </Link>
            </ul>
          )}
        </nav>
      </nav>
    )
  }
}
export default Header

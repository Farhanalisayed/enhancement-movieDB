import {Switch, Route, Redirect} from 'react-router-dom'

import Home from './components/Home'
import NotFound from './components/NotFound'
import Search from './components/Search'
import Upcoming from './components/Upcoming'
import TopRated from './components/TopRated'
import MovieDetailsView from './components/MovieDetailsView'

import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/top-rated" component={TopRated} />
    <Route exact path="/upcoming" component={Upcoming} />
    <Route exact path="/search" component={Search} />
    <Route exact path="/movies/:id" component={MovieDetailsView} />
    <Route path="/not-found" component={NotFound} />
    <Redirect to="not-found" />
  </Switch>
)

export default App

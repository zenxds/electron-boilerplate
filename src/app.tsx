import React, { Component, ReactElement } from 'react'
import {
  // BrowserRouter as Router
  HashRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import { hot } from 'react-hot-loader'

import './less/antd.less'
import './less/app.less'

import Main from './containers/main'

class App extends Component {
  render(): ReactElement {
    return (
      <Router>
        <Switch>
          <Route path="/" component={Main} />
        </Switch>
      </Router>
    )
  }
}

export default hot(module)(App)

import React, { Component, ReactElement } from 'react'
import {
  // BrowserRouter as Router
  HashRouter as Router,
  Switch,
  Route
} from 'react-router-dom'

import './less/antd.less'
import './less/app.less'

import Main from './containers/main'

export default class App extends Component {
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

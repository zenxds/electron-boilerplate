import { hot } from 'react-hot-loader/root'
import { setConfig } from 'react-hot-loader'
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

const App = () => (
  <Router>
    <Switch>
      <Route path="/" component={Main} />
    </Switch>
  </Router>
)

setConfig({ logLevel: 'debug'})
export default hot(App)

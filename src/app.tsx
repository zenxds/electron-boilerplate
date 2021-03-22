import React, { Component, ReactElement } from 'react'
import {
  // BrowserRouter as Router
  HashRouter as Router,
  Switch,
  Route
} from 'react-router-dom'

import './less/antd.less'
import './less/app.less'
import './update'

import paths from '@constants/paths'
import Menu from '@components/Menu'
import Main from './containers/main'

export default class App extends Component {
  render(): ReactElement {
    return (
      <Router>
        <Menu />
        <Switch>
          <Route path={paths.main} exact component={Main} />
        </Switch>
      </Router>
    )
  }
}

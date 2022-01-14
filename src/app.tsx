import React, { Component, ReactElement } from 'react'
import {
  // BrowserRouter as Router
  HashRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'
import { Layout } from 'antd'

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
        <Layout>
          <Layout.Sider>
            <Menu />
          </Layout.Sider>
          <Layout.Content>
            <Switch>
              <Route path={paths.main} exact component={Main} />
              <Route path="/" exact>
                <Redirect to={paths.main} />
              </Route>
            </Switch>
          </Layout.Content>
        </Layout>
      </Router>
    )
  }
}

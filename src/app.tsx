import React, { Component, ReactElement } from 'react'
import {
  // BrowserRouter as Router
  HashRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'
import { Layout, Spin } from 'antd'
import loadable from '@loadable/component'

import './less/antd.less'
import './less/app.less'
import './update'

import paths from '@constants/paths'
import Menu from '@components/Menu'

function load(page: string) {
  return loadable(() => import(`./containers/${page}`), {
    fallback: (
      <Spin>
        <div className="container"></div>
      </Spin>
    ),
  })
}

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
              <Route path={paths.main} exact component={load('main')} />
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

import { Component } from 'react'
import { Modal } from 'antd'
import {
  // BrowserRouter as Router
  HashRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom'

import './less/antd.less'
import './less/app.less'

import Home from './container/home'

class App extends Component {

  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
        </Switch>
      </Router>
    )
  }
}

export default App

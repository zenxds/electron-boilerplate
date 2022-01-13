import React, { Component, Fragment, ReactElement } from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { Menu } from 'antd'

import paths, { PathKeys } from '@constants/paths'

interface IState {
  current: PathKeys
}

class AppMenu extends Component<RouteComponentProps, IState> {
  constructor(props: RouteComponentProps) {
    super(props)

    this.state = {
      current: 'main'
    }
  }

  handleClick = (e: any): void => {
    this.setState({
      current: e.key as PathKeys
    })

    this.props.history.push(paths[e.key as PathKeys])
  }

  render(): ReactElement {
    return (
      <Fragment>
        <Menu
          onClick={this.handleClick}
          selectedKeys={[this.state.current]}
          mode="inline"
          theme="dark"
        >
          <Menu.Item key="main">首页</Menu.Item>
        </Menu>
      </Fragment>
    )
  }
}

export default withRouter(AppMenu)

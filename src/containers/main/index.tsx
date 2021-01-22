import React, { Component, ReactElement } from 'react'
import { observer, inject } from 'mobx-react'

import * as decorators from '@decorators'

import Form from './components/Form'
import actions from './actions'
import store from './store'
import './less/styles.less'

@decorators.provider({
  actions,
  store
})
@inject('store', 'actions')
@observer
class Main extends Component<Main.CommonProps> {
  render(): ReactElement {
    return (
      <div styleName="container">
        <Form />
      </div>
    )
  }
}

export default Main

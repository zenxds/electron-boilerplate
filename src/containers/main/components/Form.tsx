import React, { Component, ReactElement } from 'react'
import { inject, observer } from 'mobx-react'
import { Form, Input, Button } from 'antd'
import { FormInstance } from 'antd/es/form'

const formItemLayout = {
  labelCol: {
    span: 8
  },
  wrapperCol: {
    span: 16
  }
}

const tailFormItemLayout = {
  wrapperCol: {
    span: 16,
    offset: 8
  }
}

@inject('store', 'actions')
@observer
export default class MainForm extends Component<Main.CommonProps> {
  formRef = React.createRef<FormInstance>()

  handleFinish = (values: any): void => {
    console.log(values)
  }

  render(): ReactElement {
    const { store } = this.props

    return (
      <Form ref={this.formRef} {...formItemLayout} onFinish={this.handleFinish}>
        <Form.Item label="字段1" name="field1" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
          <Button
            type="primary"
            htmlType="submit"
            loading={store.isLoading}
          >
            提交
          </Button>
        </Form.Item>
      </Form>
    )
  }
}

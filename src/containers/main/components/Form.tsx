import React, { Component, ReactElement, FormEvent } from 'react'
import { inject, observer } from 'mobx-react'
import { Form, Input, Button } from 'antd'
import { FormComponentProps } from 'antd/lib/form/Form'

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 }
  }
}

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0
    },
    sm: {
      span: 16,
      offset: 8
    }
  }
}

@inject('store', 'actions')
@observer
class MainForm extends Component<Main.CommonProps & FormComponentProps> {
  handleSubmit = (event: FormEvent): void => {
    event.preventDefault()

    const { form } = this.props
    form.validateFields(
      (err: boolean, values): void => {
        if (err) {
          return
        }

        console.log(values)
      }
    )
  }

  render(): ReactElement {
    const { form, store } = this.props
    const { getFieldDecorator } = form

    return (
      <Form {...formItemLayout} onSubmit={this.handleSubmit}>
        <Form.Item label="字段1">
          {getFieldDecorator('field1', {
            initialValue: undefined,
            rules: [
              {
                required: true,
                message: '请输入字段1'
              }
            ]
          })(<Input />)}
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

export default Form.create({ name: 'mainForm' })(MainForm)

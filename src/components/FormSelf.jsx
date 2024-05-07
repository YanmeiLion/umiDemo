import React from 'react'
import { Form, Input, Button, Checkbox } from 'antd';

export default function FormSelf() {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log('onfinish:', values);
  };
  const sureBtn = () => {
    console.log(":确定按钮")
    form.submit();
  }

  const setDefautlValue = () => {
    console.log('默认属性')
  }

  return (
    <div>
      <h3 style={{marginTop: '50px'}}>form表单</h3>
      <Button onClick={sureBtn} >确定</Button>

      <Form
        name="basic"
        form={form}
        labelCol={{ span: 0 }}
        wrapperCol={{ span: 6 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
        defaultValue={setDefautlValue}
        initialValues={{
          password: '1111'
        }}
      >
        <Form.Item
          label="Username"
          name="username"
          initialValue={'yanmei'}
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>

    </div>
  )
}

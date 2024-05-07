import {
  Button,
  Cascader,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Switch,
  TreeSelect,
} from 'antd';
import React, { useState } from 'react';

const emailsOption = [
  {
    value: '已发送邮件',
    label: '已发送邮件',
    children: [
      {
        value: 'email_send',
        label: '已发送邮件次数',
      },
    ],
  },
  {
    value: '邮件投诉',
    label: '邮件投诉',
    children: [
      {
        value: 'email_complaint',
        label: '邮件投诉数量',
      },
    ],
  },
  {
    value: '邮件打开',
    label: '邮件打开',
    children: [
      {
        value: 'email_view',
        label: '打开邮件次数',
      },
    ],
  },
  {
    value: '邮件点击',
    label: '邮件点击',
    children: [
      {
        value: 'email_click',
        label: '点击邮件内链接次数',
      },
    ],
  },
  {
    value: '邮件购买',
    label: '邮件购买',
    children: [
      {
        value: 'email_order_total',
        label: '邮件购买金额',
      },
      {
        value: 'email_order_count',
        label: '邮件购买订单数',
      },
    ],
  },
];

const App = () => {
  const [componentSize, setComponentSize] = useState('default');
  const [form] = Form.useForm();

  const onFormLayoutChange = (changedValues, { size }) => {
    console.log('changedValues', changedValues);
    setComponentSize(size);
  };

  const clickForm = () => {
    const btn = document.querySelectorAll('.submitIcon');
    console.log(btn);
    btn.forEach((element) => {
      element.click();
    });
  };

  return (
    <>
      <Form
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
        initialValues={{
          size: componentSize,
        }}
        onValuesChange={onFormLayoutChange}
        size={componentSize}
        // onFinish={onFinish}
      >
        <Form.Item
          label="Form Size"
          name="size"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Radio.Group>
            <Radio.Button value="small">Small</Radio.Button>
            <Radio.Button value="default">Default</Radio.Button>
            <Radio.Button value="large">Large</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          label="Input"
          name="input"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Select"
          name="select"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Select>
            <Select.Option value="demo">Demo</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="TreeSelect"
          name="tree"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <TreeSelect
            treeData={[
              {
                title: 'Light',
                value: 'light',
                children: [
                  {
                    title: 'Bamboo',
                    value: 'bamboo',
                  },
                ],
              },
            ]}
          />
        </Form.Item>
        <Form.Item
          label="Cascader"
          name="cascader"
          rules={[
            {
              validator: async (rules, value) => {
                console.log('rules,', rules);
                console.log('value11111', value);
                if (!value?.length) {
                  throw new Error('请选择下面的内容哦哦哦哦哦！');
                }
              },
            },
          ]}
        >
          <Cascader options={emailsOption} />
        </Form.Item>
        <Form.Item
          name="data"
          label="DatePicker"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <DatePicker />
        </Form.Item>
        <Form.Item
          label="InputNumber"
          name="inputNumber"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          label="switch"
          name="cascader"
          valuePropName="checked"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Switch />
        </Form.Item>
        {/* <Form.Item label="Button">
        <Button onClick={() => form.submit()}>Button</Button>
      </Form.Item> */}

        {/* <Form.Item label="Button">
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item> */}

        <Form.Item label="Button">
          <Button type="primary" htmlType="submit" className="submitIcon">
            Submit
          </Button>
        </Form.Item>
      </Form>

      <Button type="primary" onClick={clickForm}>
        点击触发form表单
      </Button>
    </>
  );
};

export default App;

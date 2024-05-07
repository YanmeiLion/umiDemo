import React, { useEffect, useState } from 'react';

import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { Button, Form, Input, Select, Space, Cascader } from 'antd';
const { Option } = Select;

import style from './index.less';

const areas = [
  {
    label: 'Beijing',
    value: 'Beijing',
  },
  {
    label: 'Shanghai',
    value: 'Shanghai',
  },
];
const areaObj = ['订阅', '手动添加', '弹框导入'];

// 邮件行为标签 email
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

export default function index() {
  const [form] = Form.useForm();

  const [secondFloor, setSecondFloor] = useState([]);

  useEffect(() => {
    console.log('useEffect');
    form.setFieldsValue({ one: [''] });
  }, []);

  const onFinish = (values) => {
    console.log('form 完成:', values);
  };

  const onValuesChange = (value) => {
    console.log('value', value);
  };

  const addNewFormList = () => {
    const num = secondFloor?.length;
    switch (num) {
      case 0:
        setSecondFloor([...secondFloor, 'two']);
        form.setFieldsValue({ two: [''] });
        break;
      case 1:
        setSecondFloor([...secondFloor, 'three']);
        form.setFieldsValue({ three: [''] });
        break;
      case 2:
        setSecondFloor([...secondFloor, 'four']);
        form.setFieldsValue({ four: [''] });
        break;
      case 3:
        setSecondFloor([...secondFloor, 'five']);
        form.setFieldsValue({ five: [''] });
        break;
      default:
        break;
    }
    // setSecondFloor(
    //   Array.from({ length: secondFloor.length + 1 }, (v, i) => i + 1),
    // )
  };

  return (
    <div className={style.contentDiv}>
      <Form
        form={form}
        name="dynamic_form_nest_item"
        onFinish={onFinish}
        autoComplete="off"
        className={style.formBox}
        onValuesChange={onValuesChange}
      >
        <div className={style.oneList}>
          <div className={style.hrLine}>
            <div className={style.checkbtn}>且</div>
          </div>

          <Form.List name="one" className={style.oneFormList}>
            {(fields, { add, remove }) => (
              <>
                {fields.map((field) => (
                  <Space key={field.key} align="baseline">
                    <Form.Item
                      noStyle
                      shouldUpdate={(prevValues, curValues) =>
                        // {
                        //   console.log('one', prevValues, curValues);
                        // }
                        prevValues.one !== curValues.one
                      }
                    >
                      {() => (
                        <>
                          <Form.Item
                            {...field}
                            label="name"
                            name={[field.name, 'name']}
                            rules={[
                              {
                                required: true,
                                message: '请输入',
                              },
                            ]}
                          >
                            <Select style={{ width: 130 }}>
                              {areaObj?.map((item) => (
                                <Option key={item} value={item}>
                                  {item}
                                </Option>
                              ))}
                            </Select>
                          </Form.Item>
                        </>
                      )}
                    </Form.Item>
                    <Form.Item
                      {...field}
                      label="Price"
                      name={[field.name, 'price']}
                      rules={[
                        {
                          required: true,
                          message: '请输入',
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>

                    <PlusOutlined onClick={add} />
                    <DeleteOutlined onClick={() => remove(field.name)} />
                  </Space>
                ))}
              </>
            )}
          </Form.List>
        </div>

        <Form.Item name="email">
          <Cascader
            changeOnSelect={true}
            options={emailsOption}
            placeholder="请选择筛选条件"
            style={{ width: 280, height: 36 }}
          />
        </Form.Item>

        {secondFloor.length > 0 &&
          secondFloor?.map((item) => {
            return (
              <Form.List name={item} key={item}>
                {/* <Form.List name="two" key={item}> */}
                {(fields, { add, remove }) => (
                  <>
                    {fields.map((field) => (
                      <Space key={field.key} align="baseline">
                        <Form.Item
                          noStyle
                          shouldUpdate={(prevValues, curValues) =>
                            // {
                            //   console.log('list', prevValues, curValues);
                            // }
                            prevValues.item !== curValues.item
                          }
                        >
                          {() => (
                            <>
                              <Form.Item
                                {...field}
                                label="name"
                                name={[field.name, 'name']}
                                rules={[
                                  {
                                    required: true,
                                    message: '请输入',
                                  },
                                ]}
                              >
                                <Select style={{ width: 130 }}>
                                  {areaObj?.map((item) => (
                                    <Option key={item} value={item}>
                                      {item}
                                    </Option>
                                  ))}
                                </Select>
                              </Form.Item>
                            </>
                          )}
                        </Form.Item>
                        <Form.Item
                          {...field}
                          label="Price"
                          name={[field.name, 'price']}
                          rules={[
                            {
                              required: true,
                              message: '请输入',
                            },
                          ]}
                        >
                          <Input />
                        </Form.Item>

                        <PlusOutlined onClick={add} />
                        <DeleteOutlined onClick={() => remove(field.name)} />
                      </Space>
                    ))}
                  </>
                )}
              </Form.List>
            );
          })}

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>

      <Button onClick={addNewFormList}>添加</Button>
    </div>
  );
}

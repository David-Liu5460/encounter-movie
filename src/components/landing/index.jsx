import React from 'react';
import { Form, Input, Button, Checkbox } from 'antd';

import './index.scss';

function Landing(props) {
  const onFinish = (values) => {
    console.log('Success:', values);
    props.setIsLanding(true);
    props.setSharedValue(values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="landing">
      <div>
        <img 
        className={"landing-img"}
        src="https://img.alicdn.com/imgextra/i4/O1CN01uRN6o7265QlhMYQBV_!!6000000007610-2-tps-1200-1040.png" alt=""/>
      </div>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="username"
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
  );
}

export default Landing;

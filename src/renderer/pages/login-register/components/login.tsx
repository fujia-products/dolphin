import React from 'react';
import { Form, Input } from 'antd';

const Item = Form.Item;

export const Login = () => {
  return (
    <Form>
      <Item>
        <Input type="text" placeholder="请输入用户名" />
      </Item>
      <Item>
        <Input type="password" placeholder="请输入密码" />
      </Item>
    </Form>
  );
};

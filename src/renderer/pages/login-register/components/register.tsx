import React from 'react';
import { Form, Input } from 'antd';

const Item = Form.Item;

export const Register = () => {
  return (
    <Form>
      <Item>
        <Input type="text" placeholder="请输入注册用户名" />
      </Item>
      <Item>
        <Input type="password" placeholder="请输入密码" />
      </Item>
    </Form>
  );
};

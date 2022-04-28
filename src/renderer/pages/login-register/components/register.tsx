import React from 'react';
import { Form, Input, Button } from 'antd';

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
      <Button block type="primary">
        立即注册
      </Button>
    </Form>
  );
};

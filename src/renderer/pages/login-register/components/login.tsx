import React from 'react';
import { Form, Input, Button, message } from 'antd';
import { useNavigate } from 'react-router';

import { useAppDispatch } from '@store/hooks';
import { login } from '../service';
import { setUserInfo } from '@store/global.slice';

const Item = Form.Item;

export const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handleLogin = () => {
    login({
      username: 'sunny',
      password: '123',
    })
      .then((res) => {
        message.success('登录成功');
        dispatch(
          setUserInfo({
            payload: {
              username: 'sunny',
              avatar:
                'https://images-1254102905.cos.ap-shanghai.myqcloud.com/articles/amine-m-siouri-xnxqvCX_EJE-unsplash.png',
            },
          })
        );
        navigate('/');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Form>
      <Item>
        <Input type="text" placeholder="请输入用户名" />
      </Item>
      <Item>
        <Input type="password" placeholder="请输入密码" />
      </Item>
      <Button block type="primary" onClick={handleLogin}>
        立即登录
      </Button>
    </Form>
  );
};

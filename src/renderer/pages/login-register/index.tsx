import React from 'react';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useNavigate } from 'react-router';
import { useLocation } from 'react-router-dom';

import { Container, LoginCard } from './styles';
import { Login } from './components/login';
import { Register } from './components/register';

export const LoginAndRegisterPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const handleBack = () => {
    navigate('/');
  };

  const isRegister = location.pathname === '/register';

  return (
    <Container>
      <ArrowLeftOutlined onClick={handleBack} style={{ position: 'absolute', top: 24, left: 24, fontSize: 18 }} />
      <LoginCard>
        {isRegister ? <Register /> : <Login />}
        <Button block type="primary">
          {isRegister ? '立即注册' : '立即登录'}
        </Button>
      </LoginCard>
    </Container>
  );
};

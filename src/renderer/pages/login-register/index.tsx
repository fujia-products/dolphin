import React from 'react';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Button, Card } from 'antd';
import { useNavigate } from 'react-router';
import { useLocation } from 'react-router-dom';

import { Container } from './styles';
import { Login } from './components/login';
import { Register } from './components/register';

export const LoginAndRegisterPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const handleBack = () => {
    navigate('/');
  };

  const isRegister = location.pathname === '/register';

  const handleTogglePanel = () => {
    if (isRegister) {
      navigate('/login');
    } else {
      navigate('/register');
    }
  };

  return (
    <Container>
      <ArrowLeftOutlined onClick={handleBack} style={{ position: 'absolute', top: 24, left: 24, fontSize: 18 }} />
      <Card style={{ width: 360, margin: '0 auto' }}>
        {isRegister ? <Register /> : <Login />}
        <Button type="text" onClick={handleTogglePanel}>
          去{isRegister ? '登录' : '注册'}
        </Button>
      </Card>
    </Container>
  );
};

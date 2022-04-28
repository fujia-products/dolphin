import React from 'react';
import { useNavigate } from 'react-router';
import { shell } from 'electron';
import { Layout, Menu, Avatar } from 'antd';
import { useDocumentTitle, useMounted } from '@fujia/hooks';

import { Logo, UserOperate } from './styles';
import { bootstrapUser } from './service';
import { useAppDispatch } from '@store/hooks';
import { setUserInfo } from '@store/global.slice';

console.log(Logo);

const { Header, Content, Footer } = Layout;

const NAVIGATION_LIST = [
  {
    key: 'develop',
    label: '开发',
  },
  {
    key: 'tools',
    label: '工具',
  },
  {
    key: 'services',
    label: '服务',
  },
  {
    key: 'applications',
    label: '应用',
  },
];

import { useAppSelector } from '@store/hooks';
import { selectUser } from '@store/global.slice';
import { User } from '@pages/login-register/service';
// import { getAppPath } from '@utils/appPath';

export const Home = () => {
  const curUser = useAppSelector<User | null>(selectUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  // const [appPath, setAppPath] = useState('');
  useDocumentTitle('Dolphin | All From Love');

  useMounted(() => {
    if (curUser) return;

    bootstrapUser().then((data) => {
      if (data) {
        dispatch(setUserInfo(data));
      }
    });
  });

  const handleLink = (routeName: string) => {
    return () => {
      if (routeName === 'login') {
        navigate('/login');
      } else if (routeName === 'register') {
        navigate('/register');
      } else if (routeName === 'github') {
        shell.openExternal('https://github.com/fushenguang/marathon');
      }
    };
  };

  const handleLogoClick = () => {
    navigate('/');
  };

  return (
    <Layout>
      <Header className="home-header" style={{ position: 'fixed' }}>
        <Logo onClick={handleLogoClick} />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['develop']} items={NAVIGATION_LIST} />
        {!curUser ? (
          <UserOperate>
            <span className="login" onClick={handleLink('login')}>
              登录
            </span>
            <span className="separator">/</span>
            <span className="register" onClick={handleLink('register')}>
              注册
            </span>
          </UserOperate>
        ) : (
          <Avatar size={40} src={curUser.avatar || ''} />
        )}
      </Header>
      <Content className="home-main">
        <h1>content</h1>
      </Content>
      <Footer className="home-footer">Dolphin ©2022 Created by Fujia.site</Footer>
    </Layout>
  );
};

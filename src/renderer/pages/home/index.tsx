import React from 'react';
import { useNavigate } from 'react-router';
import { shell } from 'electron';
import { Layout, Menu, Avatar } from 'antd';
import { useDocumentTitle } from '@fujia/hooks';

import { Logo, PageHeader, UserOperate, PageContent, PageFooter } from './styles';

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
// import { getAppPath } from '@utils/appPath';

export const Home = () => {
  const curUser = useAppSelector(selectUser);
  const navigate = useNavigate();
  // const [appPath, setAppPath] = useState('');
  useDocumentTitle('Dolphin | All From Love');

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
      <PageHeader style={{ position: 'fixed' }}>
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
          <Avatar size={40} />
        )}
      </PageHeader>
      <PageContent>
        <h1>content</h1>
      </PageContent>
      <PageFooter>Dolphin ©2022 Created by Fujia.site</PageFooter>
    </Layout>
  );
};

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { shell } from 'electron';
import { Layout, Menu, Breadcrumb, Avatar } from 'antd';
import { useDocumentTitle } from '@fujia/hooks';

import { Logo, PageHeader, PageContent, PageFooter } from './styles';

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

// import { useAppSelector } from '@store/hooks';
// import { selectAppName } from '@store/globalSlice';
// import { getAppPath } from '@utils/appPath';

export const Home = () => {
  // const appName = useAppSelector(selectAppName);
  const navigate = useNavigate();
  // const [appPath, setAppPath] = useState('');
  useDocumentTitle('Dolphin | All From Love');

  const handleLink = (routeName: string) => {
    return () => {
      if (routeName === 'login') {
        navigate('/login');
      } else if (routeName === 'github') {
        shell.openExternal('https://github.com/fushenguang/marathon');
      }
    };
  };

  // useEffect(() => {
  //   getAppPath().then((rootPath: string) => {
  //     if (rootPath) {
  //       setAppPath(rootPath);
  //     }
  //   });
  // }, []);
  const handleLogoClick = () => {
    navigate('/');
  };

  return (
    <Layout>
      <PageHeader style={{ position: 'fixed' }}>
        <Logo onClick={handleLogoClick} />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['develop']} items={NAVIGATION_LIST} />
        <Avatar size={40} />
      </PageHeader>
      <PageContent>
        <h1>content</h1>
      </PageContent>
      <PageFooter>Dolphin ©2022 Created by Fujia.site</PageFooter>
    </Layout>
  );
};

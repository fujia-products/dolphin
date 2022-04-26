import styled from 'styled-components';
import { Layout } from 'antd';

import logoUrl from '@assets/images/logo.svg';
const { Header, Content, Footer } = Layout;

export const Logo = styled.div`
  width: 84px;
  height: 48px;
  background-image: url(${logoUrl});
  background-size: cover;
  cursor: pointer;
`;

export const PageHeader = styled(Header)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1;
  width: 100%;
`;

export const PageContent = styled(Content)`
  margin-top: 50px;
  min-height: calc(100vh - 100px);
  width: 100vw;
  padding: 32px 50px;
`;

export const PageFooter = styled(Footer)`
  height: 50px;
  line-height: 50px;
  padding: 0;
  text-align: center;
`;

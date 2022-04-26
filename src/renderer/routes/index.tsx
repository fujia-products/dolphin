import React from 'react';
import { HashRouter, Route, Routes, Navigate } from 'react-router-dom';

import { Home } from '@pages/home';
// import Counter from '@pages/Counter';
import { LoginAndRegisterPage } from '@pages/login-register';
import { ROUTER } from './constants';

const Router = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path={ROUTER.home} element={<Home />} />
        <Route path={ROUTER.login} element={<LoginAndRegisterPage />} />
        <Route path={ROUTER.register} element={<LoginAndRegisterPage />} />
        {/* <Route path={ROUTER.counter} element={<Counter />} /> */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </HashRouter>
  );
};

export default Router;

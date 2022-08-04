import { Outlet, Link, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Header from '../Header/Header';
import './Layout.scss';

function Layout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default Layout;

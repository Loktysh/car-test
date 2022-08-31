import { Outlet } from 'react-router-dom';
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

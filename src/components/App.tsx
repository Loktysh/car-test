import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './Layout/Layout';
import NotFoundPage from './NotFoundPage';
import CoinPage from './CoinPage/CoinPage';
import CoinsListPage from './CoinsListPage/CoinsListPage';
import Wallet from './Wallet/Wallet';

export const App: React.FC = () => {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Navigate to='coins?page=0' />} />
        <Route path='wallet' element={<Wallet />} />
        <Route path='coins' element={<CoinsListPage />} />
        <Route path='coin/:id' element={<CoinPage />} />
        <Route path='*' element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};

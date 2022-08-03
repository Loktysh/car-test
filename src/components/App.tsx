import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './Commons/Layout/Layout';
import NotFoundPage from './Commons/NotFoundPage';
import CoinPage from './Commons/CoinPage/CoinPage';
import CoinsListPage from './Commons/CoinsListPage/CoinsListPage';

export const App: React.FC = () => {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Navigate to='coins?page=0' />} />
        <Route path='coins' element={<CoinsListPage />} />
        <Route path='coin/:id' element={<CoinPage />} />
        <Route path='*' element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};

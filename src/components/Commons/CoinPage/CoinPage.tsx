import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import NotFoundPage from '../NotFoundPage';

const CoinPage = () => {
  const { id } = useParams();
  return <h1>Coin id - {id}</h1>;
};

export default CoinPage;

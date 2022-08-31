import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { walletAmountDiff } from '../../utils';
import NotFoundPage from '../NotFoundPage';
import './Header.scss';
import TopCurrencies from './TopCurrencies';

const Header = () => {
  const navigate = useNavigate();
  const initialAmount = useSelector(state => state.wallet);
  const [loading, setLoading] = useState(true);
  const [amountDiff, setAmountDiff] = useState('');
  const getCoins = useCallback(async () => {
    await walletAmountDiff(initialAmount).then(diff => {
      setAmountDiff(diff);
      console.log('diff seted', diff);
    });
    setLoading(false);
  }, []);
  useEffect(() => {
    setLoading(true);
    getCoins();
  }, []);
  return (
    <header>
      <div className='header'>
        {/* <button className='header__link'>
            <Link to='/profile'>Profile {!loading && amountDiff}</Link>
          </button> */}
        <TopCurrencies />
        <button
          className='header__wallet wallet-btn'
          onClick={() => navigate(`/wallet`, { replace: false })}
        >
          Wallet
        </button>
        <p className='header__diff'>{!loading && amountDiff}</p>
      </div>
    </header>
  );
};

export default Header;

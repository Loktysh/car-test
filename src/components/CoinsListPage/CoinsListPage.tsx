import { useEffect, useState, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getCoinsList } from '../../utils/index';
import Spinner from '../Spinner/Spinner';
import Pagination from './Pagination';
import './CoinsListPage.scss';
import CoinCard from '../CoinCard/CoinCard';
import { CoinData } from '../../types';

function CoinsListPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const initialPage = searchParams.get('page') ? parseInt(searchParams.get('page') as string) : 0;
  const [page, setPage] = useState(initialPage);
  const getCoins = useCallback(async () => {
    await getCoinsList(page).then(coins => {
      setCoins(coins.data);
    });
    setLoading(false);
  }, [page]);
  useEffect(() => {
    setLoading(true);
    getCoins();
  }, [getCoins, searchParams, page]);
  return (
    <div className='coins-container'>
      <h1 key={'title'}>All coins:</h1>
      <div className='table'>
        <div className='table__head table__row'>
          <div className='table__item table__rank'>Rank</div>
          <div className='table__item table__name'>Name</div>
          <div className='table__item table__price'>Price</div>
          <div className='table__item table__volume'>Volume 24H</div>
          <div className='table__item table__cap'>Market Cap</div>
        </div>
        {loading ? (
          <Spinner />
        ) : (
          coins.map((e: CoinData) => {
            return <CoinCard key={e.id} {...e} />;
          })
        )}
      </div>
      <Pagination setPage={setPage} currentPage={page} />
    </div>
  );
}

export default CoinsListPage;

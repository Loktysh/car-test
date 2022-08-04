import { useCallback, useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { CoinData } from '../../types';
import { getCoinData } from '../../utils';
import NotFoundPage from '../NotFoundPage';
import './CoinPage.scss';

const CoinPage = () => {
  const { id } = useParams();
  const [coinData, setCoinData] = useState<CoinData | null>(null);
  const [loading, setLoading] = useState(true);
  const getCoin = useCallback(async () => {
    await getCoinData(id as string).then(coin => {
      setCoinData(coin.data);
    });
    setLoading(false);
  }, [id]);
  useEffect(() => {
    setLoading(true);
    getCoin();
  }, [getCoin]);
  return (
    <>
      {!loading && coinData && (
        <>
          <div className='coin'>
            <div>ID:</div>
            <div>{id}</div>
            <div>Rank:</div>
            <div>{coinData.rank}</div>
            <div>Name:</div>
            <div>
              {coinData.name} - {coinData.symbol}
            </div>
            <div>Rank:</div>
            <div>{coinData.rank}</div>
            <div>Supply:</div>
            <div>{coinData.supply}</div>
            <div>Max Supply:</div>
            <div>{coinData.maxSupply && 'no data'}</div>
            <div>Market cap:</div>
            <div>{coinData.marketCapUsd}</div>
            <div>Volume USD 24 Hr:</div>
            <div>{coinData.volumeUsd24Hr}</div>
            <div>Price:</div>
            <div>${coinData.priceUsd}</div>
            <div>Change in 24 Hr:</div>
            <div>{coinData.changePercent24Hr}%</div>
            <div>VWAP:</div>
            <div>{coinData.vwap24Hr}</div>
            <div>Explorer:</div>
            <div>{coinData.explorer}</div>
          </div>
          <div className='chart'></div>
        </>
      )}
      {!loading && !coinData && <NotFoundPage />}
    </>
  );
};

export default CoinPage;

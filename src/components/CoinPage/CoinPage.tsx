import { useCallback, useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { CoinData } from '../../types';
import { getCoinData, getCoinHistory } from '../../utils';
import NotFoundPage from '../NotFoundPage';
import './CoinPage.scss';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from 'recharts';

const CoinPage = () => {
  const { id } = useParams();
  const [coinData, setCoinData] = useState<CoinData | null>(null);
  const [coinHistory, setCoinHistory] = useState(null);
  const [loading, setLoading] = useState(true);
  const getCoin = useCallback(async () => {
    await getCoinData(id as string).then(coin => {
      setCoinData(coin.data);
    });
    await getCoinHistory(id as string).then(coin => {
      setCoinHistory(coin.data);
    });
    setLoading(false);
  }, [id]);
  useEffect(() => {
    setLoading(true);
    getCoin();
  }, [getCoin]);
  const formatXAxis = (time: string) => {
    const date = new Date(time);
    return (date + '').split(' ').slice(1, 3).join(', ');
  };
  return (
    <>
      <>
        {!loading && coinData && (
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
        )}
        {!loading && coinHistory && (
          <div className='chart'>
            <ResponsiveContainer width='100%' height='100%'>
              <LineChart width={600} height={400} data={coinHistory}>
                <Line type='monotone' dataKey='priceUsd' stroke='#8884d8' />
                <CartesianGrid stroke='#ccc' />
                <XAxis dataKey='time' label='time' tickFormatter={formatXAxis} />
                <YAxis />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </>

      {!loading && !coinData && <NotFoundPage />}
    </>
  );
};

export default CoinPage;

import { useCallback, useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { getCoinData } from '../../../utils';
import NotFoundPage from '../NotFoundPage';
import './CoinPage.scss';

const CoinPage = (props: any) => {
  const { id } = useParams();
  const [coinData, setCoinData] = useState([]);
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
      {!loading && (
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
        // "rank": "11",
        // "symbol": "DOGE",
        // "name": "Dogecoin",
        // "supply": "132670764299.8940900000000000",
        // "maxSupply": null,
        // "marketCapUsd": "8839728570.5130728437455431",
        // "volumeUsd24Hr": "92073264.9404348236508918",
        // "priceUsd": "0.0666290619275503",
        // "changePercent24Hr": "-1.7143664053580399",
        // "vwap24Hr": "0.0673219318256484",
        // "explorer": "http://dogechain.info/chain/Dogecoin"
      )}
    </>
  );
};

export default CoinPage;

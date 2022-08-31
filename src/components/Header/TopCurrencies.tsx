import React, { useEffect, useState } from 'react';
import { getCoinsList } from '../../utils';
import './TopCurrencies.scss';

const TopCurrencies = () => {
  const [currencies, setCurrencies] = useState({});
  useEffect(() => {
    async function fetchData() {
      const data = await getCoinsList(0, 3);
      setCurrencies(data);
    }
    fetchData();
  }, []);
  return (
    <div className='top-currencies'>
      {!Object.keys(currencies).length == 0 &&
        currencies.data.map((e, i) => {
          return (
            <div className='currency' key={i}>
              {e.name} {parseFloat(e.priceUsd).toFixed(2)}
            </div>
          );
        })}
    </div>
  );
};

export default TopCurrencies;

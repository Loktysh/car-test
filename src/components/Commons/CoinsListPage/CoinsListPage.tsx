import { useEffect, useState, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getCoinsList } from '../../../utils/index';
import Spinner from '../Spinner/Spinner';
import './CoinsListPage.scss';

function CoinsListPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);

  const getCoins = useCallback(async () => {
    await getCoinsList(1).then(coins => {
      console.log(coins);
      setCoins(coins.data);
    });
    setLoading(false);
  }, []);

  useEffect(() => {
    setLoading(true);
    getCoins();
  }, [getCoins, searchParams]);
  const ModalCoinAdd = (props: any) => {
    return (
      <div className='modal'>
        <div className='modal__content'>
          <p className='modal__text'></p>
          <input type='number' name='' id='' />
          <button>Submit</button>
          <button onClick={() => props.closeHandler()}>Χ</button>
        </div>
      </div>
    );
  };
  const CoinCard = (props: any) => {
    const [isModal, setModal] = useState(false);
    const { name, price, rank, volumeUsd24Hr, marketCapUsd } = {
      name: props.name,
      rank: props.rank,
      price:
        parseFloat(props.priceUsd) > 0
          ? parseFloat(props.priceUsd).toFixed(4)
          : parseFloat(props.priceUsd).toFixed(7),
      volumeUsd24Hr: parseInt(props.volumeUsd24Hr),
      marketCapUsd: parseInt(props.marketCapUsd),
    };
    return (
      <>
        {isModal && <ModalCoinAdd closeHandler={() => setModal(!isModal)} />}
        <div className='table__head table__row'>
          <div className='table__item table__rank'>{rank}</div>
          <div className='table__item table__name'>{name}</div>
          <div className='table__item table__price'>{price}</div>
          <div className='table__item table__volume'>{volumeUsd24Hr}</div>
          <div className='table__item table__cap'>{marketCapUsd}</div>
          <button onClick={() => setModal(!isModal)}>Add</button>
        </div>
      </>
    );
  };
  return (
    <div className='users-container'>
      <h1 key={'title'}>All coins:</h1>
      <div className='table'>
        <div className='table__head table__row'>
          <div className='table__item table__rank'>Rank</div>
          <div className='table__item table__name'>Name</div>
          <div className='table__item table__price'>Price</div>
          <div className='table__item table__volume'>Volume 24H</div>
          <div className='table__item table__cap'>Market Cap</div>
        </div>
      </div>
      {loading ? (
        <Spinner />
      ) : (
        coins.map((e: any) => {
          return <CoinCard key={e.id} {...e} />;
        })
      )}
    </div>
  );
}

export default CoinsListPage;

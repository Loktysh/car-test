import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CoinData } from '../../types';
import ModalCoinAdd from '../ModalCoinAdd/ModalCoinAdd';

const CoinCard = (props: CoinData) => {
  const navigate = useNavigate();
  const [isModal, setModal] = useState(false);
  const { name, price, rank, volumeUsd24Hr, marketCapUsd } = {
    name: props.name,
    rank: props.rank,
    price:
      parseFloat(props.priceUsd) > 0
        ? parseFloat(props.priceUsd.slice(0, 7))
        : parseFloat(props.priceUsd.slice(0, 5)),
    volumeUsd24Hr: parseInt(props.volumeUsd24Hr),
    marketCapUsd: parseInt(props.marketCapUsd),
  };
  console.log(typeof price);
  return (
    <>
      {isModal && (
        <ModalCoinAdd name={name} price={price} closeHandler={() => setModal(!isModal)} />
      )}
      <div
        className='table__head table__row'
        onClick={() => navigate(`/coin/${name.toLowerCase()}`, { replace: false })}
      >
        <div className='table__item table__rank'>{rank}</div>
        <div className='table__item table__name'>{name}</div>
        <div className='table__item table__price'>{price}</div>
        <div className='table__item table__volume'>{volumeUsd24Hr}</div>
        <div className='table__item table__cap'>{marketCapUsd}</div>
        <button
          onClick={e => {
            setModal(!isModal);
            e.stopPropagation();
          }}
        >
          Add
        </button>
      </div>
    </>
  );
};

export default CoinCard;

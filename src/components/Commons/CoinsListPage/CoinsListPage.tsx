import { useEffect, useState, useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getCoinsList } from '../../../utils/index';
import Spinner from '../Spinner/Spinner';
import './CoinsListPage.scss';

function CoinsListPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const initialPage = searchParams.get('page') ? parseInt(searchParams.get('page') as string) : 0;
  const [page, setPage] = useState(initialPage);
  const getCoins = useCallback(async () => {
    console.log('dth', page);
    console.log('dth', parseInt(searchParams.get('page') as string));
    await getCoinsList(page).then(coins => {
      setCoins(coins.data);
    });
    setLoading(false);
  }, [page, searchParams]);
 
  useEffect(() => {
    setLoading(true);
    getCoins();
  }, [getCoins, searchParams, page]);
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
    const navigate = useNavigate();
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
        {isModal && <ModalCoinAdd closeHandler={setModal(!isModal)} />}
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
          coins.map((e: any) => {
            return <CoinCard key={e.id} {...e} />;
          })
        )}
      </div>
      <Pagination setPage={setPage} currentPage={page} />
    </div>
  );
}
const Pagination = (props: any) => {
  const { setPage, currentPage } = props;
  const navigate = useNavigate();
  type PaginationDirection = 'next' | 'prev';
  const navHandler = (direction: PaginationDirection) => {
    if (direction === 'prev' && currentPage - 1 !== -1) {
      navigate(`/coins/?page=${currentPage - 1}`, { replace: false });
      setPage(currentPage - 1);
    }
    if (direction === 'next' && currentPage - 1 !== 99) {
      navigate(`/coins/?page=${currentPage + 1}`, { replace: false });
      setPage(currentPage + 1);
    }
  };
  return (
    <>
      <button onClick={() => navHandler('prev')}>Previous</button>
      <button onClick={() => navHandler('next')}>Next</button>
    </>
  );
};
export default CoinsListPage;

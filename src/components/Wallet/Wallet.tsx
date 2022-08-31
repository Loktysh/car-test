import './Wallet.scss';
import { useDispatch, useSelector } from 'react-redux';
import { remove } from '../../features/walletReducer';

const Wallet = () => {
  const dispatch = useDispatch();
  const walletData = Object.entries(useSelector(state => state.wallet)).filter(
    e => e[0] !== 'spendAmount',
  );
  return (
    <>
      <>
        {walletData &&
          walletData.map((c, i) => {
            return (
              <div key={i}>
                {c[0]}
                {c[1].history.map((e, i) => {
                  return (
                    <div key={i}>
                      {e.count} - {e.price}
                      <button
                        onClick={() =>
                          dispatch(remove({ name: c[0], count: e.count, price: e.price }))
                        }
                      >
                        Del
                      </button>
                    </div>
                  );
                })}
              </div>
            );
          })}
      </>
    </>
  );
};

export default Wallet;

import { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { add } from '../../features/walletReducer';
import { PropsModalCoin } from '../../types';
import './ModalCoinAdd.scss';

const ModalCoinAdd = ({ name, price, closeHandler }: PropsModalCoin) => {
  const dispatch = useDispatch();
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <div className='modal'>
      <div className='modal__content'>
        <p className='modal__text'></p>
        <input ref={inputRef} type='number' name='' id='' />
        <button
          onClick={() => {
            const count = parseInt(inputRef?.current?.value as string);
            if (count > 0) dispatch(add({ name: name, count: count, price: price }));
          }}
        >
          Submit
        </button>
        <button onClick={() => closeHandler()}>Χ</button>
      </div>
    </div>
  );
};

export default ModalCoinAdd;

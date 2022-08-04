import { PropsModalCoin } from '../../types';
import './ModalCoinAdd.scss';

const ModalCoinAdd = ({ closeHandler }: PropsModalCoin) => {
  return (
    <div className='modal'>
      <div className='modal__content'>
        <p className='modal__text'></p>
        <input type='number' name='' id='' />
        <button>Submit</button>
        <button onClick={() => closeHandler()}>Χ</button>
      </div>
    </div>
  );
};

export default ModalCoinAdd;

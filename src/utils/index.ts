import { useSelector } from 'react-redux';
import { WalletState } from '../features/walletReducer';

const getCoinData = async (id: string) => {
  try {
    const response = await fetch(`https://api.coincap.io/v2/assets/${id}`);
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    const result = await response.json();
    return result;
  } catch (error) {
    return { message: 'Not found' };
  }
};
const getCoinsList = async (page = 0, limit = 10) => {
  try {
    const response = await fetch(
      `https://api.coincap.io/v2/assets/?offset=${page * 10}&limit=${limit}`,
    );
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    const result = await response.json();
    return result;
  } catch (error) {
    return { message: 'Not found' };
  }
};

const getCoinHistory = async (id: string) => {
  try {
    const response = await fetch(`https://api.coincap.io/v2/assets/${id}/history?interval=d1`);
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    const result = await response.json();
    return result;
  } catch (error) {
    return { message: 'Not found' };
  }
};

const walletAmountDiff = async (coins: WalletState) => {
  const newPrice = Object.entries(coins).filter(e => e[0] !== 'spendAmount');
  let newAmount = 0;
  try {
    for await (const results of newPrice) {
      newAmount =
        newAmount +
        (await getCoinData(results[0].toLowerCase()).then(
          data => parseFloat(data.data.priceUsd) * results[1].count,
        ));
    }
  } catch (error) {
    return '';
  }
  const diff = (100 - newAmount / (coins.spendAmount / 100)).toFixed(2);
  return `${newAmount.toFixed(2)} USD ${(coins.spendAmount - newAmount).toFixed(2)} (${diff} %)`;
};

export { getCoinsList, getCoinData, getCoinHistory, walletAmountDiff };

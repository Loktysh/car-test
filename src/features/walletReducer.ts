import { createSlice, current } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface WalletState {
  [index: string]: { count: number; price: number } | number;
  spendAmount: number;
}
export interface WalletAmount {
  [spendAmount: string]: number;
}

const initialState: WalletState = {
  spendAmount: 0,
};

export const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    add: (
      state: WalletState,
      action: PayloadAction<{ name: string; count: number; price: number }>,
    ) => {
      const { name, count, price } = action.payload;
      const isCoinExist = Object.keys(state).find(e => e === name);
      if (!isCoinExist) {
        state[name] = action.payload;
      }
      if (isCoinExist && typeof state.name !== 'number') {
        const newCount = state[name].count + count;
        console.log('new count', newCount);
        state[name] = { count: newCount, price: price };
      }
      state.spendAmount += count * price;
    },
  },
});

export const { add } = walletSlice.actions;

export default walletSlice.reducer;

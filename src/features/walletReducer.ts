import { createSlice, current } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
export interface W {
  spendAmount: number;
}
export interface E {
  [index: string]: { history: { count: number; price: number }[]; count: number } | number;
}
export interface WalletState {
  [index: string]: { history: { count: number; price: number }[]; count: number } | number;
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
        state[name] = { history: [{ count: count, price: price }], count: count };
      }
      if (isCoinExist && typeof state.name !== 'number') {
        state[name].history.push(action.payload);
        state[name].count = state[name].count + count;
      }
      state.spendAmount += count * price;
    },
    remove: (
      state: WalletState,
      action: PayloadAction<{ name: string; count: number; price: number }>,
    ) => {
      const { name, count, price } = action.payload;
      console.log(action.payload);
      const isCoinExist = Object.keys(state).find(e => e === name);
      if (!isCoinExist) {
        state[name] = { history: [{ count: count, price: price }], count: count };
      }
      if (isCoinExist) {
        state[name].history.forEach(e =>
          console.log(JSON.stringify(e), JSON.stringify({ count: count, price: price })),
        );
        const index = state[name].history.findIndex(
          e => JSON.stringify(e) === JSON.stringify({ count: count, price: price }),
        );
        console.log('INDEX', index);
        state[name].history = state[name].history.filter((c, i) => i !== index);
        state[name].count = state[name].count - count;
        state.spendAmount -= count * price;
      }
    },
  },
});

export const { add, remove } = walletSlice.actions;

export default walletSlice.reducer;

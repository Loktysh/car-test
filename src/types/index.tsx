export type PaginationDirection = 'next' | 'prev';

export interface PaginationProps {
  setPage: (e: number) => void;
  currentPage: number;
}

export interface PropsModalCoin {
  closeHandler: () => void;
}

export interface CoinData {
  id: string;
  rank: string;
  symbol: string;
  name: string;
  supply: string;
  maxSupply: string;
  marketCapUsd: string;
  volumeUsd24Hr: string;
  priceUsd: string;
  changePercent24Hr: string;
  vwap24Hr: string;
  explorer: string;
}

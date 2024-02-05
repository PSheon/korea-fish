// ** Wagmi Imports
import { mainnet, sepolia /* arbitrumGoerli */ /* goerli */ } from 'wagmi/chains'

export const ETHEREUM_CONFIG = {
  /* NOTE: update opensea base uri */
  useChain: process.env.NODE_ENV === 'production' ? mainnet : sepolia
}

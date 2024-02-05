// ** Wagmi Imports
import { mainnet, goerli, sepolia } from 'wagmi/chains'

export const getChainInstance = (chainName: string) => {
  switch (chainName.toLowerCase()) {
    case 'ethereum':
      return mainnet
    case 'goerli':
      return goerli
    case 'sepolia':
    default:
      return sepolia
  }
}

export const formatAddress = (address: string) => {
  return `${address.slice(0, 6)}...${address.slice(-4)}`
}

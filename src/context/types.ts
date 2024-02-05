export type ErrCallbackType = (err: { [key: string]: string }) => void

// ** Request Message
export type RequestMessageParamsType = {
  address: string
  chain: '0x1' | '0x5'
  networkType: 'evm'
}
export type RequestMessageResponseType = {
  message: string
}

// ** Connect Wallet
export type ConnectWalletParamsType = {
  message: string
  signature: string
}
export type ConnectWalletResponseType = {
  accessToken: string
  userData: GetMeUserDataResponseType
}

export type GetMeUserDataResponseType = {
  id: number
  provider: string
  address: string
  email?: string
  username: string
  blocked: boolean
  confirmed: boolean
  isHighlighted: boolean
  createdAt: string
  updatedAt: string
  role: {
    id: number
    name: string
    description: string
    type: string
    createdAt: string
    updatedAt: string
  }
}

export type UserDataType = {
  id: number
  provider: string
  address: string
  email?: string
  username: string
  blocked: boolean
  confirmed: boolean
  isHighlighted: boolean
  createdAt: string
  updatedAt: string
  role: string
}

export type AuthValuesType = {
  loading: boolean
  user: UserDataType
  setLoading: (value: boolean) => void
  setUser: (value: UserDataType) => void
  requestMessage: (params: RequestMessageParamsType) => Promise<string>
  connectWallet: (params: ConnectWalletParamsType, errorCallback?: ErrCallbackType) => Promise<void>
  disconnectWallet: () => void
}

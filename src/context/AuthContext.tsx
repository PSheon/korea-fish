// ** React Imports
import { createContext, useEffect, useState, ReactNode } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** Third Party Imports
import axios, { AxiosResponse, AxiosError } from 'axios'
import toast from 'react-hot-toast'

// ** Utils Imports
import { formatAddress } from 'src/utils'

// ** Config
import authConfig from 'src/configs/auth'

// ** Types
import {
  AuthValuesType,
  RequestMessageParamsType,
  RequestMessageResponseType,
  ConnectWalletParamsType,
  ConnectWalletResponseType,
  GetMeUserDataResponseType,
  UserDataType
} from 'src/context/types'

// ** Defaults
const defaultUserData = {
  id: 0,
  provider: 'local',
  address: '0x0',
  username: 'Anonymous',
  blocked: false,
  confirmed: true,
  isHighlighted: false,
  createdAt: '2021-08-30T07:00:00.000Z',
  updatedAt: '2021-08-30T07:00:00.000Z',
  role: 'Public'
}
const defaultProvider: AuthValuesType = {
  user: defaultUserData,
  loading: true,
  setUser: () => defaultUserData,
  setLoading: () => Boolean,
  requestMessage: () => Promise.resolve(''),
  connectWallet: () => Promise.resolve(),
  disconnectWallet: () => Promise.resolve()
}

const AuthContext = createContext(defaultProvider)

type Props = {
  children: ReactNode
}

const AuthProvider = ({ children }: Props) => {
  // ** States
  const [user, setUser] = useState<UserDataType>(defaultProvider.user)
  const [loading, setLoading] = useState<boolean>(defaultProvider.loading)

  // ** Hooks
  const router = useRouter()

  useEffect(() => {
    const initAuth = async (): Promise<void> => {
      axios.defaults.baseURL = (process.env.NEXT_PUBLIC_API_URL as string) || 'http://localhost:1337'

      const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)!
      if (storedToken) {
        setLoading(true)
        await axios
          .get(authConfig.meEndpoint, {
            headers: {
              Authorization: `Bearer ${storedToken}`
            },
            params: {
              populate: ['role']
            }
          })
          .then(async (response: AxiosResponse<GetMeUserDataResponseType>) => {
            setLoading(false)
            setUser({ ...response.data, role: response.data.role!.name })
          })
          .catch(() => {
            localStorage.removeItem('userData')
            localStorage.removeItem('refreshToken')
            localStorage.removeItem('accessToken')
            setUser(defaultUserData)
            setLoading(false)

            // if (authConfig.onTokenExpiration === 'logout' && !router.pathname.includes('login')) {
            //   router.replace('/auth/login')
            // }
          })
      } else {
        setLoading(false)
      }
    }

    initAuth()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleRequestMessage = (params: RequestMessageParamsType): Promise<string> => {
    return new Promise((resolve, reject) => {
      axios
        .post(authConfig.requestMessageEndpoint, params)
        .then((response: AxiosResponse<RequestMessageResponseType>) => {
          resolve(response.data.message)
        })
        .catch((error: AxiosError) => {
          reject(error)
        })
    })
  }

  const handleConnectWallet = (params: ConnectWalletParamsType): Promise<void> => {
    return new Promise((resolve, reject) => {
      axios
        .post(authConfig.connectWalletEndpoint, params)
        .then((response: AxiosResponse<ConnectWalletResponseType>) => {
          window.localStorage.setItem(authConfig.storageTokenKeyName, response.data.accessToken)

          setUser({ ...response.data.userData, role: response.data.userData.role!.name })
          window.localStorage.setItem('userData', JSON.stringify(response.data.userData))

          toast.success(`Hi，${formatAddress(response.data.userData.address)}～`)

          resolve()
        })
        .catch((error: AxiosError) => {
          reject(error)
        })
    })
  }

  const handleDisconnectWallet = () => {
    setUser(defaultUserData)
    window.localStorage.removeItem('userData')
    window.localStorage.removeItem(authConfig.storageTokenKeyName)
    router.push('/')
  }

  const values = {
    user,
    loading,
    setUser,
    setLoading,
    requestMessage: handleRequestMessage,
    connectWallet: handleConnectWallet,
    disconnectWallet: handleDisconnectWallet
  }

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthProvider }

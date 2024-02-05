// ** React Imports
import { Fragment } from 'react'

// ** Custom Component Imports
import WalletProfileButton from './wallet-profile-button'
import ConnectWalletButton from './connect-wallet-button'

// ** Hooks Import
import { useAuth } from 'src/hooks/useAuth'

const WalletDropdown = () => {
  // ** Hooks
  const auth = useAuth()

  return <Fragment>{auth.user.role === 'Public' ? <ConnectWalletButton /> : <WalletProfileButton />}</Fragment>
}

export default WalletDropdown

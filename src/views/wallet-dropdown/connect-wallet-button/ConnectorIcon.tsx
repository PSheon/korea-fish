// ** Next Import
import Image from 'next/image'

// ** MUI Imports
import Box from '@mui/material/Box'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

interface Props {
  connectorId: string
}

const ConnectorIcon = (props: Props) => {
  // ** Props
  const { connectorId } = props

  if (connectorId === 'metaMask') {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', flex: 1 }}>
        <Image
          height={26}
          width={30}
          src='/images/wallet-connectors/metamask-flat.webp'
          alt='metamask icon'
          draggable={false}
        />
      </Box>
    )
  }
  if (connectorId === 'walletConnect') {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', flex: 1 }}>
        <Image
          height={32}
          width={32}
          src='/images/wallet-connectors/wallet-connect.webp'
          alt='wallet connect icon'
          draggable={false}
        />
      </Box>
    )
  }
  if (connectorId === 'coinbaseWallet') {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', flex: 1 }}>
        <Image
          height={28}
          width={28}
          src='/images/wallet-connectors/coinbase.webp'
          alt='coinbase icon'
          draggable={false}
        />
      </Box>
    )
  }

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flex: 1 }}>
      <Icon icon='mdi:cog-outline' fontSize='2.375rem' />
    </Box>
  )
}

export default ConnectorIcon

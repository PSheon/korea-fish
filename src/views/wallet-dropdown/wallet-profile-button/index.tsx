// ** React Imports
import { useState, SyntheticEvent, Fragment } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** MUI Imports
import Box from '@mui/material/Box'
import Menu from '@mui/material/Menu'
import Badge from '@mui/material/Badge'
import Avatar, { AvatarProps } from '@mui/material/Avatar'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'

// ** Wagmi Imports
import { useDisconnect } from 'wagmi'

// ** Third Party Imports
import BlockiesSvg from 'blockies-react-svg'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Context
import { useAuth } from 'src/hooks/useAuth'

// ** Utils Imports
import { formatAddress } from 'src/utils'

// ** Type Imports
import { Settings } from 'src/@core/context/settingsContext'
import { UserDataType } from 'src/context/types'

// ** Styled Components
const BadgeContentSpan = styled('span')(({ theme }) => ({
  width: 8,
  height: 8,
  borderRadius: '50%',
  backgroundColor: theme.palette.success.main,
  boxShadow: `0 0 0 2px ${theme.palette.background.paper}`
}))
const StyledAvatar = styled(Avatar)<AvatarProps>(({ theme }) => ({
  width: 40,
  height: 40,
  border: `3px solid ${theme.palette.background.default}`
}))

const WalletProfileButton = () => {
  // ** States
  const [anchorEl, setAnchorEl] = useState<Element | null>(null)

  // ** Hooks
  const router = useRouter()
  const { disconnect } = useDisconnect()
  const { user, disconnectWallet } = useAuth()

  const userData = user as UserDataType

  const handleDropdownOpen = (event: SyntheticEvent) => {
    setAnchorEl(event.currentTarget)
  }

  const handleDropdownClose = (url?: string) => {
    if (url) {
      router.push(url)
    }
    setAnchorEl(null)
  }

  const handleDisconnectWallet = () => {
    disconnect()
    handleDropdownClose()

    disconnectWallet()
  }

  return (
    <Fragment>
      <Badge
        overlap='circular'
        onClick={handleDropdownOpen}
        sx={{ ml: 2, cursor: 'pointer' }}
        badgeContent={<BadgeContentSpan />}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
      >
        <StyledAvatar alt={userData.username} onClick={handleDropdownOpen}>
          <BlockiesSvg address={userData.address} />
        </StyledAvatar>
      </Badge>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => handleDropdownClose()}
        sx={{ '& .MuiMenu-paper': { width: 230, mt: 4 } }}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Box sx={{ px: 2, py: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', ml: 3, alignItems: 'flex-start', flexDirection: 'column' }}>
              <Typography sx={{ fontWeight: 600 }}>{`@${
                userData.username.length > 10 ? `${userData.username.slice(0, 12)}...` : userData.username
              }`}</Typography>
              <Typography variant='body2' sx={{ fontSize: '0.8rem', color: 'text.disabled' }}>
                {formatAddress(userData.address)}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Divider />
        <MenuItem
          onClick={handleDisconnectWallet}
          sx={{ py: 2, '& svg': { mr: 2, fontSize: '1.375rem', color: 'text.primary' } }}
        >
          <Icon icon='mdi:logout-variant' />
          Disconnect
        </MenuItem>
      </Menu>
    </Fragment>
  )
}

export default WalletProfileButton

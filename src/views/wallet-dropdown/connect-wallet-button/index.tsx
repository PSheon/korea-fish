// ** React Imports
import { Fragment, Ref, useState, forwardRef, ReactElement } from 'react'

// ** Redux Imports
import { useDispatch, useSelector } from 'react-redux'

// ** MUI Imports
// import useMediaQuery from '@mui/material/useMediaQuery'
// import { Theme } from '@mui/material/styles'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Alert from '@mui/material/Alert'
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress'
import Fade, { FadeProps } from '@mui/material/Fade'
import DialogContent from '@mui/material/DialogContent'

// ** Wagmi Imports
import { useConnect, useSignMessage, useDisconnect, Connector } from 'wagmi'

// ** Axios
import axios from 'axios'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Components Imports
import SignIcon from './SignIcon'
import ConnectorIcon from './ConnectorIcon'

// ** Hooks
import { useAuth } from 'src/hooks/useAuth'
import useBgColor from 'src/@core/hooks/useBgColor'

// ** Actions
import { showWalletConnectorDialog, hideWalletConnectorDialog } from 'src/store/dialog/walletConnectorSlice'

// ** Types
import type { RootState, AppDispatch } from 'src/store'

interface IUserData {
  address: string
}

const Transition = forwardRef(function Transition(
  props: FadeProps & { children?: ReactElement<any, any> },
  ref: Ref<unknown>
) {
  return <Fade ref={ref} {...props} />
})

const ConnectWalletButton = () => {
  // ** States
  const [connecting, setConnecting] = useState<boolean>(false)
  const [logging, setLogging] = useState<boolean>(false)
  const [userData, setUserData] = useState<IUserData | null>(null)

  // ** Hooks
  const auth = useAuth()
  const dispatch = useDispatch<AppDispatch>()
  const store = useSelector((state: RootState) => state.dialog.walletConnector)
  const bgColors = useBgColor()

  // const isDesktop = useMediaQuery((theme: Theme) => theme.breakpoints.up('sm'))
  const { connectAsync, connectors, error: connectError, isLoading, pendingConnector } = useConnect()
  const { disconnect } = useDisconnect()
  const { signMessageAsync } = useSignMessage()

  const handleOpen = () => {
    dispatch(showWalletConnectorDialog())
    setConnecting(false)
  }
  const handleClose = () => {
    dispatch(hideWalletConnectorDialog())
    setConnecting(false)
  }

  // ** Logics
  const handleConnect = async (connector: Connector) => {
    try {
      if (isLoading) return
      setConnecting(true)
      const { account } = await connectAsync({ connector })

      const userData = { address: account, chain: '0x1', networkType: 'evm' }

      setUserData(userData)

      setConnecting(false)
    } catch (connectingErr) {
      setUserData(null)
      handleDisconnect()
    }
  }
  const handleLogin = async () => {
    try {
      if (logging) return
      setLogging(true)

      const { data } = await axios.post(`/api/auth/request-message`, userData)

      const message = data.message

      // signing the received message via metamask
      const signature = await signMessageAsync({ message })

      auth.connectWallet({ message, signature }, () => {
        setLogging(false)
      })
    } catch (loggingErr) {
      setUserData(null)
      handleDisconnect()
    }
  }
  const handleDisconnect = () => {
    disconnect()
    setUserData(null)
    setConnecting(false)
    setLogging(false)
  }

  return (
    <Fragment>
      <Button onClick={handleOpen} variant='contained' size='small'>
        Connect
      </Button>

      {/* {isDesktop ? (
        <Button onClick={handleOpen} variant='contained' size='small'>
          Connect
        </Button>
      ) : (
        <IconButton onClick={handleOpen} size='small'>
          <Icon icon='material-symbols:account-balance-wallet-outline' />
        </IconButton>
      )} */}

      <Dialog
        fullWidth
        open={store.show}
        maxWidth='sm'
        scroll='body'
        onClose={handleClose}
        TransitionComponent={Transition}
        sx={{
          '&.MuiDialog-root': {
            zIndex: 30
          }
        }}
      >
        <DialogContent sx={{ px: { xs: 8, sm: 15 }, py: { xs: 8, sm: 12.5 }, position: 'relative' }}>
          <IconButton size='small' onClick={handleClose} sx={{ position: 'absolute', right: '1rem', top: '1rem' }}>
            <Icon icon='mdi:close' />
          </IconButton>

          {userData ? (
            <Grid container spacing={6}>
              <Grid item xs={12}>
                <Box sx={{ mb: 3, textAlign: 'center' }}>
                  <Typography variant='h6' sx={{ mb: 3, fontWeight: '700' }}>
                    Verify your account
                  </Typography>
                  <Typography variant='body2'>
                    To finish connecting, you must sign a message in your wallet to verify that you are the owner of
                    this account.
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                <Box
                  onClick={handleLogin}
                  sx={{
                    width: {
                      xs: '100%',
                      md: '75%'
                    },
                    pt: 4,
                    pb: 2.75,
                    px: 7.2,
                    borderRadius: 1,
                    opacity: connecting ? 0.75 : 1,
                    cursor: connecting ? 'progress' : 'pointer',
                    transition: theme => theme.transitions.create(['opacity', 'color', 'background-color']),
                    ...(logging
                      ? { ...bgColors.primaryLight }
                      : { backgroundColor: bgColors.secondaryLight.backgroundColor }),
                    '&:hover': {
                      ...(!logging && {
                        ...bgColors.primaryLight
                      })
                    }
                  }}
                >
                  <Box sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                    <SignIcon />
                    <Box sx={{ flex: 10, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      <Typography
                        variant='body1'
                        sx={{
                          ...(logging && { color: 'primary.main' }),
                          fontWeight: '700'
                        }}
                      >
                        Send message
                      </Typography>
                    </Box>
                    <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                      {logging && <CircularProgress size={20} color='inherit' />}
                    </Box>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                <Button variant='text' onClick={handleDisconnect}>
                  <Typography variant='body2'>Cancel</Typography>
                </Button>
              </Grid>
            </Grid>
          ) : (
            <Grid container spacing={6}>
              <Grid item xs={12}>
                <Box sx={{ mb: 3, textAlign: 'center' }}>
                  <Typography variant='h6' sx={{ mb: 3, fontWeight: '700' }}>
                    Connect your wallet
                  </Typography>
                  <Typography variant='body2'>
                    We only detect your wallet address to fetch your assets. We do not access or perform any on-chain
                    operation with it.
                  </Typography>
                </Box>
                {connectError && <Alert severity='error'>{connectError.message}</Alert>}
              </Grid>

              {connectors
                .filter(connector => connector.ready)
                .map(connector => (
                  <Grid key={connector.id} item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Box
                      onClick={() => handleConnect(connector)}
                      sx={{
                        width: {
                          xs: '100%',
                          md: '75%'
                        },
                        pt: 4,
                        pb: 2.75,
                        px: 7.2,
                        borderRadius: 1,
                        opacity: connecting ? 0.75 : 1,
                        cursor: connecting ? 'progress' : 'pointer',
                        transition: theme => theme.transitions.create(['opacity', 'color', 'background-color']),
                        ...(isLoading && connector.id === pendingConnector?.id
                          ? { ...bgColors.primaryLight }
                          : { backgroundColor: 'action.hover' }),
                        ...(isLoading && connector.id === pendingConnector?.id
                          ? { ...bgColors.primaryLight }
                          : { backgroundColor: bgColors.secondaryLight.backgroundColor }),
                        '&:hover': {
                          ...(!connecting && {
                            ...bgColors.primaryLight
                          })
                        }
                      }}
                    >
                      <Box sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                        <ConnectorIcon connectorId={connector.id} />
                        <Box sx={{ flex: 10, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                          <Typography
                            variant='body2'
                            sx={{
                              ...(isLoading && connector.id === pendingConnector?.id && { color: 'primary.main' }),
                              fontWeight: '700'
                            }}
                          >
                            {connector.name}
                            {!connector.ready && ' (unsupported)'}
                          </Typography>
                        </Box>
                        <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                          {(connecting || isLoading) && connector.id === pendingConnector?.id && (
                            <CircularProgress size={20} color='inherit' />
                          )}
                        </Box>
                      </Box>
                    </Box>
                  </Grid>
                ))}
            </Grid>
          )}
        </DialogContent>
      </Dialog>
    </Fragment>
  )
}

export default ConnectWalletButton

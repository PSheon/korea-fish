// ** React Imports
import { Ref, forwardRef, ReactElement } from 'react'

// ** Redux Imports
import { useDispatch, useSelector } from 'react-redux'

// ** Next Import
// import Link from 'next/link'

// ** MUI Imports

// import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Dialog from '@mui/material/Dialog'
import Typography from '@mui/material/Typography'
import Fade, { FadeProps } from '@mui/material/Fade'
import DialogContent from '@mui/material/DialogContent'
import IconButton from '@mui/material/IconButton'

// ** Actions
import { hideMintHintDialog } from 'src/store/dialog/mintHintSlice'

// ** Util Imports
import ConfettiExplosion from 'react-confetti-explosion'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Types Imports
import type { RootState, AppDispatch } from 'src/store'

const Transition = forwardRef(function Transition(
  props: FadeProps & { children?: ReactElement<any, any> },
  ref: Ref<unknown>
) {
  return <Fade ref={ref} {...props} />
})

const MintHintDialog = () => {
  // ** Hooks
  const dispatch = useDispatch<AppDispatch>()
  const mintHintStore = useSelector((state: RootState) => state.dialog.mintHint)

  // ** Logics
  const handleCloseDialog = () => {
    dispatch(hideMintHintDialog())
  }

  // const handleReloadPage = () => {
  //   window.location.reload()
  // }

  return (
    <Dialog
      fullWidth
      open={mintHintStore.show}
      maxWidth='xs'
      scroll='body'
      onClose={handleCloseDialog}
      TransitionComponent={Transition}
      sx={{
        '& .MuiDialog-container': {
          backgroundColor: 'rgba(0, 0, 0, 0.6)'
        },
        '& .MuiDialog-paper': {
          border: '1px solid rgba(255, 255, 255, 0.12)'
        }
      }}
    >
      {mintHintStore.type === 'success' && <ConfettiExplosion />}
      <DialogContent sx={{ px: { xs: 8, sm: 15 }, py: { xs: 8, sm: 12.5 }, position: 'relative' }}>
        <IconButton size='small' onClick={handleCloseDialog} sx={{ position: 'absolute', right: '1rem', top: '1rem' }}>
          <Icon icon='mdi:close' />
        </IconButton>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box sx={{ mb: 3, textAlign: 'center' }}>
              <Typography variant='h6' sx={{ mb: 3, fontWeight: '700' }}>
                {mintHintStore?.title ?? ''}
              </Typography>
              <Typography variant='caption'>{mintHintStore?.description ?? ''}</Typography>
            </Box>
          </Grid>
          {/* <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
            {mintHintStore?.hash === '' ? (
              <Button variant='contained' onClick={handleReloadPage}>
                Try again
              </Button>
            ) : (
              <Link href='https://blur.io/portfolio' passHref target='_blank'>
                <Button variant='contained'>View on Blur</Button>
              </Link>
            )}
          </Grid> */}
        </Grid>
      </DialogContent>
    </Dialog>
  )
}

export default MintHintDialog

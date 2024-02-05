// ** React Imports
import { useState, Ref, forwardRef, ReactElement, Fragment } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import Fade, { FadeProps } from '@mui/material/Fade'
import DialogContent from '@mui/material/DialogContent'
import LoadingButton from '@mui/lab/LoadingButton'
import IconButton from '@mui/material/IconButton'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

const Transition = forwardRef(function Transition(
  props: FadeProps & { children?: ReactElement<any, any> },
  ref: Ref<unknown>
) {
  return <Fade ref={ref} {...props} />
})

const LikeDialog = () => {
  // ** States
  const [open, setOpen] = useState<boolean>(false)

  // ** Logics
  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Fragment>
      <Button variant='contained' onClick={handleOpen}>
        I love Fish
      </Button>

      <Dialog fullWidth open={open} maxWidth='sm' scroll='body' onClose={handleClose} TransitionComponent={Transition}>
        <DialogContent sx={{ px: { xs: 8, sm: 15 }, py: { xs: 8, sm: 12.5 }, position: 'relative' }}>
          <IconButton size='small' onClick={handleClose} sx={{ position: 'absolute', right: '1rem', top: '1rem' }}>
            <Icon icon='mdi:close' />
          </IconButton>

          <Grid container spacing={6}>
            <Grid item xs={12}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant='h6' sx={{ mb: 3, fontWeight: '700' }}>
                  I love Fish
                </Typography>
                <Typography variant='body1'>Fa Da Chai</Typography>
              </Box>
            </Grid>
            <Grid item xs={12}>
              asd
            </Grid>
            <Grid item xs={12}>
              asd
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </Fragment>
  )
}

export default LikeDialog

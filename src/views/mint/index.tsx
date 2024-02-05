// ** MUI Components
import Stack from '@mui/material/Stack'

// ** Hooks Import
import { useAuth } from 'src/hooks/useAuth'

// ** Component Imports
import ConnectWalletButton from 'src/views/wallet-dropdown/connect-wallet-button'
import LikeDialog from 'src/views/mint/buttons/Like'
import DislikeDialog from 'src/views/mint/buttons/Dislike'
import MintSuccessDialog from 'src/views/mint/dialogs/MintHint'

// ** Api Imports
import { useFindOneQuery } from 'src/store/api/project'

const MintButtons = () => {
  // ** Hooks
  const auth = useAuth()
  const {
    data: Project

    /* isError: isFindProjectEntityError, */
    /* isLoading: isFindProjectEntityLoading */
  } = useFindOneQuery({})

  if (auth.user.role === 'Public') {
    return <ConnectWalletButton />
  }

  return (
    <Stack direction='row' justifyContent='center' alignItems='center' spacing={4}>
      <LikeDialog initProjectEntity={Project!} />
      <DislikeDialog initProjectEntity={Project!} />

      <MintSuccessDialog />
    </Stack>
  )
}

export default MintButtons

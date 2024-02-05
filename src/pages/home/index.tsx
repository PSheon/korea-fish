// ** React Imports
import { ReactNode } from 'react'

// ** Next Imports
import Image from 'next/image'

// ** MUI Components
import { styled } from '@mui/material/styles'
import Box, { BoxProps } from '@mui/material/Box'
import Typography from '@mui/material/Typography'

// ** Api Imports
import { useFindOneQuery } from 'src/store/api/project'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Component Imports
import WalletDropdown from 'src/views/wallet-dropdown'
import MintProgress from 'src/views/mint/MintProgress'
import MintSection from 'src/views/mint'
import SwitchNetworkModal from 'src/views/shared/SwitchNetworkModal'

// ** Styled Components
const StyledRootBox = styled(Box)<BoxProps>(({ theme }) => ({
  width: '100%',
  height: '100vh',
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: theme.spacing(8),
  background: '#90dbf8'
}))

const HomePage = () => {
  // ** Hooks
  const { data: Project, isError: isFindMeUserEntityError, isLoading: isFindMeUserEntityLoading } = useFindOneQuery({})

  if (isFindMeUserEntityLoading) {
    return (
      <StyledRootBox>
        <Box sx={{ py: 4 }}>
          <Image src='/images/master-fish.gif' alt='maser fish' width={360} height={360} />
        </Box>
      </StyledRootBox>
    )
  } else {
    return (
      <StyledRootBox>
        <Box sx={{ position: 'absolute', top: 0, right: 0, p: 4 }}>
          <WalletDropdown />
        </Box>

        <Typography variant='h2'>Korea Fish</Typography>
        <Box sx={{ mt: 4 }}>
          <Typography variant='h5'>Like me or Hate me</Typography>
        </Box>

        <Box sx={{ py: 4 }}>
          <Image src='/images/master-fish.gif' alt='maser fish' width={360} height={360} />
        </Box>

        <Box sx={{ width: '80%', pb: 6 }}>
          <MintProgress initProjectEntity={Project!} />
        </Box>

        <Box sx={{ py: 4 }}>
          <MintSection />
        </Box>

        <SwitchNetworkModal initProjectEntity={Project!} />
      </StyledRootBox>
    )
  }
}

HomePage.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>
HomePage.contentHeightFixed = true
HomePage.acl = {
  action: 'read',
  subject: 'public-page'
}

export default HomePage

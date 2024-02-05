// ** Next Import
import Image from 'next/image'

// ** MUI Imports
import Box from '@mui/material/Box'

const SignIcon = () => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', flex: 1 }}>
      <Image height={26} width={30} src='/images/wallet-connectors/sign.webp' alt='sign icon' draggable={false} />
    </Box>
  )
}

export default SignIcon

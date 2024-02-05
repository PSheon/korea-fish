// ** React Imports
import { useEffect } from 'react'

// ** MUI Components
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress'

// ** Utils Imports
import { useContractRead } from 'wagmi'
import { subscribe, unsubscribe } from 'src/utils/events'

// ** Type Imports
import { Address, Abi } from 'viem'
import { ProjectType } from 'src/types/api/projectTypes'

interface Props {
  initProjectEntity: ProjectType
}

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.error.light
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5
  }
}))

const MintProgress = (props: Props) => {
  // ** props
  const { initProjectEntity } = props

  // ** Hooks
  const {
    data: totalLikeData = 0,
    isLoading: isTotalLikeLoading,
    isRefetching: isTotalLikeRefetching,
    refetch: refetchTotalLike
  } = useContractRead({
    address: initProjectEntity.contractAddress as Address,
    abi: initProjectEntity.contractABI as unknown as Abi,
    functionName: 'totalSupply'
  })
  const {
    data: totalDislikeData = 0,
    isLoading: isTotalDislikeLoading,
    isRefetching: isTotalDislikeRefetching,
    refetch: refetchTotalDislike
  } = useContractRead({
    address: initProjectEntity.contractAddress as Address,
    abi: initProjectEntity.contractABI as unknown as Abi,
    functionName: 'burned'
  })

  // ** Logics
  const reloadProgress = () => {
    refetchTotalLike()
    refetchTotalDislike()
  }

  // ** Side Effects
  useEffect(() => {
    subscribe('reload-progress', () => reloadProgress())

    return () => {
      unsubscribe('reload-progress', () => reloadProgress())
    }
  }, [])

  return (
    <Stack
      direction='column'
      flex='grow'
      justifyContent='center'
      alignItems='center'
      spacing={2}
      sx={{ width: '100%' }}
    >
      <Stack direction='row' justifyContent='space-between' alignItems='center' spacing={2} sx={{ width: '100%' }}>
        <Box>
          {isTotalLikeLoading || isTotalLikeRefetching ? (
            <Typography>Like: loading</Typography>
          ) : (
            <Typography>{`Like: ${totalLikeData}`}</Typography>
          )}
        </Box>
        <Box>
          {isTotalDislikeLoading || isTotalDislikeRefetching ? (
            <Typography>dislike: loading</Typography>
          ) : (
            <Typography>{`Dislike: ${totalDislikeData}`}</Typography>
          )}
        </Box>
      </Stack>

      <BorderLinearProgress
        variant='determinate'
        value={(Number(totalLikeData) * 100) / (Number(totalLikeData) + Number(totalDislikeData))}
        sx={{ width: '100%' }}
      />
    </Stack>
  )
}

export default MintProgress

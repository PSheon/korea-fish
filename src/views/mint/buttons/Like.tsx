// ** React Imports
import { Fragment } from 'react'

// ** Redux Imports
import { useDispatch } from 'react-redux'

// ** MUI Imports
import LoadingButton from '@mui/lab/LoadingButton'

// ** Utils Imports
import { Address, parseEther, Abi } from 'viem'
import { usePrepareContractWrite, useContractWrite, useWaitForTransaction } from 'wagmi'

// ** Actions
import { setMintProcessLoading } from 'src/store/mint/uiSlice'
import { showMintHintDialog } from 'src/store/dialog/mintHintSlice'

// ** Types Imports
import type { AppDispatch } from 'src/store'
import { ProjectType } from 'src/types/api/projectTypes'

interface Props {
  initProjectEntity: ProjectType
}

const LikeDialog = (props: Props) => {
  // ** Props
  const { initProjectEntity } = props

  // ** Hooks
  const dispatch = useDispatch<AppDispatch>()
  const { config: mintConfig /* error: mintConfigError */ } = usePrepareContractWrite({
    address: initProjectEntity.contractAddress as Address,
    abi: initProjectEntity.contractABI as unknown as Abi,
    functionName: 'like',
    args: [100],
    value: parseEther((0.0001 * 100).toString())

    // enabled: Boolean(signature?.hash)
  })
  const {
    writeAsync: mint,
    data: mintData,
    isLoading: isMintLoading
  } = useContractWrite({
    ...mintConfig,
    onError() {
      dispatch(setMintProcessLoading(false))
      dispatch(
        showMintHintDialog({
          type: 'error',
          title: 'Oops!',
          description: 'Transaction error occurred, Please try again.',
          hash: ''
        })
      )
    }
  })
  useWaitForTransaction({
    hash: mintData?.hash,
    onSuccess(data) {
      dispatch(setMintProcessLoading(false))
      dispatch(
        showMintHintDialog({
          type: 'success',
          title: 'Like Successfully',
          description: 'Congratulations! You are part of Fish!',
          hash: data?.blockHash
        })
      )
    },
    onError() {
      dispatch(setMintProcessLoading(false))
      dispatch(
        showMintHintDialog({
          type: 'error',
          title: 'Oops!',
          description: 'Something went wrong, please try again later. If you have any questions, please contact us.',
          hash: ''
        })
      )
    }
  })

  return (
    <Fragment>
      <LoadingButton loading={isMintLoading} variant='contained' onClick={mint}>
        I love Fish
      </LoadingButton>
    </Fragment>
  )
}

export default LikeDialog

// ** React Imports
import { Fragment } from 'react'

// ** Redux Imports
import { useDispatch } from 'react-redux'

// ** MUI Imports
import LoadingButton from '@mui/lab/LoadingButton'

// ** Utils Imports
import { Address, parseEther, Abi } from 'viem'
import { usePrepareContractWrite, useContractWrite, useWaitForTransaction } from 'wagmi'
import { publish } from 'src/utils/events'

// ** Actions
import { setMintProcessLoading } from 'src/store/mint/uiSlice'
import { showMintHintDialog } from 'src/store/dialog/mintHintSlice'

// ** Types Imports
import type { AppDispatch } from 'src/store'
import { ProjectType } from 'src/types/api/projectTypes'

interface Props {
  initProjectEntity: ProjectType
}
const DislikeDialog = (props: Props) => {
  // ** Props
  const { initProjectEntity } = props

  // ** Hooks
  const dispatch = useDispatch<AppDispatch>()
  const { config: burnConfig /* error: burnConfigError */ } = usePrepareContractWrite({
    address: initProjectEntity.contractAddress as Address,
    abi: initProjectEntity.contractABI as unknown as Abi,
    functionName: 'dislike',
    args: [100],
    value: parseEther((0.0001 * 100).toString())

    // enabled: Boolean(signature?.hash)
  })
  const {
    writeAsync: burn,
    data: burnData,
    isLoading: isBurnLoading
  } = useContractWrite({
    ...burnConfig,
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
    hash: burnData?.hash,
    onSuccess(data) {
      dispatch(setMintProcessLoading(false))
      dispatch(
        showMintHintDialog({
          type: 'success',
          title: 'Dislike Successfully',
          description: 'Congratulations! You are a wise sage!',
          hash: data?.blockHash
        })
      )
      publish('reload-progress', {})
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
      <LoadingButton loading={isBurnLoading} variant='contained' color='error' onClick={burn}>
        I hate Fish
      </LoadingButton>
    </Fragment>
  )
}

export default DislikeDialog

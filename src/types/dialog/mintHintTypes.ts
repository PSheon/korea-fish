export interface IInitialState {
  show: boolean
  type: 'error' | 'success'
  title: string
  description: string
  hash: string
}

export interface IShowMintHintDialogPayload {
  type: 'error' | 'success'
  title?: string
  description?: string
  hash?: string
}

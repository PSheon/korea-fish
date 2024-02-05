export interface IInitialState {
  show: boolean
  type: 'init' | 'error' | 'success'
  title: string
  description: string
  hash: string
}

export interface IShowMintHintDialogPayload {
  type: 'init' | 'error' | 'success'
  title?: string
  description?: string
  hash?: string
}

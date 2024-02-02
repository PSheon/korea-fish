export interface IInitialState {
  initialized: boolean
  settled: boolean
  contractAddress: string
  contractABI: string
  timeline: IPhase[]
  currentPhaseStage: number
}

export interface ISetProjectDetailsPayload {
  contractAddress: string
  contractABI: string
  timeline: IPhase[]
}

export interface IPhase {
  phaseId: string
  phaseStage: number
  displayName: string
  description: string
  priceInEth: number
  maxMintPerAddress: number
  startedAt: string
  finishedAt: string
  totalSupply: number
  revealed: boolean
}

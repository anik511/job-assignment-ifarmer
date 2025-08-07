import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { initialGameState } from '@/types/game'
import { setPlayers, makeMove, nextRound, resetRound, resetMatch } from '@/utils/gameLogic'

const gameSlice = createSlice({
  name: 'game',
  initialState: initialGameState,
  reducers: {
    setPlayersAction: (state, action: PayloadAction<{ player1Name: string; player2Name: string }>) => {
      return setPlayers(state, action.payload.player1Name, action.payload.player2Name)
    },
    makeMoveAction: (state, action: PayloadAction<{ cellIndex: number }>) => {
      return makeMove(state, action.payload.cellIndex)
    },
    nextRoundAction: (state) => {
      return nextRound(state)
    },
    resetRoundAction: (state) => {
      return resetRound(state)
    },
    resetMatchAction: (state) => {
      return resetMatch(state)
    }
  }
})

export const {
  setPlayersAction,
  makeMoveAction,
  nextRoundAction,
  resetRoundAction,
  resetMatchAction
} = gameSlice.actions

export default gameSlice.reducer

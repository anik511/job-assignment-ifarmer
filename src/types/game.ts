export interface Player {
  id: 1 | 2
  name: string
  symbol: 'X' | 'O'
  score: number
}

export interface GameRound {
  board: Array<'X' | 'O' | null>
  currentPlayer: 1 | 2
  winner: 'X' | 'O' | 'draw' | null
  isComplete: boolean
}

export interface GameState {
  players: {
    player1: Player | null
    player2: Player | null
  }
  currentRound: GameRound
  roundNumber: number
  totalRounds: number
  isMatchComplete: boolean
  matchWinner: Player | null
  leaderboard: Player[]
  gameStarted: boolean
}

export const initialGameState: GameState = {
  players: {
    player1: null,
    player2: null,
  },
  currentRound: {
    board: Array(9).fill(null),
    currentPlayer: 1,
    winner: null,
    isComplete: false,
  },
  roundNumber: 1,
  totalRounds: 5,
  isMatchComplete: false,
  matchWinner: null,
  leaderboard: [],
  gameStarted: false,
}

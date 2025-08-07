import { GameState } from '@/types/game'

export function checkWinner(board: Array<'X' | 'O' | null>): 'X' | 'O' | null {
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ]
  
  for (const pattern of winPatterns) {
    const [a, b, c] = pattern
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a]
    }
  }
  
  return null
}

export function setPlayers(
  state: GameState, 
  player1Name: string, 
  player2Name: string
): GameState {
  return {
    ...state,
    players: {
      player1: {
        id: 1,
        name: player1Name,
        symbol: 'X',
        score: 0,
      },
      player2: {
        id: 2,
        name: player2Name,
        symbol: 'O',
        score: 0,
      }
    },
    gameStarted: true,
  }
}

export function makeMove(state: GameState, cellIndex: number): GameState {
  const { board, currentPlayer, isComplete } = state.currentRound
  
  if (isComplete || board[cellIndex] !== null) {
    return state
  }
  
  const currentPlayerData = currentPlayer === 1 ? state.players.player1 : state.players.player2
  if (!currentPlayerData) return state
  
  const newBoard = [...board]
  newBoard[cellIndex] = currentPlayerData.symbol
  
  const winner = checkWinner(newBoard)
  const isDraw = !winner && newBoard.every(cell => cell !== null)
  
  const newState = { ...state }
  
  if (winner || isDraw) {
    newState.currentRound = {
      board: newBoard,
      currentPlayer,
      winner: winner || 'draw',
      isComplete: true,
    }
    
    if (winner === 'X' && state.players.player1 && state.players.player2) {
      newState.players = {
        player1: { ...state.players.player1, score: state.players.player1.score + 2 },
        player2: { ...state.players.player2, score: state.players.player2.score + 1 },
      }
    } else if (winner === 'O' && state.players.player1 && state.players.player2) {
      newState.players = {
        player1: { ...state.players.player1, score: state.players.player1.score + 1 },
        player2: { ...state.players.player2, score: state.players.player2.score + 2 },
      }
    }
  } else {
    newState.currentRound = {
      board: newBoard,
      currentPlayer: currentPlayer === 1 ? 2 : 1,
      winner: null,
      isComplete: false,
    }
  }
  
  return newState
}

export function nextRound(state: GameState): GameState {
  if (state.roundNumber >= state.totalRounds || state.isMatchComplete) {
    return state
  }
  
  const newRoundNumber = state.roundNumber + 1
  const newState = {
    ...state,
    currentRound: {
      board: Array(9).fill(null),
      currentPlayer: 1 as const,
      winner: null,
      isComplete: false,
    },
    roundNumber: newRoundNumber,
  }
  
  if (newRoundNumber > state.totalRounds) {
    newState.isMatchComplete = true
    if (state.players.player1 && state.players.player2) {
      if (state.players.player1.score > state.players.player2.score) {
        newState.matchWinner = state.players.player1
      } else if (state.players.player2.score > state.players.player1.score) {
        newState.matchWinner = state.players.player2
      }
    }
  }
  
  return newState
}

export function resetRound(state: GameState): GameState {
  return {
    ...state,
    currentRound: {
      board: Array(9).fill(null),
      currentPlayer: 1,
      winner: null,
      isComplete: false,
    }
  }
}

export function resetMatch(state: GameState): GameState {
  const newLeaderboard = [...state.leaderboard]
  
  if (state.players.player1 && state.players.player2) {
    [state.players.player1, state.players.player2].forEach(player => {
      const existingIndex = newLeaderboard.findIndex(p => p.name === player.name)
      if (existingIndex >= 0) {
        newLeaderboard[existingIndex] = {
          ...newLeaderboard[existingIndex],
          score: newLeaderboard[existingIndex].score + player.score
        }
      } else {
        newLeaderboard.push({ ...player })
      }
    })
    
    newLeaderboard.sort((a, b) => b.score - a.score)
  }
  
  return {
    players: { player1: null, player2: null },
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
    leaderboard: newLeaderboard,
    gameStarted: false,
  }
}

"use client"

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAppSelector, useAppDispatch } from '@/store/hooks'
import { makeMoveAction, nextRoundAction, resetRoundAction } from '@/store/gameSlice'

export default function GamePage() {
  const gameState = useAppSelector((state) => state.game)
  const dispatch = useAppDispatch()
  const router = useRouter()
  
  const { players, currentRound, roundNumber, totalRounds, gameStarted } = gameState
  
  useEffect(() => {
    if (!players.player1 || !players.player2) {
      router.push('/assignment-1/player-setup')
    }
  }, [players, router])
  
  function handleCellClick(index: number) {
    if (!gameStarted || currentRound.board[index] !== null || currentRound.winner || currentRound.isComplete) return
    
    dispatch(makeMoveAction({ cellIndex: index }))
  }
  
  function handleNextRound() {
    if (roundNumber < totalRounds) {
      dispatch(nextRoundAction())
    } else {
      router.push('/assignment-1/result')
    }
  }
  
  function handleResetRound() {
    dispatch(resetRoundAction())
  }
  
  if (!players.player1 || !players.player2) {
    return (
      <div className="max-w-md mx-auto text-center">
        <p className="text-gray-600">Redirecting to player setup...</p>
      </div>
    )
  }
  
  const isRoundComplete = currentRound.winner !== null || currentRound.board.every((cell: 'X' | 'O' | null) => cell !== null)
  
  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Round {roundNumber} of {totalRounds}
          </h1>
          
          <div className="flex justify-between items-center max-w-md mx-auto mb-6">
            <div className={`p-4 rounded-lg ${currentRound.currentPlayer === 1 ? 'bg-blue-100 dark:bg-blue-900/30' : 'bg-gray-100 dark:bg-gray-700'}`}>
              <div className="text-sm text-gray-600 dark:text-gray-300">{players.player1?.name}</div>
              <div className="text-xl font-bold text-blue-600 dark:text-blue-400">X</div>
              <div className="text-lg font-medium">{players.player1?.score} pts</div>
            </div>
            
            <div className="text-2xl font-bold text-gray-400">VS</div>
            
            <div className={`p-4 rounded-lg ${currentRound.currentPlayer === 2 ? 'bg-red-100 dark:bg-red-900/30' : 'bg-gray-100 dark:bg-gray-700'}`}>
              <div className="text-sm text-gray-600 dark:text-gray-300">{players.player2?.name}</div>
              <div className="text-xl font-bold text-red-600 dark:text-red-400">O</div>
              <div className="text-lg font-medium">{players.player2?.score} pts</div>
            </div>
          </div>
          
          {currentRound.winner && (
            <div className="mb-6 p-4 rounded-lg bg-green-100 dark:bg-green-900/30">
              <p className="text-lg font-medium text-green-800 dark:text-green-200">
                {currentRound.winner === 'draw' 
                  ? "It's a draw!" 
                  : `${currentRound.winner === 'X' ? players.player1?.name : players.player2?.name} wins this round!`
                }
              </p>
            </div>
          )}
          
          {!currentRound.winner && !currentRound.isComplete && (
            <p className="text-gray-600">
              {(currentRound.currentPlayer === 1 ? players.player1?.name : players.player2?.name)}&apos;s turn
            </p>
          )}
        </div>
        
        <div className="grid grid-cols-3 gap-2 max-w-xs mx-auto mb-8">
          {currentRound.board.map((cell: 'X' | 'O' | null, index: number) => (
            <button
              key={index}
              onClick={() => handleCellClick(index)}
              disabled={!gameStarted || cell !== null || currentRound.winner !== null}
              className={`aspect-square text-4xl font-bold border-2 rounded-lg transition-all duration-200 
                ${cell === 'X' ? 'bg-blue-100 text-blue-600 border-blue-300 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-600' : ''}
                ${cell === 'O' ? 'bg-red-100 text-red-600 border-red-300 dark:bg-red-900/30 dark:text-red-400 dark:border-red-600' : ''}
                ${cell === null ? 'bg-gray-50 border-gray-300 hover:bg-gray-100 dark:bg-gray-700 dark:border-gray-600 dark:hover:bg-gray-600' : ''}
                ${!gameStarted || currentRound.winner ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}
              `}
            >
              {cell}
            </button>
          ))}
        </div>
        
        {isRoundComplete && (
          <div className="text-center space-y-4">
            {roundNumber < totalRounds ? (
              <button
                onClick={handleNextRound}
                className="bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
              >
                Next Round
              </button>
            ) : (
              <button
                onClick={() => router.push('/assignment-1/result')}
                className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
              >
                View Final Results
              </button>
            )}
            
            <div>
              <button
                onClick={handleResetRound}
                className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 underline"
              >
                Reset This Round
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

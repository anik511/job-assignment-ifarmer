"use client"

import { useRouter } from 'next/navigation'
import { useAppSelector, useAppDispatch } from '@/store/hooks'
import { resetMatchAction } from '@/store/gameSlice'

export default function ResultPage() {
  const gameState = useAppSelector((state) => state.game)
  const dispatch = useAppDispatch()
  const router = useRouter()
  
  const { players, matchWinner, isMatchComplete } = gameState
  
  const player1 = players.player1
  const player2 = players.player2
  
  const winner = matchWinner || (player1 && player2 && player1.score > player2.score ? player1 : 
                                  player1 && player2 && player2.score > player1.score ? player2 : null)
  
  const isDraw = player1 && player2 && player1.score === player2.score
  
  function handlePlayAgain() {
    dispatch(resetMatchAction())
    router.push('/assignment-1/player-setup')
  }
  
  function viewLeaderboard() {
    router.push('/assignment-1/leaderboard')
  }
  
  if (!player1 || !player2) {
    return (
      <div className="max-w-md mx-auto text-center">
        <p className="text-gray-600">No game data found...</p>
        <button
          onClick={() => router.push('/assignment-1')}
          className="mt-4 text-blue-600 hover:text-blue-700 underline"
        >
          Go back to home
        </button>
      </div>
    )
  }
  
  return (
    <div className="max-w-lg mx-auto p-4">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold mb-3">
            {isMatchComplete ? 'Match Complete!' : 'Results'}
          </h1>
          
          {isMatchComplete && (
            <div className="text-4xl mb-3">
              {isDraw ? '🤝' : '🏆'}
            </div>
          )}
          
          <div className={`inline-block px-4 py-2 rounded ${
            isDraw 
              ? 'bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300' 
              : 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300'
          }`}>
            <p className="font-bold">
              {isDraw 
                ? "It's a tie!" 
                : `${winner?.name} wins!`
              }
            </p>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className={`p-6 rounded-lg border-2 ${
            winner?.id === 1 
              ? 'bg-green-50 border-green-300 dark:bg-green-900/20 dark:border-green-600' 
              : 'bg-gray-50 border-gray-300 dark:bg-gray-700 dark:border-gray-600'
          }`}>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                X
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                {player1.name}
              </h3>
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {player1.score}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                points
              </p>
              {winner?.id === 1 && (
                <div className="mt-3 inline-block bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 px-3 py-1 rounded-full text-sm font-medium">
                  Winner! 🏆
                </div>
              )}
            </div>
          </div>
          
          <div className={`p-6 rounded-lg border-2 ${
            winner?.id === 2 
              ? 'bg-green-50 border-green-300 dark:bg-green-900/20 dark:border-green-600' 
              : 'bg-gray-50 border-gray-300 dark:bg-gray-700 dark:border-gray-600'
          }`}>
            <div className="text-center">
              <div className="text-4xl font-bold text-red-600 dark:text-red-400 mb-2">
                O
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                {player2.name}
              </h3>
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {player2.score}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                points
              </p>
              {winner?.id === 2 && (
                <div className="mt-3 inline-block bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 px-3 py-1 rounded-full text-sm font-medium">
                  Winner! 🏆
                </div>
              )}
            </div>
          </div>
        </div>
        
        
        <div className="space-y-4">
          <button
            onClick={handlePlayAgain}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded"
          >
            Play Again
          </button>
          
          <button
            onClick={handlePlayAgain}
            className="w-full bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded"
          >
            New Players
          </button>
          
          <button
            onClick={viewLeaderboard}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded"
          >
            View Leaderboard
          </button>
        </div>
      </div>
    </div>
  )
}

"use client"

import { useRouter } from 'next/navigation'
import { useAppSelector } from '@/store/hooks'
import { Player } from '@/types/game'

export default function LeaderboardPage() {
  const gameState = useAppSelector((state) => state.game)
  const router = useRouter()
  const { players, leaderboard, roundNumber, totalRounds, isMatchComplete } = gameState
  
  const sortedPlayers = leaderboard.length > 0 
    ? [...leaderboard].sort((a, b) => b.score - a.score)
    : Object.values(players).filter((player): player is Player => player !== null)
        .sort((a, b) => b.score - a.score)
  
  function getPositionIcon(index: number) {
    switch (index) {
      case 0: return '🥇'
      case 1: return '🥈'
      case 2: return '🥉'
      default: return `${index + 1}.`
    }
  }
  
  function getPositionColor(index: number) {
    switch (index) {
      case 0: return 'bg-yellow-100 border-yellow-300 dark:bg-yellow-900/20 dark:border-yellow-600'
      case 1: return 'bg-gray-100 border-gray-300 dark:bg-gray-800 dark:border-gray-600'
      case 2: return 'bg-orange-100 border-orange-300 dark:bg-orange-900/20 dark:border-orange-600'
      default: return 'bg-white border-gray-200 dark:bg-gray-800 dark:border-gray-700'
    }
  }
  
  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
        <div className="text-center mb-8">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => router.back()}
              className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span>Back</span>
            </button>
            <div className="flex-1"></div>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Leaderboard
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            {isMatchComplete 
              ? 'Final Match Results' 
              : `Current Standings - Round ${roundNumber} of ${totalRounds}`
            }
          </p>
        </div>
        
        {sortedPlayers.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🏆</div>
            <h2 className="text-xl font-medium text-gray-600 dark:text-gray-300 mb-2">
              No games played yet
            </h2>
            <p className="text-gray-500 dark:text-gray-400">
              Start a game to see player scores here
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {sortedPlayers.map((player, index) => (
              <div
                key={player.id}
                className={`p-6 rounded-lg border-2 transition-all duration-200 ${getPositionColor(index)}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="text-2xl font-bold">
                      {getPositionIcon(index)}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        {player.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Player {player.symbol}
                      </p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-3xl font-bold text-gray-900 dark:text-white">
                      {player.score}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      points
                    </p>
                  </div>
                </div>
                
                {index === 0 && sortedPlayers.length > 1 && player.score > sortedPlayers[1].score && (
                  <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/10 rounded-lg">
                    <p className="text-sm text-yellow-800 dark:text-yellow-200 text-center font-medium">
                      🏆 Current Leader!
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
        
        {sortedPlayers.length > 0 && (
          <div className="mt-8 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <h3 className="font-medium text-blue-800 dark:text-blue-200 mb-3">
              Scoring System
            </h3>
            <div className="text-sm text-blue-600 dark:text-blue-300 space-y-1">
              <div className="flex justify-between">
                <span>Win a round:</span>
                <span className="font-medium">+2 points</span>
              </div>
              <div className="flex justify-between">
                <span>Draw a round:</span>
                <span className="font-medium">+1 point each</span>
              </div>
              <div className="flex justify-between">
                <span>Lose a round:</span>
                <span className="font-medium">+0 points</span>
              </div>
            </div>
          </div>
        )}
        
        {isMatchComplete && sortedPlayers.length > 0 && (
          <div className="mt-6 text-center">
            <div className="inline-flex items-center space-x-2 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 px-4 py-2 rounded-lg">
              <span className="text-lg">🎉</span>
              <span className="font-medium">
                Match Complete! {sortedPlayers[0].name} wins with {sortedPlayers[0].score} points!
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

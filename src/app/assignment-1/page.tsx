"use client"

import Link from "next/link";
import { useAppSelector } from "@/store/hooks";

export default function Assignment1Page() {
  const gameState = useAppSelector((state) => state.game)
  
  const hasActiveGame = gameState.gameStarted && !gameState.isMatchComplete

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="max-w-lg mx-auto text-center">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-blue-600 mb-3">
            🎮 Tic-Tac-Toe
          </h1>
          <p className="text-gray-600">
            Challenge your friends in this classic game!
          </p>
          
          {hasActiveGame && (
            <div className="mt-3 p-3 bg-blue-50 rounded">
              <p className="text-blue-700 font-medium text-sm">
                Game in progress: {gameState.players.player1?.name} vs {gameState.players.player2?.name}
              </p>
              <p className="text-xs text-blue-600">
                Round {gameState.roundNumber} of {gameState.totalRounds}
              </p>
            </div>
          )}
        </div>

        {/* Game Menu Options */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Start New Game */}
          <Link 
            href="/assignment-1/player-setup"
            className="group bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-500 transform hover:-translate-y-1"
          >
            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
              🚀
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
              Start New Game
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Set up players and begin a new match
            </p>
          </Link>

          {/* Continue Game */}
          <Link 
            href="/assignment-1/game"
            className="group bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:border-green-300 dark:hover:border-green-500 transform hover:-translate-y-1"
          >
            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
              ▶️
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
              Continue Game
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Resume your current match
            </p>
          </Link>

          {/* View Leaderboard */}
          <Link 
            href="/assignment-1/leaderboard"
            className="group bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:border-yellow-300 dark:hover:border-yellow-500 transform hover:-translate-y-1"
          >
            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
              🏆
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
              Leaderboard
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Check top players and scores
            </p>
          </Link>

          {/* Game Rules */}
          <div className="group bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-500 transform hover:-translate-y-1">
            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
              📋
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
              How to Play
            </h2>
            <div className="text-left text-sm text-gray-600 dark:text-gray-300 space-y-2">
              <p>• Best of 5 rounds</p>
              <p>• Win: 2 points, Loss: 1 point</p>
              <p>• Draw: 0 points</p>
              <p>• First to 3 round wins!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

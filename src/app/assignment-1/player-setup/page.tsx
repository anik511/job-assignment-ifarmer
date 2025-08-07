"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAppDispatch } from '@/store/hooks'
import { setPlayersAction } from '@/store/gameSlice'

export default function PlayerSetupPage() {
  const [player1Name, setPlayer1Name] = useState('')
  const [player2Name, setPlayer2Name] = useState('')
  const [errors, setErrors] = useState<{ player1?: string; player2?: string }>({})
  
  const dispatch = useAppDispatch()
  const router = useRouter()
  
  function validateForm() {
    const newErrors: { player1?: string; player2?: string } = {}
    
    if (!player1Name.trim()) {
      newErrors.player1 = 'Player 1 name is required'
    } else if (player1Name.trim().length < 2) {
      newErrors.player1 = 'Name must be at least 2 characters'
    }
    
    if (!player2Name.trim()) {
      newErrors.player2 = 'Player 2 name is required'
    } else if (player2Name.trim().length < 2) {
      newErrors.player2 = 'Name must be at least 2 characters'
    }
    
    if (player1Name.trim().toLowerCase() === player2Name.trim().toLowerCase()) {
      newErrors.player2 = 'Player names must be different'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }
  
  function handleStartGame() {
    if (validateForm()) {
      dispatch(setPlayersAction({
        player1Name: player1Name.trim(),
        player2Name: player2Name.trim()
      }))
      router.push('/assignment-1/game')
    }
  }
  
  return (
    <div className="max-w-md mx-auto">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Player Setup
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Enter player names to start the game
          </p>
        </div>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Player 1 (X)
            </label>
            <input
              type="text"
              value={player1Name}
              onChange={(e) => setPlayer1Name(e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                errors.player1 ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter Player 1 name"
              maxLength={20}
            />
            {errors.player1 && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                {errors.player1}
              </p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Player 2 (O)
            </label>
            <input
              type="text"
              value={player2Name}
              onChange={(e) => setPlayer2Name(e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                errors.player2 ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter Player 2 name"
              maxLength={20}
            />
            {errors.player2 && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                {errors.player2}
              </p>
            )}
          </div>
          
          <button
            onClick={handleStartGame}
            disabled={!player1Name.trim() || !player2Name.trim()}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium py-3 px-4 rounded-lg transition-colors"
          >
            Start Game
          </button>
        </div>
        
        <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <h3 className="font-medium text-blue-800 dark:text-blue-200 mb-2">
            Game Rules
          </h3>
          <ul className="text-sm text-blue-600 dark:text-blue-300 space-y-1">
            <li>• Best of 5 rounds</li>
            <li>• Win = 2 points, Loss = 1 point, Draw = 0 points</li>
            <li>• Player with most points after 5 rounds wins!</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

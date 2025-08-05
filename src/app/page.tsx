import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-6">
            React Developer Assignment
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Showcase of modern React development with Next.js, TypeScript, and Redux Toolkit
          </p>
        </div>

        {/* Assignment Cards */}
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Assignment 1 */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
              <div className="text-center">
                <div className="text-4xl mb-4">🎮</div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Assignment 1
                </h2>
                <h3 className="text-xl text-blue-600 dark:text-blue-400 mb-4">
                  Tic-Tac-Toe Game
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Multi-player game with Redux state management and scoring system
                </p>
                <Link
                  href="/assignment-1"
                  className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
                >
                  Start Playing
                </Link>
              </div>
            </div>

            {/* Assignment 2 */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
              <div className="text-center">
                <div className="text-4xl mb-4">🛍️</div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Assignment 2
                </h2>
                <h3 className="text-xl text-green-600 dark:text-green-400 mb-4">
                  CRUD Product App
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Product management system with full CRUD operations
                </p>
                <Link
                  href="/assignment-2"
                  className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
                >
                  Manage Products
                </Link>
              </div>
            </div>
          </div>
      </div>
    </div>
  );
}

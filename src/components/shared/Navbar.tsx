"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navigationItems = [
  {
    id: "assignment-1",
    label: "Assignment-1",
    href: "/assignment-1",
    icon: "🎮",
    description: "Tic-Tac-Toe Game",
    subItems: [
      { label: "Start New Game", href: "/assignment-1/player-setup" },
      { label: "Continue Game", href: "/assignment-1/game" },
      { label: "Leaderboard", href: "/assignment-1/leaderboard" },
    ],
  },
  {
    id: "assignment-2",
    label: "Assignment-2", 
    href: "/assignment-2",
    icon: "🛍️",
    description: "CRUD Product App",
    subItems: [
      { label: "Products", href: "/assignment-2/products" },
      { label: "Create Product", href: "/assignment-2/products/create" },
    ],
  },
];

const GlobalNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const pathname = usePathname();

  // Determine which assignment is currently active
  const currentAssignment = pathname.startsWith("/assignment-1") 
    ? "assignment-1" 
    : pathname.startsWith("/assignment-2") 
    ? "assignment-2" 
    : null;

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleSubmenu = (itemId: string) => {
    setOpenSubmenu(openSubmenu === itemId ? null : itemId);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    setOpenSubmenu(null);
  };
  
  return (
    <header className="bg-white dark:bg-gray-900 shadow-lg border-b-2 border-gradient-to-r from-blue-500 to-purple-500 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo/Brand */}
          <div className="flex items-center space-x-3">
            <Link 
              href="/" 
              className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                IF
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                  i-Farmer
                </h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  React Developer Assignment
                </p>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigationItems.map((item) => (
              <div key={item.id} className="relative group">
                <Link
                  href={item.href}
                  className={`
                    flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                    ${currentAssignment === item.id 
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg' 
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-blue-600 dark:hover:text-blue-400'
                    }
                  `}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
                
                {/* Desktop Dropdown Menu */}
                <div className="absolute top-full left-0 mt-1 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="p-2">
                    <p className="text-xs text-gray-500 dark:text-gray-400 px-3 py-1 border-b border-gray-200 dark:border-gray-700 mb-1">
                      {item.description}
                    </p>
                    {item.subItems.map((subItem) => (
                      <Link
                        key={subItem.href}
                        href={subItem.href}
                        className={`
                          block px-3 py-2 text-sm rounded transition-colors
                          ${pathname === subItem.href
                            ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-medium'
                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                          }
                        `}
                      >
                        {subItem.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="lg:hidden p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle navigation menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <nav className="lg:hidden mt-4 pb-4 border-t border-gray-200 dark:border-gray-700 pt-4">
            <div className="space-y-2">
              {navigationItems.map((item) => (
                <div key={item.id} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <Link
                      href={item.href}
                      onClick={closeMenu}
                      className={`
                        flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors w-full
                        ${currentAssignment === item.id 
                          ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white' 
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                        }
                      `}
                    >
                      <span className="text-lg">{item.icon}</span>
                      <div className="flex-1">
                        <div>{item.label}</div>
                        <div className="text-xs opacity-75">{item.description}</div>
                      </div>
                    </Link>
                    <button
                      onClick={() => toggleSubmenu(item.id)}
                      className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                    >
                      <svg 
                        className={`w-4 h-4 transition-transform ${openSubmenu === item.id ? 'rotate-180' : ''}`} 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  </div>
                  
                  {/* Mobile Submenu */}
                  {openSubmenu === item.id && (
                    <div className="ml-6 space-y-1 pl-4 border-l-2 border-gray-200 dark:border-gray-700">
                      {item.subItems.map((subItem) => (
                        <Link
                          key={subItem.href}
                          href={subItem.href}
                          onClick={closeMenu}
                          className={`
                            block px-3 py-2 text-sm rounded-lg transition-colors
                            ${pathname === subItem.href
                              ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-medium'
                              : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-200'
                            }
                          `}
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            {/* Mobile Home Link */}
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <Link
                href="/"
                onClick={closeMenu}
                className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                <span>Back to Home</span>
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default GlobalNavbar;

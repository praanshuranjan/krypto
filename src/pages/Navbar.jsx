import { useState } from "react"
import { BarChart3, Menu, X, Search, Bell, User, ArrowRight } from "lucide-react"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="sticky top-0 z-50 w-full bg-slate-900 border-b border-slate-800">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <a href="/">
          <div className="flex items-center space-x-2">
            <BarChart3 className="h-6 w-6 text-emerald-500" />
            <span className="text-lg font-bold text-white">CryptoTracker</span>
          </div>
          </a>
          <div className="hidden md:flex items-center space-x-4">
          <nav className="hidden md:flex items-center space-x-6">
            <a href="/" className="text-sm font-medium text-white hover:text-emerald-400 transition-colors">
              Home
            </a>
            <a href="/cryptocurrencies" className="text-sm font-medium text-white hover:text-emerald-400 transition-colors">
              Cryptocurrencies
            </a>
          </nav>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-slate-300 hover:text-white" onClick={toggleMenu}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-slate-900 border-t border-slate-800">
          <div className="container px-4 py-4 space-y-4">
            <nav className="flex flex-col space-y-4">
              <a href="/" className="text-base font-medium text-white hover:text-emerald-400 transition-colors">
                Home
              </a>
              <a href="/cryptocurrencies" className="text-base font-medium text-white hover:text-emerald-400 transition-colors">
                Cryptocurrencies
              </a>
            </nav>
            
          </div>
        </div>
      )}
    </header>
  )
}
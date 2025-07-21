import { useState, useEffect } from "react"
import image from "../images/cryptobitcoin.gif"
import { ArrowRight, BarChart3, Clock, Globe, TrendingUp, ChevronUp, ChevronDown, Coins, Users, Shield, Zap, Star, TrendingDown, Activity } from "lucide-react"

export default function Home() {
  const [scrollY, setScrollY] = useState(0)
  const [cryptoPrice, setCryptoPrice] = useState(40213.75)
  const [priceDirection, setPriceDirection] = useState(true)
  
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])
  
  useEffect(() => {
    const interval = setInterval(() => {
      const change = (Math.random() * 50) - 25
      setCryptoPrice(prev => {
        const newPrice = prev + change
        setPriceDirection(change >= 0)
        return newPrice
      })
    }, 3000)
    
    return () => clearInterval(interval)
  }, [])

  const features = [
    {
      icon: <TrendingUp className="h-8 w-8 text-emerald-400" />,
      title: "Real-Time Price Updates",
      description: "Get the latest cryptocurrency prices updated in real-time from trusted sources."
    },
    {
      icon: <BarChart3 className="h-8 w-8 text-emerald-400" />,
      title: "Detailed Analytics",
      description: "Access comprehensive market data, price history, and performance metrics."
    },
    {
      icon: <Clock className="h-8 w-8 text-emerald-400" />,
      title: "Historical Data",
      description: "View historical price movements and analyze trends over time."
    },
    {
      icon: <Globe className="h-8 w-8 text-emerald-400" />,
      title: "Global Market Coverage",
      description: "Track cryptocurrencies from exchanges around the world in one place."
    },
    {
      icon: <Shield className="h-8 w-8 text-emerald-400" />,
      title: "Secure & Reliable",
      description: "Built with security in mind, ensuring your data and transactions are protected."
    },
    {
      icon: <Zap className="h-8 w-8 text-emerald-400" />,
      title: "Lightning Fast",
      description: "Experience blazing fast performance with optimized data delivery and caching."
    }
  ]

  const stats = [
    { label: "Cryptocurrencies", value: "2,000+", icon: <Coins className="h-6 w-6" /> },
    { label: "Active Users", value: "50K+", icon: <Users className="h-6 w-6" /> },
    { label: "Data Points", value: "1M+", icon: <Activity className="h-6 w-6" /> },
    { label: "Uptime", value: "99.9%", icon: <Shield className="h-6 w-6" /> }
  ]

  const topCryptos = [
    { name: "Bitcoin", symbol: "BTC", price: "$43,250", change: "+2.5%", trend: "up" },
    { name: "Ethereum", symbol: "ETH", price: "$2,680", change: "+1.8%", trend: "up" },
    { name: "Cardano", symbol: "ADA", price: "$0.52", change: "-0.3%", trend: "down" },
    { name: "Solana", symbol: "SOL", price: "$98.45", change: "+4.2%", trend: "up" }
  ]

  return (
    <div className="flex flex-col min-h-screen">
      
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
        <div 
          className="container px-4 md:px-6 mx-auto" 
          style={{ 
            transform: `translateY(${scrollY * 0.1}px)`,
            opacity: Math.max(1 - scrollY * 0.001, 0.7),
            transition: "transform 0.1s ease-out"
          }}
        >
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <div className="flex items-center mb-4 opacity-90">
                  <div className="flex items-center px-3 py-1 bg-slate-800 rounded-lg shadow-inner">
                    <Coins className="h-4 w-4 mr-2 text-emerald-400" />
                    <span className="text-white text-sm font-medium">BTC</span>
                    <span className="mx-2 text-slate-400">|</span>
                    <span className={`text-sm font-medium ${priceDirection ? "text-emerald-400" : "text-red-400"}`}>
                      ${cryptoPrice.toFixed(2)}
                    </span>
                    {priceDirection ? 
                      <ChevronUp className="h-4 w-4 ml-1 text-emerald-400" /> : 
                      <ChevronDown className="h-4 w-4 ml-1 text-red-400" />
                    }
                  </div>
                </div>
                
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-white">
                  Real-Time Cryptocurrency Tracking & Analysis
                </h1>
                <p className="max-w-[600px] text-slate-300 md:text-xl">
                  Stay ahead of the market with our powerful crypto tracking platform. Get real-time prices, detailed
                  analytics, and market insights.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <a href="/cryptocurrencies">
                  <button className="bg-emerald-600 flex items-center justify-center rounded-2xl px-6 py-3 hover:bg-emerald-500 text-white font-medium shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 transform hover:scale-105">
                    View Cryptocurrencies <ArrowRight className="ml-2 h-5 w-5" />
                  </button>
                </a>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative w-[400px] h-[400px] sm:w-[500px] sm:h-[500px] md:w-[600px] md:h-[600px] flex items-center justify-center">
                <img
                  src={image}
                  alt="Crypto Dashboard"
                  className="object-contain w-full h-full rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-8 md:py-10 lg:py-12 bg-slate-900">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-emerald-900/20 px-3 py-1 text-sm text-emerald-400">
                Features
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-white">
                Everything you need to track crypto
              </h2>
              <p className="max-w-[900px] text-slate-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Our platform provides comprehensive tools to monitor and analyze cryptocurrency markets in real-time.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="flex items-start gap-4 p-4 rounded-xl bg-slate-800 border border-slate-700"
              >
                <div className="mt-1">{feature.icon}</div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-white">{feature.title}</h3>
                  <p className="text-slate-300">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32 bg-slate-900">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-white mb-4">
              Platform Statistics
            </h2>
            <p className="text-slate-300 max-w-2xl mx-auto">
              Trusted by thousands of users worldwide with proven reliability and performance.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="bg-slate-800 rounded-xl p-6 mb-4">
                  <div className="text-emerald-400 mb-2 flex justify-center">
                    {stat.icon}
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-slate-300 text-sm">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32 bg-slate-900">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-white mb-4">
              Top Cryptocurrencies
            </h2>
            <p className="text-slate-300 max-w-2xl mx-auto">
              Track the most popular cryptocurrencies with real-time price updates.
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {topCryptos.map((crypto, index) => (
                <div key={index} className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="font-bold text-white">{crypto.name}</h3>
                      <p className="text-slate-400 text-sm">{crypto.symbol}</p>
                    </div>
                    <div className={`flex items-center ${crypto.trend === 'up' ? 'text-emerald-400' : 'text-red-400'}`}>
                      {crypto.trend === 'up' ? <TrendingUp className="h-4 w-4 mr-1" /> : <TrendingDown className="h-4 w-4 mr-1" />}
                      <span className="text-sm font-medium">{crypto.change}</span>
                    </div>
                  </div>
                  <div className="text-xl font-bold text-white">{crypto.price}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32 bg-slate-900 text-white">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-emerald-900/20 px-3 py-1 text-sm text-emerald-400 mb-4">
                Get Started
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Ready to start tracking?</h2>
              <p className="max-w-[600px] text-slate-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Access our comprehensive cryptocurrency dashboard now and join thousands of users worldwide.
              </p>
            </div>
            <div className="flex flex-col gap-4 min-[400px]:flex-row">
              <a href="/cryptocurrencies">
                <button className="bg-emerald-600 flex items-center justify-center rounded-2xl px-6 py-3 hover:bg-emerald-500 text-white font-medium shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 transform hover:scale-105">
                  View All Cryptocurrencies
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
              </a>
              <button className="border border-emerald-400 text-emerald-400 flex items-center justify-center rounded-2xl px-6 py-3 hover:bg-emerald-400/10 font-medium transition-all duration-300">
                Learn More
                <Star className="ml-2 h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      <footer className="w-full py-6 bg-slate-950 text-slate-400">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="flex items-center space-x-2">
              <BarChart3 className="h-6 w-6" />
              <span className="text-lg font-bold">CryptoTracker</span>
            </div>
            <p className="text-sm">©️ {new Date().getFullYear()} CryptoTracker. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
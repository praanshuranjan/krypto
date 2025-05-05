import image from "../images/michael-fortsch-gRAS87wSVCs-unsplash.jpg"
import { ArrowRight, BarChart3, Clock, Globe, TrendingUp } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
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
                  <button className="bg-emerald-600 flex items-center justify-center rounded-xl p-2 hover:bg-emerald-700 text-white">
                    View Cryptocurrencies <ArrowRight className="ml-2 h-4 w-4" />
                  </button>
                </a>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] md:w-[500px] md:h-[500px]">
                <img
                  src={image}
                  alt="Crypto Dashboard"
                  width={500}
                  height={500}
                  className="object-cover rounded-lg shadow-2xl"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-slate-50 dark:bg-slate-900">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-emerald-100 dark:bg-emerald-900/20 px-3 py-1 text-sm text-emerald-700 dark:text-emerald-400">
                Features
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-slate-900 dark:text-white">
                Everything you need to track crypto
              </h2>
              <p className="max-w-[900px] text-slate-600 dark:text-slate-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Our platform provides comprehensive tools to monitor and analyze cryptocurrency markets in real-time.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
            <div className="grid gap-6">
              <div className="flex items-start gap-4">
                <TrendingUp className="h-8 w-8 text-emerald-600 dark:text-emerald-500" />
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">Real-Time Price Updates</h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    Get the latest cryptocurrency prices updated in real-time from trusted sources.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <BarChart3 className="h-8 w-8 text-emerald-600 dark:text-emerald-500" />
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">Detailed Analytics</h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    Access comprehensive market data, price history, and performance metrics.
                  </p>
                </div>
              </div>
            </div>
            <div className="grid gap-6">
              <div className="flex items-start gap-4">
                <Clock className="h-8 w-8 text-emerald-600 dark:text-emerald-500" />
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">Historical Data</h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    View historical price movements and analyze trends over time.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Globe className="h-8 w-8 text-emerald-600 dark:text-emerald-500" />
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">Global Market Coverage</h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    Track cryptocurrencies from exchanges around the world in one place.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-slate-900 text-white">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Ready to start tracking?</h2>
              <p className="max-w-[600px] text-slate-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Access our comprehensive cryptocurrency dashboard now.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <a href="/cryptocurrencies">
              <button className="bg-emerald-600 flex items-center justify-center rounded-xl p-2 hover:bg-emerald-700 text-white">
                  View All Cryptocurrencies
                  <ArrowRight className="ml-2 h-4 w-4" />
                </button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-6 bg-slate-950 text-slate-400">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="flex items-center space-x-2">
              <BarChart3 className="h-6 w-6" />
              <span className="text-lg font-bold">CryptoTracker</span>
            </div>
            <p className="text-sm">© {new Date().getFullYear()} CryptoTracker. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

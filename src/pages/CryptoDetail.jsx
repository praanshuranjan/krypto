import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, TrendingUp, TrendingDown, BarChart3, Globe, Clock, DollarSign } from "lucide-react";

export default function CryptoDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [crypto, setCrypto] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCryptoDetail = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/${id}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch crypto data");
      }

      const data = await response.json();
      setCrypto(data);
      setIsLoading(false);
    } catch (err) {
      console.error("Error fetching crypto detail:", err);
      setError("Failed to load cryptocurrency data. Please try again later.");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCryptoDetail();
  }, [id]);

  const handleBackClick = () => {
    navigate("/cryptocurrencies");
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 p-6 rounded-lg text-center max-w-2xl mx-auto mt-10">
        <p className="text-red-600 text-lg">{error}</p>
        <button
          onClick={fetchCryptoDetail}
          className="mt-4 bg-emerald-600 text-white px-6 py-3 rounded-xl hover:bg-emerald-500 font-medium shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 transform hover:scale-105"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!crypto) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500 text-lg">Cryptocurrency not found.</p>
      </div>
    );
  }

  const priceChange24h = crypto.market_data?.price_change_percentage_24h || 0;
  const priceChange7d = crypto.market_data?.price_change_percentage_7d || 0;
  const priceChange30d = crypto.market_data?.price_change_percentage_30d || 0;

  return (
    <div className="max-w-6xl mx-auto p-4">
      <header className="mb-8">
        <button 
          onClick={handleBackClick}
          className="mb-4 flex items-center text-emerald-400 hover:text-emerald-300 transition-all duration-300 px-4 py-2 rounded-xl hover:bg-emerald-400/10"
        >
          <ArrowLeft className="h-5 w-5 mr-1" />
          Back to Cryptocurrencies
        </button>
        
        <div className="flex items-center mb-6">
          <img 
            src={crypto.image?.large} 
            alt={crypto.name} 
            className="w-16 h-16 mr-4" 
          />
          <div>
            <h1 className="text-3xl font-bold text-white">{crypto.name}</h1>
            <p className="text-slate-300 text-lg">{crypto.symbol?.toUpperCase()}</p>
          </div>
        </div>
      </header>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
          <div className="flex items-center mb-4">
            <DollarSign className="h-6 w-6 text-emerald-400 mr-2" />
            <h3 className="text-lg font-semibold text-white">Current Price</h3>
          </div>
          <p className="text-2xl font-bold text-white">
            ${crypto.market_data?.current_price?.usd?.toLocaleString() || "N/A"}
          </p>
        </div>
 
        <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
          <div className="flex items-center mb-4">
            <BarChart3 className="h-6 w-6 text-emerald-400 mr-2" />
            <h3 className="text-lg font-semibold text-white">Market Cap</h3>
          </div>
          <p className="text-2xl font-bold text-white">
            ${crypto.market_data?.market_cap?.usd?.toLocaleString() || "N/A"}
          </p>
        </div>

        <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
          <div className="flex items-center mb-4">
            <Globe className="h-6 w-6 text-emerald-400 mr-2" />
            <h3 className="text-lg font-semibold text-white">Market Rank</h3>
          </div>
          <p className="text-2xl font-bold text-white">
            #{crypto.market_cap_rank || "N/A"}
          </p>
        </div>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
          <div className="flex items-center mb-4">
            <Clock className="h-6 w-6 text-emerald-400 mr-2" />
            <h3 className="text-lg font-semibold text-white">24h Change</h3>
          </div>
          <div className="flex items-center">
            {priceChange24h >= 0 ? (
              <TrendingUp className="h-5 w-5 text-emerald-400 mr-2" />
            ) : (
              <TrendingDown className="h-5 w-5 text-red-400 mr-2" />
            )}
            <p className={`text-xl font-bold ${priceChange24h >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
              {priceChange24h >= 0 ? '+' : ''}{priceChange24h.toFixed(2)}%
            </p>
          </div>
        </div>

        <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
          <div className="flex items-center mb-4">
            <Clock className="h-6 w-6 text-emerald-400 mr-2" />
            <h3 className="text-lg font-semibold text-white">7d Change</h3>
          </div>
          <div className="flex items-center">
            {priceChange7d >= 0 ? (
              <TrendingUp className="h-5 w-5 text-emerald-400 mr-2" />
            ) : (
              <TrendingDown className="h-5 w-5 text-red-400 mr-2" />
            )}
            <p className={`text-xl font-bold ${priceChange7d >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
              {priceChange7d >= 0 ? '+' : ''}{priceChange7d.toFixed(2)}%
            </p>
          </div>
        </div>

        <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
          <div className="flex items-center mb-4">
            <Clock className="h-6 w-6 text-emerald-400 mr-2" />
            <h3 className="text-lg font-semibold text-white">30d Change</h3>
          </div>
          <div className="flex items-center">
            {priceChange30d >= 0 ? (
              <TrendingUp className="h-5 w-5 text-emerald-400 mr-2" />
            ) : (
              <TrendingDown className="h-5 w-5 text-red-400 mr-2" />
            )}
            <p className={`text-xl font-bold ${priceChange30d >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
              {priceChange30d >= 0 ? '+' : ''}{priceChange30d.toFixed(2)}%
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
          <h3 className="text-lg font-semibold mb-4 text-white">Price Statistics</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-slate-300">24h High</span>
              <span className="font-medium text-white">${crypto.market_data?.high_24h?.usd?.toLocaleString() || "N/A"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-300">24h Low</span>
              <span className="font-medium text-white">${crypto.market_data?.low_24h?.usd?.toLocaleString() || "N/A"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-300">Circulating Supply</span>
              <span className="font-medium text-white">{crypto.market_data?.circulating_supply?.toLocaleString() || "N/A"} {crypto.symbol?.toUpperCase()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-300">Total Supply</span>
              <span className="font-medium text-white">{crypto.market_data?.total_supply?.toLocaleString() || "N/A"} {crypto.symbol?.toUpperCase()}</span>
            </div>
          </div>
        </div>

        <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
          <h3 className="text-lg font-semibold mb-4 text-white">Market Data</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-slate-300">Volume 24h</span>
              <span className="font-medium text-white">${crypto.market_data?.total_volume?.usd?.toLocaleString() || "N/A"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-300">Market Cap Dominance</span>
              <span className="font-medium text-white">{crypto.market_data?.market_cap_percentage?.usd?.toFixed(2) || "N/A"}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-300">All Time High</span>
              <span className="font-medium text-white">${crypto.market_data?.ath?.usd?.toLocaleString() || "N/A"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-300">All Time Low</span>
              <span className="font-medium text-white">${crypto.market_data?.atl?.usd?.toLocaleString() || "N/A"}</span>
            </div>
          </div>
        </div>
      </div>

      {crypto.description?.en && (
        <div className="mt-8 bg-slate-800 p-6 rounded-lg border border-slate-700">
          <h3 className="text-lg font-semibold mb-4 text-white">About {crypto.name}</h3>
          <div 
            className="text-slate-300 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: crypto.description.en }}
          />
        </div>
      )}
    </div>
  );
}
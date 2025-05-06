import { useState, useEffect } from "react";

export default function SimpleCryptoDashboard() {
  const [cryptos, setCryptos] = useState([]);
  const [filteredCryptos, setFilteredCryptos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchCryptoData = async () => {
    try {
      setIsLoading(true);
      
      const response = await fetch(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false&price_change_percentage=24h"
      );


      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();
      
      setCryptos(data);
      setFilteredCryptos(data);
      setIsLoading(false);
    } catch (err) {
      console.error("Error fetching crypto data:", err);
      setError("Failed to load cryptocurrency data. Please try again later.");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCryptoData();
    const interval = setInterval(() => {
      fetchCryptoData();
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = cryptos.filter(
        (crypto) =>
          crypto.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          crypto.symbol.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredCryptos(filtered);
    } else {
      setFilteredCryptos(cryptos);
    }
  }, [searchTerm, cryptos]);

  const handleBackClick = () => {
    window.location.href = "/";
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 p-6 rounded-lg text-center max-w-2xl mx-auto mt-10">
        <p className="text-red-600 text-lg">{error}</p>
        <button
          onClick={fetchCryptoData}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      
      <header className="mb-8 flex justify-between">
        <div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Crypto Dashboard</h1>
        <p className="text-gray-600">Real-time cryptocurrency market data</p>
        </div>
        <button 
        onClick={handleBackClick}
        className="mb-4 m-5 flex items-center text-blue-600 hover:text-blue-800 transition-colors"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-5 w-5 mr-1" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M10 19l-7-7m0 0l7-7m-7 7h18" 
          />
        </svg>
        Back
      </button>
      </header>
      

      <div className="mb-6">
        <div className="relative">
          <input
            placeholder="Search cryptocurrencies..."
            className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <svg 
            className="absolute left-3 top-3 w-5 h-5 text-gray-400"
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
            />
          </svg>
        </div>
      </div>

      {filteredCryptos.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-500 text-lg">No cryptocurrencies found matching your search.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-4">#</th>
                <th className="p-4">Coin</th>
                <th className="p-4">Price</th>
                <th className="p-4">24h Change</th>
                <th className="p-4">Market Cap</th>
              </tr>
            </thead>
            <tbody>
              {filteredCryptos.map((crypto) => (
                <tr key={crypto.id} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="p-4">{crypto.market_cap_rank}</td>
                  <td className="p-4">
                    <div className="flex items-center">
                      <img 
                        src={crypto.image} 
                        alt={crypto.name} 
                        className="w-8 h-8 mr-3" 
                      />
                      <div>
                        <p className="font-medium">{crypto.name}</p>
                        <p className="text-gray-500 text-sm">{crypto.symbol.toUpperCase()}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 font-medium">
                    ${crypto.current_price.toLocaleString()}
                  </td>
                  <td className={`p-4 ${crypto.price_change_percentage_24h >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {crypto.price_change_percentage_24h >= 0 ? '↑' : '↓'} 
                    {Math.abs(crypto.price_change_percentage_24h).toFixed(2)}%
                  </td>
                  <td className="p-4">
                    ${crypto.market_cap.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <footer className="mt-10 text-center text-gray-500 text-sm">
        <p>Data updates automatically every 60 seconds</p>
        <p className="mt-1">Last updated: {new Date().toLocaleTimeString()}</p>
      </footer>
    </div>
  );
}
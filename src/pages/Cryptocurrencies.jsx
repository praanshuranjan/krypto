import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function SimpleCryptoDashboard() {
  const navigate = useNavigate();
  const [cryptos, setCryptos] = useState([]);
  const [filteredCryptos, setFilteredCryptos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

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
      setCurrentPage(1); // Reset to first page on search
    } else {
      setFilteredCryptos(cryptos);
      setCurrentPage(1); // Reset to first page on clear
    }
  }, [searchTerm, cryptos]);

  const handleBackClick = () => {
    navigate("/");
  };

  const handleCryptoClick = (cryptoId) => {
    navigate(`/crypto/${cryptoId}`);
  };

  // Pagination logic
  const totalPages = Math.ceil(filteredCryptos.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const endIdx = startIdx + itemsPerPage;
  const paginatedCryptos = filteredCryptos.slice(startIdx, endIdx);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
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
          className="mt-4 bg-emerald-600 text-white px-6 py-3 rounded-xl hover:bg-emerald-500 font-medium shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 transform hover:scale-105"
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
        <h1 className="text-3xl font-bold text-white mb-2">Crypto Dashboard</h1>
        <p className="text-slate-300">Real-time cryptocurrency market data</p>
        </div>
        <button 
        onClick={handleBackClick}
        className="mb-4 m-5 flex items-center text-emerald-400 hover:text-emerald-300 transition-all duration-300 px-4 py-2 rounded-xl hover:bg-emerald-400/10"
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
            className="w-full p-3 pl-10 border border-slate-600 bg-slate-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 placeholder-slate-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <svg 
            className="absolute left-3 top-3 w-5 h-5 text-slate-400"
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
          <p className="text-slate-400 text-lg">No cryptocurrencies found matching your search.</p>
        </div>
      ) : (
        <>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-slate-800 text-left">
                <th className="p-4 text-slate-300">#</th>
                <th className="p-4 text-slate-300">Coin</th>
                <th className="p-4 text-slate-300">Price</th>
                <th className="p-4 text-slate-300">24h Change</th>
                <th className="p-4 text-slate-300">Market Cap</th>
              </tr>
            </thead>
            <tbody>
              {paginatedCryptos.map((crypto) => (
                <tr 
                  key={crypto.id} 
                  className="border-b border-slate-700 cursor-pointer"
                  onClick={() => handleCryptoClick(crypto.id)}
                >
                  <td className="p-4 text-white">{crypto.market_cap_rank}</td>
                  <td className="p-4">
                    <div className="flex items-center">
                      <img 
                        src={crypto.image} 
                        alt={crypto.name} 
                        className="w-8 h-8 mr-3" 
                      />
                      <div>
                        <p className="font-medium text-lg text-white">{crypto.name}</p>
                        <p className="text-slate-400 text-sm">{crypto.symbol.toUpperCase()}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 font-medium text-white">
                    ${crypto.current_price.toLocaleString()}
                  </td>
                  <td className={`p-4 ${crypto.price_change_percentage_24h >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                    {crypto.price_change_percentage_24h >= 0 ? '↑' : '↓'} 
                    {Math.abs(crypto.price_change_percentage_24h).toFixed(2)}%
                  </td>
                  <td className="p-4 text-white">
                    ${crypto.market_cap.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Pagination Controls */}
        <div className="flex justify-center items-center mt-8">
          <div className="flex gap-2 px-4 py-2 bg-slate-800/70 rounded-2xl shadow-lg border border-slate-700">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="flex items-center px-2 py-1 rounded-full text-slate-400 hover:bg-emerald-500/10 transition disabled:opacity-40 disabled:cursor-not-allowed"
              aria-label="Previous page"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => handlePageChange(i + 1)}
                className={`px-3 py-1 rounded-full font-semibold transition shadow-sm
                  ${currentPage === i + 1
                    ? 'bg-emerald-500 text-white shadow-emerald-400/30 shadow-lg scale-105'
                    : 'bg-slate-900 text-slate-300 hover:bg-emerald-500/20 hover:text-emerald-400'}
                `}
                style={{ minWidth: 36 }}
                aria-current={currentPage === i + 1 ? 'page' : undefined}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="flex items-center px-2 py-1 rounded-full text-slate-400 hover:bg-emerald-500/10 transition disabled:opacity-40 disabled:cursor-not-allowed"
              aria-label="Next page"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
            </button>
          </div>
        </div>
        </>
      )}

      <footer className="mt-10 text-center text-slate-400 text-sm">
        <p>Data updates automatically every 60 seconds</p>
        <p className="mt-1">Last updated: {new Date().toLocaleTimeString()}</p>
      </footer>
    </div>
  );
}
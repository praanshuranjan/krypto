import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './pages/Navbar';
import CryptocurrenciesPage from "./pages/Cryptocurrencies"
import CryptoDetail from "./pages/CryptoDetail"

function App() {
  return (
    <div className="bg-slate-900 min-h-screen">
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cryptocurrencies" element={<CryptocurrenciesPage />} />
        <Route path="/crypto/:id" element={<CryptoDetail />} />
      </Routes>
    </div>
  );
}

export default App;
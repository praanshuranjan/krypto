import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CryptocurrenciesPage from "./pages/Cryptocurrencies"

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cryptocurrencies" element={<CryptocurrenciesPage />} />
      </Routes>
    </>
  );
}

export default App;

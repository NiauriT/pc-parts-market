import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";

import Home from "./pages/Home.jsx";
import BrowseParts from "./pages/BrowseParts.jsx";
import Sell from "./pages/Sell.jsx";
import Configurator from "./pages/Configurator.jsx";
import Account from "./pages/Account.jsx";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/browse" element={<BrowseParts />} />
        <Route path="/sell" element={<Sell />} />
        <Route path="/configurator" element={<Configurator />} />
        <Route path="/account" element={<Account />} />
      </Routes>
    </>
  );
}

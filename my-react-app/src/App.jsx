import './index.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import BelowNav from './components/BelowNav.jsx';
import Hero from './components/Hero.jsx';
import LoginA from './components/LoginA.jsx';
import Verification from './components/Verification.jsx';

function LayoutWrapper() {
  const location = useLocation();
  const hideNav = location.pathname === '/login' || location.pathname === '/verification';


  return (
    <>
      {!hideNav && <Navbar />}
      {!hideNav && <BelowNav />}

      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/login" element={<LoginA />} />
        <Route path="/verification" element={<Verification />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <LayoutWrapper />
    </Router>
  );
}

export default App;



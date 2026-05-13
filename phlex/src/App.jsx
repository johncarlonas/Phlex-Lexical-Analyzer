import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Docs from './pages/Docs';
import './App.css';

function App() {
  const [code, setCode] = useState('');
  const [output, setOutput] = useState(null);
  const [error, setError] = useState(null);

  return (
    <Router>
      <div className="app-shell">
        <Navbar />
        <main className="content">
          <Routes>
            <Route path="/" element={
              <Home 
                code={code} setCode={setCode} 
                output={output} setOutput={setOutput} 
                error={error} setError={setError} 
              />
            } />
            <Route path="/docs" element={<Docs />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

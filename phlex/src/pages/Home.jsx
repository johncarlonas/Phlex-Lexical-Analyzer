import React, { useState } from 'react';
import './Home.css';

const Home = ({ code, setCode, output, setOutput, error, setError }) => {
  const [loading, setLoading] = useState(false);

  const handleKeyDown = (e) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const start = e.target.selectionStart;
      const end = e.target.selectionEnd;

      // set textarea value to: text before caret + tab + text after caret
      const newValue = code.substring(0, start) + '    ' + code.substring(end);
      setCode(newValue);

      // put caret at right position again (add one tab)
      setTimeout(() => {
        e.target.selectionStart = e.target.selectionEnd = start + 4;
      }, 0);
    }
  };

  const handleAction = async () => {
    if (output) {
      // RESET
      setCode('');
      setOutput(null);
      setError(null);
    } else {
      // ANALYZE — call Flask backend
      setLoading(true);
      setError(null);
      try {
        const res = await fetch('http://localhost:5000/analyze', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ code }),
        });

        const data = await res.json();

        if (!res.ok) {
          setError(data.error || 'Lexer failed.');
          setOutput([]);
        } else {
          setOutput(data.tokens || []);
        }
      } catch (e) {
        setError('Cannot connect to backend. Is Flask running on port 5000?');
        setOutput([]);
      } finally {
        setLoading(false);
      }
    }
  };

  const renderOutput = () => {
    if (loading) {
      return (
        <div className="loader-container">
          <div className="spinner"></div>
          <span>Processing lexical tokens...</span>
        </div>
      );
    }

    if (error) {
      return (
        <div className="error-container">
          <span className="error-icon">⚠</span>
          <span className="error-msg">{error}</span>
        </div>
      );
    }

    if (!output) {
      return (
        <div className="awaiting">
          <div className="arrow-box">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </div>
          <span>Awaiting analysis</span>
        </div>
      );
    }

    if (Array.isArray(output)) {
      return (
        <div className="tokens-list">
          {output.map((token, idx) => (
            <div key={idx} className={`token-row ${token.type.toLowerCase()}`}>
              <span className="token-line">{token.line}</span>
              <span className="token-type">{token.type}</span>
              <span className="token-value">{token.value}</span>
            </div>
          ))}
        </div>
      );
    }

    return <pre className="output-content">{output}</pre>;
  };

  return (
    <div className="home-container">
      {/* HERO SECTION */}
      <header className="hero">
        <div className="hero-badge">
          <span className="dot"></span>
          FLEX-POWERED • PYTHON 3
        </div>
        <h1 className="hero-title">
          Tokenize your Python<br />
          code <span className="highlight">instantly.</span>
        </h1>
        <p className="hero-subtitle">
          A high-performance lexical analyzer powered by Flex, tailored for Python developers. 
          Paste your code and inspect every token in real time.
        </p>
      </header>

      {/* WORKSPACE SECTION */}
      <section className="workspace-section">
        <h2 className="workspace-title">LEXICAL WORKSPACE</h2>
        
        <div className="workspace-grid">
          {/* INPUT PANEL */}
          <div className="panel input-panel">
            <div className="panel-header">
              <span>INPUT.PY</span>
              <div className="window-controls">
                <span className="dot red"></span>
                <span className="dot yellow"></span>
                <span className="dot green"></span>
              </div>
            </div>
            <textarea 
              className="code-editor"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Paste your Python code here to begin analysis..."
              spellCheck="false"
              disabled={loading || output !== null}
            />
            <div className="panel-footer workspace-footer">
              <div className="stats">
                {code.split('\n').filter(l => l.length > 0).length} lines • {code.length} chars
              </div>
              <button 
                className={`analyze-btn ${(output || error) ? 'reset-mode' : ''}`}
                onClick={handleAction}
                disabled={loading || (!code && !output && !error)}
              >
                {loading ? 'ANALYZING...' : ((output || error) ? 'ANALYZE AGAIN' : 'START LEXICAL ANALYSIS')}
              </button>
            </div>
          </div>

          {/* OUTPUT PANEL */}
          <div className="panel output-panel">
            <div className="panel-header">
              <span>TOKENS.OUT</span>
            </div>
            <div className="terminal">
              {renderOutput()}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

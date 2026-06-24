import React from 'react';

function Navbar({ activeTab, setActiveTab }) {
  return (
    <header className="app-header-nav">
      <div className="brand-container">
        <div className="brand-logo">
          <div className="brand-logo-icon">G</div>
          Ghar AI
        </div>
        <span className="brand-tagline">Next-Gen Real Estate Blueprint</span>
      </div>
      <nav className="nav-links">
        <button 
          className={`nav-tab-btn ${activeTab === 'dashboard' ? 'active' : ''}`} 
          onClick={() => setActiveTab('dashboard')}
        >
          Dashboard
        </button>
        <button 
          className={`nav-tab-btn ${activeTab === 'gharScore' ? 'active' : ''}`} 
          onClick={() => setActiveTab('gharScore')}
        >
          GharScore
        </button>
        <button 
          className={`nav-tab-btn ${activeTab === 'heatmap' ? 'active' : ''}`} 
          onClick={() => setActiveTab('heatmap')}
        >
          Infrastructure Map
        </button>
        <button 
          className={`nav-tab-btn ${activeTab === 'trueCost' ? 'active' : ''}`} 
          onClick={() => setActiveTab('trueCost')}
        >
          TrueCost Calculator
        </button>
        <button 
          className={`nav-tab-btn ${activeTab === 'familyFeed' ? 'active' : ''}`} 
          onClick={() => setActiveTab('familyFeed')}
        >
          Family Hub
        </button>
        <button 
          className={`nav-tab-btn ${activeTab === 'matrix' ? 'active' : ''}`} 
          onClick={() => setActiveTab('matrix')}
        >
          Strategy Matrix
        </button>
      </nav>
    </header>
  );
}

export default Navbar;

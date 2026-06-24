import React, { useState, useEffect } from 'react';
import './App.css';

// SVG Icons as React components for self-containment and premium design
const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
);

const ShieldCheckIcon = ({ size = 20, color = "currentColor" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><path d="m9 12 2 2 4-4"></path></svg>
);

const AlertTriangleIcon = ({ size = 20, color = "currentColor" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
);

const UploadIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
);

const MapIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"></polygon><line x1="9" y1="3" x2="9" y2="18"></line><line x1="15" y1="6" x2="15" y2="21"></line></svg>
);

const CalculatorIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect><line x1="9" y1="22" x2="9" y2="16"></line><line x1="8" y1="6" x2="16" y2="6"></line><line x1="16" y1="14" x2="16" y2="22"></line><line x1="16" y1="10" x2="8" y2="10"></line></svg>
);

const UsersIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
);

const LayoutIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>
);

const SparklesIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"></path></svg>
);

const PRESETS = [
  {
    name: "Cybercity Marina Skies (Kondapur, TG)",
    url: "https://www.magicbricks.com/propertyDetails/3-BHK-Apartment-for-Sale-in-Cybercity-Marina-Skies-Kondapur-Hyderabad-r54321",
    type: "high",
    score: 92,
    metrics: {
      rera: { status: "Verified (TG-RERA)", desc: "TG-RERA Reg: P02400000035 (Active project in Hyderabad)", val: "PASS", isPass: true },
      landDeed: { status: "Clear (Dharani Portal Match)", desc: "Sy No: 120/A matching partition deed registered on Dharani portal.", val: "PASS", isPass: true },
      tax: { status: "GHMC Tax Compliant", desc: "PTIN: 1092038472. All property taxes paid to GHMC up to FY 2025-26.", val: "PASS", isPass: true },
      occupancy: { status: "OC Issued by GHMC", desc: "Full Occupancy Certificate issued. Zero deviation warnings.", val: "PASS", isPass: true }
    }
  },
  {
    name: "Aurobindo Galaxy Heights (Gachibowli, TG)",
    url: "https://www.99acres.com/3-bhk-in-aurobindo-galaxy-heights-gachibowli-hyderabad-spid-H76543",
    type: "marginal",
    score: 74,
    metrics: {
      rera: { status: "Verified (TG-RERA)", desc: "TG-RERA Reg: P02400001082 (Active registration)", val: "PASS", isPass: true },
      landDeed: { status: "Dharani Registry Discrepancy", desc: "Dharani portal shows minor discrepancy in co-owner registration spelling.", val: "ADVISORY", isPass: null },
      tax: { status: "GHMC Dues Pending (₹28,500)", desc: "Unpaid property taxes for current assessment year.", val: "WARNING", isPass: false },
      occupancy: { status: "Partial OC (Tower A only)", desc: "GHMC has issued occupancy certificate for Tower A; Tower B is pending validation.", val: "ADVISORY", isPass: null }
    }
  },
  {
    name: "Mayfair Green Vista (Miyapur, TG)",
    url: "https://www.nobroker.in/property/buy/2-bhk-apartment-in-miyapur-hyderabad-8a908123-r987",
    type: "flagged",
    score: 41,
    metrics: {
      rera: { status: "TG-RERA Status Expired", desc: "RERA Registration P02400000542 was not renewed by developer for Phase 2.", val: "FAIL", isPass: false },
      landDeed: { status: "Dharani Portal Land Dispute", desc: "Dharani registry reports active boundary dispute partition claims on Sy No: 85.", val: "FAIL", isPass: false },
      tax: { status: "GHMC Severe Dues Pending", desc: "No property tax assessed or paid under developer registration since 2023.", val: "FAIL", isPass: false },
      occupancy: { status: "No OC / Deviation Warning", desc: "GHMC issued a structural deviation warning notice for top floor layout.", val: "FAIL", isPass: false }
    }
  }
];

// District data for Heatmap Demo
const DISTRICT_DATA = {
  whitefield: {
    name: "Whitefield Tech Hub",
    waterTanker: "85%",
    floodRisk: "Low Risk",
    commuteTime: "65 mins",
    waterColor: "#ef4444", // red
    floodColor: "#10b981", // green
    commuteColor: "#f59e0b", // orange
    recommendation: "Extremely high water tanker dependency. Consider setting up secondary rain-water storage system. Commute is heavy during peak hours to Outer Ring Road."
  },
  sarjapur: {
    name: "Sarjapur Road Corridor",
    waterTanker: "92%",
    floodRisk: "Moderate (Monsoon clogging)",
    commuteTime: "50 mins",
    waterColor: "#ef4444",
    floodColor: "#f59e0b",
    commuteColor: "#f59e0b",
    recommendation: "92% tanker reliant, critical ground water depletion zone. Minor monsoon clogging around railway crossing. Rapid growth area with multi-fold connectivity lines underway."
  },
  outerRing: {
    name: "Outer Ring Road (Bellandur)",
    waterTanker: "60%",
    floodRisk: "High Risk (Severe Monsoon Flooding)",
    commuteTime: "85 mins",
    waterColor: "#f59e0b",
    floodColor: "#ef4444",
    commuteColor: "#ef4444",
    recommendation: "Extreme peak hour commute delays (averaging 85 mins to tech parks). High vulnerability to heavy rains and drainage back-up near lake beds."
  },
  indiranagar: {
    name: "Indiranagar (Mature Core)",
    waterTanker: "12%",
    floodRisk: "Very Low",
    commuteTime: "25 mins",
    waterColor: "#10b981",
    floodColor: "#10b981",
    commuteColor: "#10b981",
    recommendation: "Excellent municipal water network supply. Highly stable infrastructure with almost zero monsoon flooding. Peak accessibility to primary technology corridors is fast."
  },
  electronicCity: {
    name: "Electronic City Phase I & II",
    waterTanker: "45%",
    floodRisk: "Low Risk",
    commuteTime: "40 mins",
    waterColor: "#f59e0b",
    floodColor: "#10b981",
    commuteColor: "#10b981",
    recommendation: "Moderate water dependency with stable supply. Elevated expressway provides solid commute options to South Bangalore tech hubs."
  }
};

const scanSteps = [
  "Parsing Listing URL structure...",
  "Extracting metadata (Developer ID, RERA Registration)...",
  "Pinging State RERA Open Registry APIs...",
  "Querying Municipal Property Tax Database...",
  "Cross-referencing Land Deed Registries (Khata/Patta record)...",
  "Compiling Confidence Index Score..."
];

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [urlInput, setUrlInput] = useState('');
  const [scanState, setScanState] = useState('idle'); // idle, scanning, done
  const [currentStep, setCurrentStep] = useState(0);
  const [activePreset, setActivePreset] = useState(PRESETS[0]);
  
  // Heatmap State
  const [heatmapView, setHeatmapView] = useState('water'); // water, flood, commute
  const [hoveredDistrict, setHoveredDistrict] = useState('whitefield');
  const [selectedDistrict, setSelectedDistrict] = useState('whitefield');

  // TrueCost State
  const [baseCost, setBaseCost] = useState(8500000); // 85 Lakhs
  const [constructionStatus, setConstructionStatus] = useState('under-construction');
  const [calcState, setCalcState] = useState('karnataka');
  const [maintenanceCorpus, setMaintenanceCorpus] = useState(250000);

  // Collaborative Feed State
  const [chatLog, setChatLog] = useState([
    { id: 1, sender: "Dad (Auditor)", text: "GharScore of 94 for Prestige Lakeside is excellent. RERA register karera api links match cleanly.", self: false },
    { id: 2, sender: "Mom", text: "I liked the open spaces there, but the commute to ORR during rain is painful.", self: false },
    { id: 3, sender: "You", text: "Let's check the TrueCost calculator. Incumbent portals show ₹85L, but statutory fees add a lot.", self: true }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [likedProperties, setLikedProperties] = useState({
    lakeside: { upVotes: 2, downVotes: 0, userVoted: 'up' },
    valley: { upVotes: 1, downVotes: 1, userVoted: null },
    vista: { upVotes: 0, downVotes: 3, userVoted: 'down' }
  });



  // Run the animated scan
  const triggerScan = (preset) => {
    setUrlInput(preset.url);
    setActivePreset(preset);
    setScanState('scanning');
    setCurrentStep(0);
  };

  useEffect(() => {
    if (scanState === 'scanning') {
      const interval = setInterval(() => {
        setCurrentStep((prev) => {
          if (prev < scanSteps.length - 1) {
            return prev + 1;
          } else {
            clearInterval(interval);
            setScanState('done');
            return prev;
          }
        });
      }, 700);
      return () => clearInterval(interval);
    }
  }, [scanState]);

  // TrueCost Calculations
  const calculateCosts = () => {
    const cost = Number(baseCost);
    const gstRate = constructionStatus === 'under-construction' ? 0.05 : 0;
    const gst = cost * gstRate;

    let stampDutyRate = 0.056;
    let registrationRate = 0.01;
    let flatRegistration = false;

    if (calcState === 'maharashtra') {
      stampDutyRate = 0.06;
      registrationRate = 0.01; // typically capped or flat, lets approximate
      flatRegistration = true;
    }

    const stampDuty = cost * stampDutyRate;
    const registrationFee = flatRegistration ? 30000 : cost * registrationRate;
    const corpus = Number(maintenanceCorpus);

    const total = cost + gst + stampDuty + registrationFee + corpus;

    return {
      base: cost,
      gst,
      stampDuty,
      registrationFee,
      corpus,
      total
    };
  };

  const costs = calculateCosts();

  const handleSendChat = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    setChatLog([...chatLog, {
      id: Date.now(),
      sender: "You",
      text: chatInput,
      self: true
    }]);
    setChatInput('');
  };

  const handleVote = (property, direction) => {
    setLikedProperties(prev => {
      const current = prev[property];
      let upDiff = 0;
      let downDiff = 0;
      let newVote = direction;

      if (current.userVoted === direction) {
        // Toggle off
        newVote = null;
        if (direction === 'up') upDiff = -1;
        if (direction === 'down') downDiff = -1;
      } else {
        // Swap or vote new
        if (current.userVoted === 'up') upDiff = -1;
        if (current.userVoted === 'down') downDiff = -1;

        if (direction === 'up') upDiff = 1;
        if (direction === 'down') downDiff = 1;
      }

      return {
        ...prev,
        [property]: {
          upVotes: current.upVotes + upDiff,
          downVotes: current.downVotes + downDiff,
          userVoted: newVote
        }
      };
    });
  };

  // Helper formatting for currency
  const formatINR = (num) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(num);
  };

  // Helper to color districts according to active heatmap metric
  const getDistrictColor = (districtKey) => {
    const district = DISTRICT_DATA[districtKey];
    if (heatmapView === 'water') return district.waterColor;
    if (heatmapView === 'flood') return district.floodColor;
    return district.commuteColor;
  };

  return (
    <div className="app-container">
      {/* Brand Navigation */}
      <header className="app-header-nav">
        <div className="brand-container">
          <div className="brand-logo">
            <div className="brand-logo-icon">G</div>
            Ghar AI
          </div>
          <span className="brand-tagline">Next-Gen Real Estate Blueprint</span>
        </div>
        <nav className="nav-links">
          <button className={`nav-tab-btn ${activeTab === 'dashboard' ? 'active' : ''}`} onClick={() => setActiveTab('dashboard')}>
            Dashboard
          </button>
          <button className={`nav-tab-btn ${activeTab === 'gharScore' ? 'active' : ''}`} onClick={() => setActiveTab('gharScore')}>
            GharScore
          </button>
          <button className={`nav-tab-btn ${activeTab === 'heatmap' ? 'active' : ''}`} onClick={() => setActiveTab('heatmap')}>
            Infrastructure Map
          </button>
          <button className={`nav-tab-btn ${activeTab === 'trueCost' ? 'active' : ''}`} onClick={() => setActiveTab('trueCost')}>
            TrueCost Calculator
          </button>
          <button className={`nav-tab-btn ${activeTab === 'familyFeed' ? 'active' : ''}`} onClick={() => setActiveTab('familyFeed')}>
            Family Hub
          </button>
          <button className={`nav-tab-btn ${activeTab === 'matrix' ? 'active' : ''}`} onClick={() => setActiveTab('matrix')}>
            Strategy Matrix
          </button>
        </nav>
      </header>

      {/* Hero Header Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Shifting the Trust Dynamic <span>Natively</span></h1>
          <p className="hero-desc">
            Incumbent platforms operate as unverified advertising bulletin boards. 
            Ghar AI validates legal structures, uncovers hidden infrastructure costs, and powers group collaboration.
          </p>
          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-val">100%</span>
              <span className="stat-lbl">RERA Checked</span>
            </div>
            <div className="stat-item">
              <span className="stat-val">5 States</span>
              <span className="stat-lbl">Government API Integrations</span>
            </div>
            <div className="stat-item">
              <span className="stat-val">₹0</span>
              <span className="stat-lbl">Hidden Charges</span>
            </div>
          </div>
        </div>
        <div className="hero-image-container">
          <div className="hero-image-wrapper">
            <img src={process.env.PUBLIC_URL + '/hero_image.jpg'} alt="Premium Abstract Web Banner" className="hero-img" />
          </div>
        </div>
      </section>

      {/* MAIN CONTAINER TABS */}
      <div className="dashboard-grid">
        
        {/* Tab 1: Dashboard Home Overview */}
        {activeTab === 'dashboard' && (
          <>
            {/* Quick GharScore check hook */}
            <div className="glass-panel">
              <div className="panel-header">
                <h3 className="panel-title"><SparklesIcon /> Viral Hook: Check Listing Structural Integrity</h3>
              </div>
              <div className="panel-content">
                <p style={{ color: 'var(--text-secondary)', marginBottom: '16px', fontSize: '0.9rem' }}>
                  Copy any property URL from competitors (MagicBricks, 99acres) and check its GharScore reliability metric instantly.
                </p>
                <div className="url-input-group">
                  <input 
                    type="text" 
                    placeholder="Paste listing URL here..." 
                    className="glass-input url-input"
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                  />
                  <button className="glow-btn" style={{ display: 'flex', alignItems: 'center', gap: '8px' }} onClick={() => triggerScan(PRESETS[0])}>
                    <SearchIcon /> Analyze
                  </button>
                </div>
                
                <div className="preset-links-container" style={{ marginTop: '20px' }}>
                  <span className="preset-title">Or try live demos:</span>
                  <div className="presets-list">
                    {PRESETS.map((p, idx) => (
                      <button key={idx} className="preset-btn" onClick={() => triggerScan(p)}>
                        {p.name} (Score: {p.score})
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Map & Infrastructure Hook */}
            <div className="glass-panel">
              <div className="panel-header">
                <h3 className="panel-title"><MapIcon /> Infrastructure Overlays</h3>
                <span className="brand-tagline">Bengaluru IT Belt</span>
              </div>
              <div className="panel-content">
                <div className="heatmap-controls" style={{ marginBottom: '15px' }}>
                  <button className={`control-btn ${heatmapView === 'water' ? 'active' : ''}`} onClick={() => setHeatmapView('water')}>Water Tanker Dependency</button>
                  <button className={`control-btn ${heatmapView === 'flood' ? 'active' : ''}`} onClick={() => setHeatmapView('flood')}>Monsoon Floods</button>
                </div>
                <div style={{ background: '#090e1a', borderRadius: '10px', padding: '16px', border: '1px solid var(--border-color)', display: 'flex', gap: '15px', alignItems: 'center' }}>
                  <div style={{ flex: 1 }}>
                    <h4 style={{ color: '#fff', fontSize: '1rem', marginBottom: '5px' }}>{DISTRICT_DATA[selectedDistrict].name}</h4>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
                      {DISTRICT_DATA[selectedDistrict].recommendation}
                    </p>
                  </div>
                  <button className="glow-btn" style={{ padding: '8px 14px', fontSize: '0.8rem' }} onClick={() => setActiveTab('heatmap')}>Open Full Map</button>
                </div>
              </div>
            </div>

            {/* TrueCost preview */}
            <div className="glass-panel">
              <div className="panel-header">
                <h3 className="panel-title"><CalculatorIcon /> Zillow BuyAbility Adaptation: TrueCost</h3>
              </div>
              <div className="panel-content">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <div>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Base Token Price</span>
                    <h3 style={{ fontSize: '1.8rem', color: '#fff' }}>{formatINR(baseCost)}</h3>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Estimated TrueCost</span>
                    <h3 style={{ fontSize: '1.8rem', color: 'var(--accent-purple)' }}>{formatINR(costs.total)}</h3>
                  </div>
                </div>
                <button className="glow-btn" style={{ width: '100%' }} onClick={() => setActiveTab('trueCost')}>Unbundle Pricing Breakdown</button>
              </div>
            </div>

            {/* Family circle preview */}
            <div className="glass-panel">
              <div className="panel-header">
                <h3 className="panel-title"><UsersIcon /> Collaborative Hub</h3>
              </div>
              <div className="panel-content">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div className="property-deck-card">
                    <div className="deck-header">
                      <div className="deck-prop-info">
                        <h4>Prestige Lakeside 3BHK</h4>
                        <p>Whitefield, Bangalore</p>
                      </div>
                      <span className="deck-compliance-tag badge-green">GharScore: 94</span>
                    </div>
                    <div className="stakeholder-votes" style={{ margin: 0, border: 'none' }}>
                      <div className="vote-chip up"><div className="vote-avatar">D</div> Dad Approved</div>
                      <div className="vote-chip up"><div className="vote-avatar">M</div> Mom Liked</div>
                    </div>
                  </div>
                </div>
                <button className="glow-btn" style={{ width: '100%', marginTop: '16px' }} onClick={() => setActiveTab('familyFeed')}>Open Family Workspace</button>
              </div>
            </div>
          </>
        )}

        {/* Tab 2: GharScore Triage Engine */}
        {activeTab === 'gharScore' && (
          <div className="glass-panel full-width-card">
            <div className="panel-header">
              <h3 className="panel-title"><ShieldCheckIcon size={24} color="var(--accent-purple)" /> GharScore Legal Verification System</h3>
              <span className="brand-tagline">RERA & Title Deed Matching</span>
            </div>
            <div className="panel-content">
              <div className="calculator-layout">
                {/* Inputs Pane */}
                <div className="calc-inputs-pane">
                  <div className="form-group">
                    <label>Competitor Listing URL</label>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <input 
                        type="text" 
                        placeholder="Paste MagicBricks, 99acres or NoBroker URL..." 
                        className="glass-input"
                        style={{ flexGrow: 1 }}
                        value={urlInput}
                        onChange={(e) => setUrlInput(e.target.value)}
                      />
                      <button className="glow-btn" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 16px' }} onClick={() => triggerScan({ url: urlInput, ...PRESETS[0], name: "Custom Property Search", score: 85 })}>
                        <SearchIcon /> Scan
                      </button>
                    </div>
                  </div>
                  
                  <div className="presets-list" style={{ marginTop: '5px' }}>
                    {PRESETS.map((p, idx) => (
                      <button key={idx} className="preset-btn" onClick={() => triggerScan(p)}>
                        Use Demo: {p.name}
                      </button>
                    ))}
                  </div>

                  <div style={{ margin: '15px 0', textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>— OR —</div>

                  <div className="form-group">
                    <label>Upload Compliance Documents</label>
                    <div className="upload-zone" onClick={() => triggerScan(PRESETS[0])}>
                      <span className="upload-icon"><UploadIcon /></span>
                      <p className="upload-text">Drag & drop tax receipts, patta/khata deed or RERA certificate</p>
                      <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', marginTop: '5px' }}>Supported formats: PDF, JPG, PNG (Auto-extracted by Vision LLM)</p>
                    </div>
                  </div>
                </div>

                {/* Outputs Panel */}
                <div className="calc-results-pane" style={{ background: 'rgba(15, 23, 42, 0.4)' }}>
                  {scanState === 'idle' && (
                    <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--text-secondary)' }}>
                      <ShieldCheckIcon size={48} color="rgba(255,255,255,0.15)" />
                      <p style={{ marginTop: '15px', fontSize: '0.95rem' }}>Provide a property URL or drag a document sheet to compile automated legal integrity diagnostics.</p>
                    </div>
                  )}

                  {scanState === 'scanning' && (
                    <div className="scanning-card">
                      <div className="scan-radar"></div>
                      <h4 style={{ color: '#fff' }}>Executing Compliances Scans...</h4>
                      <p className="scan-step">{scanSteps[currentStep]}</p>
                      <div style={{ width: '100%', background: 'rgba(255,255,255,0.05)', height: '4px', borderRadius: '2px', marginTop: '20px', overflow: 'hidden' }}>
                        <div style={{ height: '100%', background: 'var(--accent-purple)', width: `${((currentStep + 1) / scanSteps.length) * 100}%`, transition: 'width 0.4s ease' }}></div>
                      </div>
                    </div>
                  )}

                  {scanState === 'done' && (
                    <div className="score-result-layout">
                      {/* Circle score progress */}
                      <div className="circle-score-wrapper">
                        <div className="circle-svg-container">
                          <svg width="140" height="140">
                            <circle className="circle-bg" cx="70" cy="70" r="60" />
                            <circle 
                              className="circle-progress" 
                              cx="70" 
                              cy="70" 
                              r="60" 
                              stroke={activePreset.type === 'high' ? 'var(--accent-green)' : activePreset.type === 'marginal' ? 'var(--accent-orange)' : 'var(--accent-red)'}
                              strokeDasharray={376.99}
                              strokeDashoffset={376.99 - (376.99 * activePreset.score) / 100}
                            />
                          </svg>
                          <div className="score-text-overlay">
                            <span className="score-num">{activePreset.score}</span>
                            <span className="score-lbl">GharScore</span>
                          </div>
                        </div>

                        <span className={`status-badge ${activePreset.type === 'high' ? 'badge-green' : activePreset.type === 'marginal' ? 'badge-orange' : 'badge-red'}`}>
                          {activePreset.type === 'high' ? 'HIGH CONFIDENCE' : activePreset.type === 'marginal' ? 'MARGINAL RISK' : 'FLAGGED HIGH RISK'}
                        </span>
                      </div>

                      {/* Diagnostic details */}
                      <div className="compliance-details-list">
                        <h4 style={{ color: '#fff', fontSize: '0.95rem', marginBottom: '5px' }}>Compliance Vectors:</h4>
                        
                        {Object.keys(activePreset.metrics).map((key) => {
                          const m = activePreset.metrics[key];
                          const name = key === 'rera' ? 'RERA Registration' : key === 'landDeed' ? 'Title Deed Integrity' : key === 'tax' ? 'Statutory Taxes' : 'Occupancy Status (OC)';
                          const isGreen = m.val === 'PASS';
                          const isRed = m.val === 'FAIL';
                          return (
                            <div key={key} className="compliance-metric-card" style={{ borderColor: isGreen ? 'rgba(16,185,129,0.1)' : isRed ? 'rgba(239,68,68,0.1)' : 'rgba(245,158,11,0.1)' }}>
                              <div className="metric-meta">
                                <span className="metric-title" style={{ display: 'flex', alignItems: 'center', gap: '6px', color: isGreen ? 'var(--accent-green)' : isRed ? 'var(--accent-red)' : 'var(--accent-orange)' }}>
                                  {!isGreen && <AlertTriangleIcon size={16} color={isRed ? 'var(--accent-red)' : 'var(--accent-orange)'} />}
                                  {name}
                                </span>
                                <span className="metric-desc">{m.desc}</span>
                              </div>
                              <span className="metric-status" style={{ color: isGreen ? 'var(--accent-green)' : isRed ? 'var(--accent-red)' : 'var(--accent-orange)' }}>
                                {m.status}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Infrastructure Map */}
        {activeTab === 'heatmap' && (
          <div className="glass-panel full-width-card">
            <div className="panel-header">
              <h3 className="panel-title"><MapIcon /> Locality & Infrastructure Heatmaps</h3>
              <div className="heatmap-controls">
                <button className={`control-btn ${heatmapView === 'water' ? 'active' : ''}`} onClick={() => setHeatmapView('water')}>Water Tanker Reliance</button>
                <button className={`control-btn ${heatmapView === 'flood' ? 'active' : ''}`} onClick={() => setHeatmapView('flood')}>Monsoon Clogging</button>
                <button className={`control-btn ${heatmapView === 'commute' ? 'active' : ''}`} onClick={() => setHeatmapView('commute')}>Commute to ORR Tech Hub</button>
              </div>
            </div>
            <div className="panel-content">
              <div className="map-layout">
                {/* SVG MAP */}
                <div className="map-viewport">
                  <svg viewBox="0 0 500 400" className="svg-map-canvas">
                    {/* District elements with interactive states */}
                    <g>
                      {/* Indiranagar */}
                      <path 
                        d="M 120, 100 L 220, 80 L 250, 150 L 160, 180 Z" 
                        fill={getDistrictColor('indiranagar')} 
                        fillOpacity="0.4"
                        stroke={selectedDistrict === 'indiranagar' ? '#fff' : 'rgba(255,255,255,0.2)'}
                        strokeWidth={selectedDistrict === 'indiranagar' ? '2.5' : '1'}
                        className="map-district"
                        onMouseEnter={() => setHoveredDistrict('indiranagar')}
                        onClick={() => setSelectedDistrict('indiranagar')}
                      />
                      <text x="160" y="130" fill="#fff" fontSize="10" fontWeight="600" pointerEvents="none">Indiranagar</text>

                      {/* Whitefield */}
                      <path 
                        d="M 280, 50 L 450, 70 L 420, 200 L 290, 160 Z" 
                        fill={getDistrictColor('whitefield')} 
                        fillOpacity="0.4"
                        stroke={selectedDistrict === 'whitefield' ? '#fff' : 'rgba(255,255,255,0.2)'}
                        strokeWidth={selectedDistrict === 'whitefield' ? '2.5' : '1'}
                        className="map-district"
                        onMouseEnter={() => setHoveredDistrict('whitefield')}
                        onClick={() => setSelectedDistrict('whitefield')}
                      />
                      <text x="340" y="110" fill="#fff" fontSize="10" fontWeight="600" pointerEvents="none">Whitefield</text>

                      {/* Outer Ring Road (ORR) */}
                      <path 
                        d="M 220, 180 L 290, 160 L 330, 260 L 230, 280 Z" 
                        fill={getDistrictColor('outerRing')} 
                        fillOpacity="0.4"
                        stroke={selectedDistrict === 'outerRing' ? '#fff' : 'rgba(255,255,255,0.2)'}
                        strokeWidth={selectedDistrict === 'outerRing' ? '2.5' : '1'}
                        className="map-district"
                        onMouseEnter={() => setHoveredDistrict('outerRing')}
                        onClick={() => setSelectedDistrict('outerRing')}
                      />
                      <text x="245" y="225" fill="#fff" fontSize="9" fontWeight="600" pointerEvents="none">ORR Bellandur</text>

                      {/* Sarjapur */}
                      <path 
                        d="M 330, 260 L 420, 200 L 460, 320 L 340, 350 Z" 
                        fill={getDistrictColor('sarjapur')} 
                        fillOpacity="0.4"
                        stroke={selectedDistrict === 'sarjapur' ? '#fff' : 'rgba(255,255,255,0.2)'}
                        strokeWidth={selectedDistrict === 'sarjapur' ? '2.5' : '1'}
                        className="map-district"
                        onMouseEnter={() => setHoveredDistrict('sarjapur')}
                        onClick={() => setSelectedDistrict('sarjapur')}
                      />
                      <text x="370" y="280" fill="#fff" fontSize="10" fontWeight="600" pointerEvents="none">Sarjapur Road</text>

                      {/* Electronic City */}
                      <path 
                        d="M 180, 290 L 300, 275 L 320, 360 L 200, 380 Z" 
                        fill={getDistrictColor('electronicCity')} 
                        fillOpacity="0.4"
                        stroke={selectedDistrict === 'electronicCity' ? '#fff' : 'rgba(255,255,255,0.2)'}
                        strokeWidth={selectedDistrict === 'electronicCity' ? '2.5' : '1'}
                        className="map-district"
                        onMouseEnter={() => setHoveredDistrict('electronicCity')}
                        onClick={() => setSelectedDistrict('electronicCity')}
                      />
                      <text x="210" y="335" fill="#fff" fontSize="10" fontWeight="600" pointerEvents="none">Electronic City</text>
                    </g>
                  </svg>
                </div>

                {/* Map Info Panel */}
                <div className="map-legend">
                  <div className="district-tooltip-card">
                    <h4 className="tooltip-title">{DISTRICT_DATA[hoveredDistrict].name}</h4>
                    <div className="tooltip-row">
                      <span>Water Tanker Dependency:</span>
                      <span style={{ color: DISTRICT_DATA[hoveredDistrict].waterColor }}>{DISTRICT_DATA[hoveredDistrict].waterTanker}</span>
                    </div>
                    <div className="tooltip-row">
                      <span>Monsoon Flood Risk:</span>
                      <span style={{ color: DISTRICT_DATA[hoveredDistrict].floodColor }}>{DISTRICT_DATA[hoveredDistrict].floodRisk}</span>
                    </div>
                    <div className="tooltip-row">
                      <span>Peak Commute Time:</span>
                      <span style={{ color: DISTRICT_DATA[hoveredDistrict].commuteColor }}>{DISTRICT_DATA[hoveredDistrict].commuteTime}</span>
                    </div>
                    <p style={{ marginTop: '12px', fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: '1.4', background: 'rgba(255,255,255,0.03)', padding: '10px', borderRadius: '6px' }}>
                      <strong>AI Tip:</strong> {DISTRICT_DATA[hoveredDistrict].recommendation}
                    </p>
                  </div>

                  <div className="legend-card">
                    <span className="legend-title">Metric Severity Guide:</span>
                    <div className="legend-bar" style={{ background: 'linear-gradient(90deg, var(--accent-green), var(--accent-orange), var(--accent-red))' }}></div>
                    <div className="legend-labels">
                      <span>Excellent (Green)</span>
                      <span>Mod (Orange)</span>
                      <span>Severe (Red)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: TrueCost Pricing Calculator */}
        {activeTab === 'trueCost' && (
          <div className="glass-panel full-width-card">
            <div className="panel-header">
              <h3 className="panel-title"><CalculatorIcon /> TrueCost pricing transparency unbundling</h3>
              <span className="brand-tagline">Zillow BuyAbility Adaptation</span>
            </div>
            <div className="panel-content">
              <div className="calculator-layout">
                {/* Inputs pane */}
                <div className="calc-inputs-pane">
                  <div className="form-group">
                    <label>Base Token Listing Price (INR)</label>
                    <input 
                      type="number" 
                      className="glass-input" 
                      value={baseCost}
                      onChange={(e) => setBaseCost(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label>Construction Phase / Readiness</label>
                    <select className="glass-input" value={constructionStatus} onChange={(e) => setConstructionStatus(e.target.value)}>
                      <option value="under-construction">Under Construction (5% GST Appliable)</option>
                      <option value="ready-to-move">Ready to Move (0% GST - Exchanged OC)</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Property State Registry Location</label>
                    <select className="glass-input" value={calcState} onChange={(e) => setCalcState(e.target.value)}>
                      <option value="karnataka">Karnataka (5.6% Stamp Duty, 1% Registration)</option>
                      <option value="maharashtra">Maharashtra (6.0% Stamp Duty, ₹30,000 Flat Reg Fee)</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Developer Corpus / Maintenance Fund (₹)</label>
                    <input 
                      type="number" 
                      className="glass-input" 
                      value={maintenanceCorpus}
                      onChange={(e) => setMaintenanceCorpus(e.target.value)}
                    />
                  </div>
                </div>

                {/* Costs Result pane */}
                <div className="calc-results-pane">
                  <div className="big-cost-header">
                    <span className="cost-num-sub">TOTAL TRUECOST LIABILITY:</span>
                    <div className="cost-num-big">{formatINR(costs.total)}</div>
                    <span style={{ fontSize: '0.8rem', color: 'var(--accent-red)', fontWeight: '500' }}>
                      (+{(((costs.total - costs.base) / costs.base) * 100).toFixed(1)}% over base price)
                    </span>
                  </div>

                  <div className="cost-bars-stack">
                    {/* Base Cost Bar */}
                    <div className="cost-bar-item">
                      <div className="cost-bar-label-row">
                        <span>Base Listing Price</span>
                        <span>{formatINR(costs.base)}</span>
                      </div>
                      <div className="cost-bar-outer">
                        <div className="cost-bar-inner" style={{ width: `${(costs.base / costs.total) * 100}%`, background: 'var(--accent-blue)' }}></div>
                      </div>
                    </div>

                    {/* GST Bar */}
                    <div className="cost-bar-item">
                      <div className="cost-bar-label-row">
                        <span>GST Liability</span>
                        <span>{formatINR(costs.gst)}</span>
                      </div>
                      <div className="cost-bar-outer">
                        <div className="cost-bar-inner" style={{ width: `${(costs.gst / costs.total) * 100}%`, background: 'var(--accent-purple)' }}></div>
                      </div>
                    </div>

                    {/* Stamp Duty Bar */}
                    <div className="cost-bar-item">
                      <div className="cost-bar-label-row">
                        <span>Stamp Duty Fees</span>
                        <span>{formatINR(costs.stampDuty)}</span>
                      </div>
                      <div className="cost-bar-outer">
                        <div className="cost-bar-inner" style={{ width: `${(costs.stampDuty / costs.total) * 100}%`, background: 'var(--accent-orange)' }}></div>
                      </div>
                    </div>

                    {/* Registration fees */}
                    <div className="cost-bar-item">
                      <div className="cost-bar-label-row">
                        <span>Statutory Registration Charges</span>
                        <span>{formatINR(costs.registrationFee)}</span>
                      </div>
                      <div className="cost-bar-outer">
                        <div className="cost-bar-inner" style={{ width: `${(costs.registrationFee / costs.total) * 100}%`, background: 'var(--accent-green)' }}></div>
                      </div>
                    </div>

                    {/* Corpus */}
                    <div className="cost-bar-item">
                      <div className="cost-bar-label-row">
                        <span>Maintenance Corpus Demands</span>
                        <span>{formatINR(costs.corpus)}</span>
                      </div>
                      <div className="cost-bar-outer">
                        <div className="cost-bar-inner" style={{ width: `${(costs.corpus / costs.total) * 100}%`, background: 'var(--text-secondary)' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 5: Family Feed */}
        {activeTab === 'familyFeed' && (
          <div className="glass-panel full-width-card">
            <div className="panel-header">
              <h3 className="panel-title"><UsersIcon /> Collaborative Family Workspace</h3>
              <span className="brand-tagline">Multi-buyer grading matrix</span>
            </div>
            <div className="panel-content">
              <div className="family-dashboard">
                {/* List of properties being graded */}
                <div className="shared-feed-pane">
                  {/* Property 1 */}
                  <div className="property-deck-card">
                    <div className="deck-header">
                      <div className="deck-prop-info">
                        <h4>Prestige Lakeside (Whitefield)</h4>
                        <p>3 BHK Apartment • Base Price: ₹1.2 Cr</p>
                      </div>
                      <span className="deck-compliance-tag badge-green">GharScore: 94</span>
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '12px' }}>
                      <em>Notes:</em> RERA matching looks clean. Dad approved of legal registry status. Water dependency is moderate.
                    </div>
                    <div className="stakeholder-votes">
                      <button 
                        className="vote-chip up" 
                        onClick={() => handleVote('lakeside', 'up')}
                        style={{ background: likedProperties.lakeside.userVoted === 'up' ? 'rgba(16, 185, 129, 0.25)' : '' }}
                      >
                        👍 {likedProperties.lakeside.upVotes} Upvotes
                      </button>
                      <button 
                        className="vote-chip down" 
                        onClick={() => handleVote('lakeside', 'down')}
                        style={{ background: likedProperties.lakeside.userVoted === 'down' ? 'rgba(239, 68, 68, 0.25)' : '' }}
                      >
                        👎 {likedProperties.lakeside.downVotes} Downvotes
                      </button>
                    </div>
                  </div>

                  {/* Property 2 */}
                  <div className="property-deck-card">
                    <div className="deck-header">
                      <div className="deck-prop-info">
                        <h4>Golden Nest Valley (Sarjapur)</h4>
                        <p>2 BHK Builder Floor • Base Price: ₹85 L</p>
                      </div>
                      <span className="deck-compliance-tag badge-orange">GharScore: 68</span>
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '12px' }}>
                      <em>Notes:</em> Warning issued regarding outstanding tax liabilities. Co-owner registry mismatch detected.
                    </div>
                    <div className="stakeholder-votes">
                      <button 
                        className="vote-chip up" 
                        onClick={() => handleVote('valley', 'up')}
                        style={{ background: likedProperties.valley.userVoted === 'up' ? 'rgba(16, 185, 129, 0.25)' : '' }}
                      >
                        👍 {likedProperties.valley.upVotes} Upvotes
                      </button>
                      <button 
                        className="vote-chip down" 
                        onClick={() => handleVote('valley', 'down')}
                        style={{ background: likedProperties.valley.userVoted === 'down' ? 'rgba(239, 68, 68, 0.25)' : '' }}
                      >
                        👎 {likedProperties.valley.downVotes} Downvotes
                      </button>
                    </div>
                  </div>

                  {/* Property 3 */}
                  <div className="property-deck-card">
                    <div className="deck-header">
                      <div className="deck-prop-info">
                        <h4>Sobha Emerald Vista (Bellandur)</h4>
                        <p>3 BHK Apartment • Base Price: ₹1.45 Cr</p>
                      </div>
                      <span className="deck-compliance-tag badge-red">GharScore: 35</span>
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '12px' }}>
                      <em>Notes:</em> Severe structural risk! Khata deeds unregistered. Active land litigation noted.
                    </div>
                    <div className="stakeholder-votes">
                      <button 
                        className="vote-chip up" 
                        onClick={() => handleVote('vista', 'up')}
                        style={{ background: likedProperties.vista.userVoted === 'up' ? 'rgba(16, 185, 129, 0.25)' : '' }}
                      >
                        👍 {likedProperties.vista.upVotes} Upvotes
                      </button>
                      <button 
                        className="vote-chip down" 
                        onClick={() => handleVote('vista', 'down')}
                        style={{ background: likedProperties.vista.userVoted === 'down' ? 'rgba(239, 68, 68, 0.25)' : '' }}
                      >
                        👎 {likedProperties.vista.downVotes} Downvotes
                      </button>
                    </div>
                  </div>
                </div>

                {/* Chat Panel Box */}
                <div className="chat-panel-pane">
                  <div className="chat-panel-header">Family Workspace Activity Feed</div>
                  <div className="chat-messages-box">
                    {chatLog.map((msg) => (
                      <div key={msg.id} className={`chat-msg ${msg.self ? 'self' : ''}`}>
                        <span className="msg-sender">{msg.sender}</span>
                        <div className="msg-bubble">{msg.text}</div>
                      </div>
                    ))}
                  </div>
                  <form className="chat-input-bar" onSubmit={handleSendChat}>
                    <input 
                      type="text" 
                      placeholder="Discuss compliance or layout details..." 
                      className="glass-input chat-text-input"
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                    />
                    <button type="submit" className="glow-btn chat-send-btn">Post</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 6: Competitive Matrix */}
        {activeTab === 'matrix' && (
          <div className="glass-panel full-width-card">
            <div className="panel-header">
              <h3 className="panel-title"><LayoutIcon /> Incumbent vs US Baseline vs Ghar AI</h3>
              <span className="brand-tagline">Product Competitive Differentiation</span>
            </div>
            <div className="panel-content">
              <div className="matrix-table-wrapper">
                <table className="matrix-table">
                  <thead>
                    <tr>
                      <th>Product Vector</th>
                      <th>Standard Incumbents</th>
                      <th>US Baseline System</th>
                      <th className="highlight-ghar">Ghar AI Evolution</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Verification & Trust</td>
                      <td>Mobile OTP verification only. Surface-level listing checks. Open bulletin ads.</td>
                      <td>Public historical MLS transaction tracking, basic property history records.</td>
                      <td className="highlight-ghar">The GharScore: Real-time legal API verification against state land records databases (Bhulekh, KARERA).</td>
                    </tr>
                    <tr>
                      <td>Mapping Capabilities</td>
                      <td>Static location pin drop coordinates and isolated builder plans.</td>
                      <td>Overlays showing crime index ratings, public schools, and general walkability.</td>
                      <td className="highlight-ghar">Infrastructure Overlays: Telemetry heatmaps showing water tanker dependencies, monsoon flooding, and hub commutes.</td>
                    </tr>
                    <tr>
                      <td>Cost Visibility</td>
                      <td>Raw basic property listing price with detached bank advertisement links.</td>
                      <td>BuyAbility score featuring mortgage pre-qualification calculators.</td>
                      <td className="highlight-ghar">TrueCost Calculation: Algorithmic inline unbundling of localized stamp duty, registration taxes, and builder fees.</td>
                    </tr>
                    <tr>
                      <td>Social Interface</td>
                      <td>Basic property URL sharing functionality via messaging apps.</td>
                      <td>Co-buyer shared folder workspaces for listing curation.</td>
                      <td className="highlight-ghar">Family Portal: Shared folders, live discussions, asynchronous voting, and unified legal compliance trackers.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

      </div>
      
      {/* Footer */}
      <footer style={{ marginTop: 'auto', paddingTop: '40px', paddingBottom: '20px', borderTop: '1px solid var(--border-color)', textAlign: 'center', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
        Ghar AI Confidential Product Blueprint Mockup. Designed with premium dark system aesthetics.
      </footer>
    </div>
  );
}

export default App;

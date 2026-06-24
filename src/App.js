import React, { useState, useEffect } from 'react';
import './App.css';

// Import segregated components
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import GharScoreEngine from './components/GharScoreEngine';
import InfrastructureMap from './components/InfrastructureMap';
import TrueCostCalculator from './components/TrueCostCalculator';
import FamilyHub from './components/FamilyHub';
import StrategyMatrix from './components/StrategyMatrix';

// SVG Icons used for dashboard home cards
const SparklesIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"></path></svg>
);

const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
);

const MapIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"></polygon><line x1="9" y1="3" x2="9" y2="18"></line><line x1="15" y1="6" x2="15" y2="21"></line></svg>
);

const CalculatorIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect><line x1="9" y1="22" x2="9" y2="16"></line><line x1="8" y1="6" x2="16" y2="6"></line><line x1="16" y1="14" x2="16" y2="22"></line><line x1="16" y1="10" x2="8" y2="10"></line></svg>
);

const UsersIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
);

// Constants
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

const DISTRICT_DATA = {
  whitefield: {
    name: "Whitefield Residential Belt",
    waterTanker: "85%",
    floodRisk: "Low Risk",
    commuteTime: "65 mins",
    waterColor: "#ef4444",
    floodColor: "#10b981",
    commuteColor: "#f59e0b",
    recommendation: "High water tanker dependency. Consider rainwater harvesting systems. Commute is heavy to central hubs."
  },
  sarjapur: {
    name: "Sarjapur Land Plots",
    waterTanker: "92%",
    floodRisk: "Moderate Risk",
    commuteTime: "50 mins",
    waterColor: "#ef4444",
    floodColor: "#f59e0b",
    commuteColor: "#f59e0b",
    recommendation: "Critical groundwater depletion. High builder reliance on external tankers. Road expansions underway."
  },
  outerRing: {
    name: "Outer Ring Road (ORR)",
    waterTanker: "60%",
    floodRisk: "High Risk (Monsoon Flooding)",
    commuteTime: "85 mins",
    waterColor: "#f59e0b",
    floodColor: "#ef4444",
    commuteColor: "#ef4444",
    recommendation: "Monsoon flooding vulnerability near lake channels. Traffic delays average 85 minutes during office hours."
  },
  indiranagar: {
    name: "Indiranagar Central Area",
    waterTanker: "12%",
    floodRisk: "Very Low",
    commuteTime: "25 mins",
    waterColor: "#10b981",
    floodColor: "#10b981",
    commuteColor: "#10b981",
    recommendation: "Municipal Cauvery water supply is excellent. High infrastructure stability with minimal waterlogging."
  },
  electronicCity: {
    name: "Electronic City Plots",
    waterTanker: "45%",
    floodRisk: "Low Risk",
    commuteTime: "40 mins",
    waterColor: "#f59e0b",
    floodColor: "#10b981",
    commuteColor: "#10b981",
    recommendation: "Stable industrial water supply. Fast travel via elevated expressway to South Bengaluru."
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
    { id: 1, sender: "Dad (Auditor)", text: "GharScore of 92 for Cybercity is solid. Land partition logs on Dharani check out cleanly.", self: false },
    { id: 2, sender: "Mom", text: "I liked the layout. Let's make sure we check the TrueCost unbundled breakdown first.", self: false },
    { id: 3, sender: "You", text: "Already updated the parameters. Ready properties with OC have 0% GST liability.", self: true }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [likedProperties, setLikedProperties] = useState({
    lakeside: { upVotes: 2, downVotes: 0, userVoted: 'up' },
    valley: { upVotes: 1, downVotes: 1, userVoted: null },
    vista: { upVotes: 0, downVotes: 2, userVoted: 'down' }
  });

  const triggerScan = (preset) => {
    setUrlInput(preset.url);
    setActivePreset(preset);
    setScanState('scanning');
    setCurrentStep(0);
    setActiveTab('gharScore'); // Redirect to scan visualizer tab
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
      registrationRate = 0.01; 
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
        newVote = null;
        if (direction === 'up') upDiff = -1;
        if (direction === 'down') downDiff = -1;
      } else {
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

  const formatINR = (num) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(num);
  };

  const getDistrictColor = (districtKey) => {
    const district = DISTRICT_DATA[districtKey];
    if (heatmapView === 'water') return district.waterColor;
    if (heatmapView === 'flood') return district.floodColor;
    return district.commuteColor;
  };

  return (
    <div className="app-container">
      {/* Brand Navigation Header */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Hero Banner Section */}
      <Hero />

      {/* Main Panel View Grid */}
      <div className="dashboard-grid">
        
        {activeTab === 'dashboard' && (
          <>
            {/* GharScore quick check widget */}
            <div className="glass-panel">
              <div className="panel-header">
                <h3 className="panel-title"><SparklesIcon /> Quick RERA / Land Compliance Scan</h3>
              </div>
              <div className="panel-content">
                <p style={{ color: 'var(--text-secondary)', marginBottom: '15px', fontSize: '0.85rem' }}>
                  Paste any URL from incument platforms to test its regulatory, tax and builder compliance integrity.
                </p>
                <div className="url-input-group">
                  <input 
                    type="text" 
                    placeholder="Paste portal link here..." 
                    className="glass-input url-input"
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                  />
                  <button 
                    className="glow-btn" 
                    style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
                    onClick={() => triggerScan(PRESETS[0])}
                  >
                    <SearchIcon /> Scan
                  </button>
                </div>
                
                <div style={{ marginTop: '16px' }}>
                  <span className="preset-title" style={{ fontSize: '0.75rem' }}>Test active projects:</span>
                  <div className="presets-list" style={{ marginTop: '6px' }}>
                    {PRESETS.map((p, idx) => (
                      <button key={idx} className="preset-btn" onClick={() => triggerScan(p)}>
                        {p.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Quick map helper widget */}
            <div className="glass-panel">
              <div className="panel-header">
                <h3 className="panel-title"><MapIcon /> Infrastructure Plot Overlays</h3>
                <span className="brand-tagline">Land scarcity telemetry</span>
              </div>
              <div className="panel-content">
                <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                  <button className={`control-btn ${heatmapView === 'water' ? 'active' : ''}`} onClick={() => setHeatmapView('water')}>Water</button>
                  <button className={`control-btn ${heatmapView === 'flood' ? 'active' : ''}`} onClick={() => setHeatmapView('flood')}>Monsoon Clogging</button>
                </div>
                <div style={{ background: '#0e1420', padding: '12px', border: '1px solid var(--border-color)', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <h4 style={{ fontSize: '0.9rem', color: '#fff' }}>{DISTRICT_DATA[selectedDistrict].name}</h4>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '3px' }}>{DISTRICT_DATA[selectedDistrict].recommendation}</p>
                  </div>
                  <button className="glow-btn" style={{ padding: '8px 12px', fontSize: '0.75rem' }} onClick={() => setActiveTab('heatmap')}>Explore</button>
                </div>
              </div>
            </div>

            {/* TrueCost preview widget */}
            <div className="glass-panel">
              <div className="panel-header">
                <h3 className="panel-title"><CalculatorIcon /> TrueCost Land Pricing</h3>
              </div>
              <div className="panel-content">
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                  <div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Base Shell Price:</span>
                    <h3 style={{ fontSize: '1.5rem', color: '#fff' }}>{formatINR(baseCost)}</h3>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>TrueCost Estimate:</span>
                    <h3 style={{ fontSize: '1.5rem', color: 'var(--accent-emerald)' }}>{formatINR(costs.total)}</h3>
                  </div>
                </div>
                <button className="glow-btn" style={{ width: '100%' }} onClick={() => setActiveTab('trueCost')}>Unbundle statutory taxes</button>
              </div>
            </div>

            {/* Family hub widget */}
            <div className="glass-panel">
              <div className="panel-header">
                <h3 className="panel-title"><UsersIcon /> Collaborative Workspaces</h3>
              </div>
              <div className="panel-content">
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '15px' }}>
                  Align co-buyers on legal verifications, survey partitions, and builder negotiations inside a unified dashboard.
                </p>
                <button className="glow-btn" style={{ width: '100%' }} onClick={() => setActiveTab('familyFeed')}>Open family panel</button>
              </div>
            </div>
          </>
        )}

        {/* Tab 2: GharScore Triage Engine */}
        {activeTab === 'gharScore' && (
          <GharScoreEngine 
            urlInput={urlInput}
            setUrlInput={setUrlInput}
            scanState={scanState}
            currentStep={currentStep}
            scanSteps={scanSteps}
            activePreset={activePreset}
            triggerScan={triggerScan}
            presets={PRESETS}
          />
        )}

        {/* Tab 3: Infrastructure Map */}
        {activeTab === 'heatmap' && (
          <InfrastructureMap 
            heatmapView={heatmapView}
            setHeatmapView={setHeatmapView}
            hoveredDistrict={hoveredDistrict}
            setHoveredDistrict={setHoveredDistrict}
            selectedDistrict={selectedDistrict}
            setSelectedDistrict={setSelectedDistrict}
            districtData={DISTRICT_DATA}
            getDistrictColor={getDistrictColor}
          />
        )}

        {/* Tab 4: TrueCost Calculator */}
        {activeTab === 'trueCost' && (
          <TrueCostCalculator 
            baseCost={baseCost}
            setBaseCost={setBaseCost}
            constructionStatus={constructionStatus}
            setConstructionStatus={setConstructionStatus}
            calcState={calcState}
            setCalcState={setCalcState}
            maintenanceCorpus={maintenanceCorpus}
            setMaintenanceCorpus={setMaintenanceCorpus}
            costs={costs}
            formatINR={formatINR}
          />
        )}

        {/* Tab 5: Family Feed */}
        {activeTab === 'familyFeed' && (
          <FamilyHub 
            chatLog={chatLog}
            chatInput={chatInput}
            setChatInput={setChatInput}
            handleSendChat={handleSendChat}
            likedProperties={likedProperties}
            handleVote={handleVote}
          />
        )}

        {/* Tab 6: Competitive Matrix */}
        {activeTab === 'matrix' && (
          <StrategyMatrix />
        )}

      </div>

      {/* Footer */}
      <footer style={{ marginTop: 'auto', paddingTop: '30px', paddingBottom: '10px', borderTop: '1px solid var(--border-color)', textAlign: 'center', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
        Ghar AI Real Estate Strategic Mockup Dashboard. Created with high pixel clarity structures.
      </footer>
    </div>
  );
}

export default App;

import React from 'react';

// SVG Icons
const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
);

const ShieldCheckIcon = ({ size = 20, color = "currentColor" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><path d="m9 12 2 2 4-4"></path></svg>
);

const AlertTriangleIcon = ({ size = 20, color = "currentColor" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
);

const UploadIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
);

function GharScoreEngine({ 
  urlInput, 
  setUrlInput, 
  scanState, 
  currentStep, 
  scanSteps, 
  activePreset, 
  triggerScan, 
  presets 
}) {
  return (
    <div className="glass-panel full-width-card">
      <div className="panel-header">
        <h3 className="panel-title"><ShieldCheckIcon size={22} color="var(--accent-emerald)" /> GharScore Legal Compliance Diagnostic</h3>
        <span className="brand-tagline">Telangana RERA & Land Registry APIs</span>
      </div>
      <div className="panel-content">
        <div className="calculator-layout">
          
          {/* Inputs Panel */}
          <div className="calc-inputs-pane">
            <div className="form-group">
              <label>Competitor Portal Link</label>
              <div style={{ display: 'flex', gap: '8px' }}>
                <input 
                  type="text" 
                  placeholder="Paste MagicBricks, 99acres or NoBroker URL..." 
                  className="glass-input"
                  style={{ flexGrow: 1 }}
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                />
                <button 
                  className="glow-btn" 
                  style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 16px' }}
                  onClick={() => triggerScan({ url: urlInput, ...presets[0], name: "Custom Property Check", score: 88 })}
                >
                  <SearchIcon /> Scan
                </button>
              </div>
            </div>
            
            <div className="presets-list" style={{ marginTop: '5px' }}>
              {presets.map((p, idx) => (
                <button key={idx} className="preset-btn" onClick={() => triggerScan(p)}>
                  Verify: {p.name}
                </button>
              ))}
            </div>

            <div style={{ margin: '15px 0', textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.8rem' }}>— OR —</div>

            <div className="form-group">
              <label>Document Upload (Extract via Vision LLM)</label>
              <div className="upload-zone" onClick={() => triggerScan(presets[0])}>
                <span className="upload-icon"><UploadIcon /></span>
                <p className="upload-text">Upload RERA sheets, tax receipts, or Patta deeds</p>
                <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', marginTop: '5px' }}>Supported formats: PDF, JPG, PNG (Extracts and queries portal databases)</p>
              </div>
            </div>
          </div>

          {/* Verification Status Panel */}
          <div className="calc-results-pane" style={{ background: '#0e1420' }}>
            {scanState === 'idle' && (
              <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--text-secondary)' }}>
                <ShieldCheckIcon size={40} color="rgba(255,255,255,0.1)" />
                <p style={{ marginTop: '15px', fontSize: '0.85rem' }}>Upload or select a project preset to trigger compliance auditing.</p>
              </div>
            )}

            {scanState === 'scanning' && (
              <div className="scanning-card scanning">
                <div className="scan-radar"></div>
                <h4 style={{ color: '#fff' }}>Executing Compliances Scans...</h4>
                <p className="scan-step">{scanSteps[currentStep]}</p>
                <div style={{ width: '100%', background: 'rgba(255,255,255,0.05)', height: '4px', borderRadius: '2px', marginTop: '20px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', background: 'var(--accent-emerald)', width: `${((currentStep + 1) / scanSteps.length) * 100}%`, transition: 'width 0.4s ease' }}></div>
                </div>
              </div>
            )}

            {scanState === 'done' && (
              <div className="score-result-layout">
                {/* Score badge */}
                <div className="circle-score-wrapper">
                  <div className="circle-svg-container">
                    <svg width="130" height="130">
                      <circle className="circle-bg" cx="65" cy="65" r="56" />
                      <circle 
                        className="circle-progress" 
                        cx="65" 
                        cy="65" 
                        r="56" 
                        stroke={activePreset.type === 'high' ? 'var(--accent-emerald)' : activePreset.type === 'marginal' ? 'var(--accent-amber)' : 'var(--accent-red)'}
                        strokeDasharray={351.85}
                        strokeDashoffset={351.85 - (351.85 * activePreset.score) / 100}
                      />
                    </svg>
                    <div className="score-text-overlay">
                      <span className="score-num">{activePreset.score}</span>
                      <span className="score-lbl">GharScore</span>
                    </div>
                  </div>

                  <span className={`status-badge ${activePreset.type === 'high' ? 'badge-green' : activePreset.type === 'marginal' ? 'badge-orange' : 'badge-red'}`}>
                    {activePreset.type === 'high' ? 'HIGH CONFIDENCE' : activePreset.type === 'marginal' ? 'MARGINAL COMPLIANCE' : 'FLAGGED COMPLIANCE'}
                  </span>
                </div>

                {/* Diagnostics details */}
                <div className="compliance-details-list">
                  <h4 style={{ color: '#fff', fontSize: '0.85rem', marginBottom: '5px' }}>Compliance Diagnostics:</h4>
                  
                  {Object.keys(activePreset.metrics).map((key) => {
                    const m = activePreset.metrics[key];
                    const name = key === 'rera' ? 'RERA Registration' : key === 'landDeed' ? 'Title Deed (Dharani)' : key === 'tax' ? 'Statutory Taxes (GHMC)' : 'Occupancy Verification (OC)';
                    const isGreen = m.val === 'PASS';
                    const isRed = m.val === 'FAIL';
                    return (
                      <div key={key} className="compliance-metric-card" style={{ borderColor: isGreen ? 'rgba(16,185,129,0.1)' : isRed ? 'rgba(239,68,68,0.1)' : 'rgba(245,158,11,0.1)' }}>
                        <div className="metric-meta">
                          <span className="metric-title" style={{ display: 'flex', alignItems: 'center', gap: '6px', color: isGreen ? 'var(--accent-emerald)' : isRed ? 'var(--accent-red)' : 'var(--accent-amber)' }}>
                            {!isGreen && <AlertTriangleIcon size={14} color={isRed ? 'var(--accent-red)' : 'var(--accent-amber)'} />}
                            {name}
                          </span>
                          <span className="metric-desc">{m.desc}</span>
                        </div>
                        <span className="metric-status" style={{ color: isGreen ? 'var(--accent-emerald)' : isRed ? 'var(--accent-red)' : 'var(--accent-amber)' }}>
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
  );
}

export default GharScoreEngine;

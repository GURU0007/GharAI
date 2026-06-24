import React from 'react';

// Icons
const CalculatorIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect><line x1="9" y1="22" x2="9" y2="16"></line><line x1="8" y1="6" x2="16" y2="6"></line><line x1="16" y1="14" x2="16" y2="22"></line><line x1="16" y1="10" x2="8" y2="10"></line></svg>
);

function TrueCostCalculator({ 
  baseCost, 
  setBaseCost, 
  constructionStatus, 
  setConstructionStatus, 
  calcState, 
  setCalcState, 
  maintenanceCorpus, 
  setMaintenanceCorpus, 
  costs, 
  formatINR 
}) {
  return (
    <div className="glass-panel full-width-card">
      <div className="panel-header">
        <h3 className="panel-title"><CalculatorIcon /> TrueCost Land & Pricing Calculator</h3>
        <span className="brand-tagline">BuyAbility adaptation parameters</span>
      </div>
      <div className="panel-content">
        <div className="calculator-layout">
          
          {/* Inputs pane */}
          <div className="calc-inputs-pane">
            <div className="form-group">
              <label>Raw Base Plot / Property Price (INR)</label>
              <input 
                type="number" 
                className="glass-input" 
                value={baseCost}
                onChange={(e) => setBaseCost(Number(e.target.value))}
              />
            </div>

            <div className="form-group">
              <label>Construction Status</label>
              <select 
                className="glass-input" 
                value={constructionStatus} 
                onChange={(e) => setConstructionStatus(e.target.value)}
              >
                <option value="under-construction">Under Construction (5% GST applies)</option>
                <option value="ready-to-move">Ready to Move (0% GST - Occupancy Certificate exchanged)</option>
              </select>
            </div>

            <div className="form-group">
              <label>State Registry Regulation</label>
              <select 
                className="glass-input" 
                value={calcState} 
                onChange={(e) => setCalcState(e.target.value)}
              >
                <option value="karnataka">Karnataka (5.6% Stamp Duty, 1% Registration fee)</option>
                <option value="maharashtra">Maharashtra (6.0% Stamp Duty, Flat ₹30,000 Registration fee)</option>
              </select>
            </div>

            <div className="form-group">
              <label>Developer Maintenance Corpus Demands (₹)</label>
              <input 
                type="number" 
                className="glass-input" 
                value={maintenanceCorpus}
                onChange={(e) => setMaintenanceCorpus(Number(e.target.value))}
              />
            </div>
          </div>

          {/* Results pane */}
          <div className="calc-results-pane">
            <div className="big-cost-header">
              <span className="cost-num-sub">Total Unbundled Financial Liability:</span>
              <div className="cost-num-big">{formatINR(costs.total)}</div>
              <span style={{ fontSize: '0.8rem', color: 'var(--accent-red)', fontWeight: '600' }}>
                (+{(((costs.total - costs.base) / costs.base) * 100).toFixed(1)}% extra statutory costs)
              </span>
            </div>

            <div className="cost-bars-stack">
              {/* Base Cost */}
              <div className="cost-bar-item">
                <div className="cost-bar-label-row">
                  <span>Base Shell Price</span>
                  <span>{formatINR(costs.base)}</span>
                </div>
                <div className="cost-bar-outer">
                  <div className="cost-bar-inner" style={{ width: `${(costs.base / costs.total) * 100}%`, background: 'var(--accent-teal)' }}></div>
                </div>
              </div>

              {/* GST */}
              <div className="cost-bar-item">
                <div className="cost-bar-label-row">
                  <span>GST Liability</span>
                  <span>{formatINR(costs.gst)}</span>
                </div>
                <div className="cost-bar-outer">
                  <div className="cost-bar-inner" style={{ width: `${(costs.gst / costs.total) * 100}%`, background: '#8b5cf6' }}></div>
                </div>
              </div>

              {/* Stamp Duty */}
              <div className="cost-bar-item">
                <div className="cost-bar-label-row">
                  <span>Stamp Duty Taxes</span>
                  <span>{formatINR(costs.stampDuty)}</span>
                </div>
                <div className="cost-bar-outer">
                  <div className="cost-bar-inner" style={{ width: `${(costs.stampDuty / costs.total) * 100}%`, background: 'var(--accent-amber)' }}></div>
                </div>
              </div>

              {/* Registration fee */}
              <div className="cost-bar-item">
                <div className="cost-bar-label-row">
                  <span>Statutory Registration Charges</span>
                  <span>{formatINR(costs.registrationFee)}</span>
                </div>
                <div className="cost-bar-outer">
                  <div className="cost-bar-inner" style={{ width: `${(costs.registrationFee / costs.total) * 100}%`, background: 'var(--accent-emerald)' }}></div>
                </div>
              </div>

              {/* Corpus */}
              <div className="cost-bar-item">
                <div className="cost-bar-label-row">
                  <span>Developer Corpus Demands</span>
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
  );
}

export default TrueCostCalculator;

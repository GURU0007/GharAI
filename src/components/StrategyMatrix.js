import React from 'react';

// Icons
const LayoutIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>
);

function StrategyMatrix() {
  return (
    <div className="glass-panel full-width-card">
      <div className="panel-header">
        <h3 className="panel-title"><LayoutIcon /> Competitive Product Architecture Matrix</h3>
        <span className="brand-tagline">Incumbents vs US Baseline vs Ghar AI</span>
      </div>
      <div className="panel-content">
        <div className="matrix-table-wrapper">
          <table className="matrix-table">
            <thead>
              <tr>
                <th>Product Vector</th>
                <th>Standard Incumbents (MagicBricks/99acres)</th>
                <th>US Baseline System (Zillow/Redfin)</th>
                <th className="highlight-ghar">Ghar AI Evolution</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Verification & Trust</td>
                <td>OTP verification only. surface-level listings. Raw visual inspect checks.</td>
                <td>Historical MLS listings transaction records.</td>
                <td className="highlight-ghar">The GharScore: Automated legal API verification checks against state land and RERA registers.</td>
              </tr>
              <tr>
                <td>Mapping Capabilities</td>
                <td>Static location coordinates. No layout verification layers.</td>
                <td>Overlays detailing local crime, schools, and walk-scores.</td>
                <td className="highlight-ghar">Infrastructure Heatmap: Visual logs displaying monsoon flooding, commute times, and water lines.</td>
              </tr>
              <tr>
                <td>Cost Visibility</td>
                <td>Base token values. Hidden taxes and developer charges unlisted.</td>
                <td>BuyAbility profiles with pre-qualified mortgage tools.</td>
                <td className="highlight-ghar">TrueCost Calculation: Algorithmic automatic breakdown of stamp taxes, registrations, and builder fees.</td>
              </tr>
              <tr>
                <td>Social Feed</td>
                <td>Basic URL copying to messengers (WhatsApp).</td>
                <td>Co-buyer workspaces for cataloging favorites.</td>
                <td className="highlight-ghar">Family Portal: Real-time stakeholder voting and asynchronous legal/cost discussions.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default StrategyMatrix;

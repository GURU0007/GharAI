import React from 'react';

// Icons
const MapIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"></polygon><line x1="9" y1="3" x2="9" y2="18"></line><line x1="15" y1="6" x2="15" y2="21"></line></svg>
);

function InfrastructureMap({ 
  heatmapView, 
  setHeatmapView, 
  hoveredDistrict, 
  setHoveredDistrict, 
  selectedDistrict, 
  setSelectedDistrict, 
  districtData, 
  getDistrictColor 
}) {
  return (
    <div className="glass-panel full-width-card">
      <div className="panel-header">
        <h3 className="panel-title"><MapIcon /> Locality & Utility Infrastructure Heatmap</h3>
        <div className="heatmap-controls">
          <button 
            className={`control-btn ${heatmapView === 'water' ? 'active' : ''}`} 
            onClick={() => setHeatmapView('water')}
          >
            Water Tanker Reliance
          </button>
          <button 
            className={`control-btn ${heatmapView === 'flood' ? 'active' : ''}`} 
            onClick={() => setHeatmapView('flood')}
          >
            Monsoon Flood Risk
          </button>
          <button 
            className={`control-btn ${heatmapView === 'commute' ? 'active' : ''}`} 
            onClick={() => setHeatmapView('commute')}
          >
            Commute to Tech Hub
          </button>
        </div>
      </div>
      <div className="panel-content">
        <div className="map-layout">
          
          {/* Map canvas */}
          <div className="map-viewport">
            <svg viewBox="0 0 500 400" className="svg-map-canvas">
              {/* Land grid reference lines */}
              <defs>
                <pattern id="gridPattern" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.015)" strokeWidth="1"/>
                </pattern>
              </defs>
              <rect width="500" height="400" fill="url(#gridPattern)" />

              {/* Districts Polygons representing land zones */}
              <g>
                {/* Indiranagar */}
                <path 
                  d="M 100, 80 L 220, 60 L 250, 140 L 140, 170 Z" 
                  fill={getDistrictColor('indiranagar')} 
                  fillOpacity="0.4"
                  stroke={selectedDistrict === 'indiranagar' ? '#fff' : 'rgba(255,255,255,0.15)'}
                  strokeWidth={selectedDistrict === 'indiranagar' ? '2.5' : '1'}
                  className="map-district"
                  onMouseEnter={() => setHoveredDistrict('indiranagar')}
                  onClick={() => setSelectedDistrict('indiranagar')}
                />
                <text x="145" y="115" fill="#fff" fontSize="9" fontWeight="600" pointerEvents="none">Indiranagar</text>

                {/* Whitefield */}
                <path 
                  d="M 280, 50 L 450, 70 L 410, 190 L 290, 150 Z" 
                  fill={getDistrictColor('whitefield')} 
                  fillOpacity="0.4"
                  stroke={selectedDistrict === 'whitefield' ? '#fff' : 'rgba(255,255,255,0.15)'}
                  strokeWidth={selectedDistrict === 'whitefield' ? '2.5' : '1'}
                  className="map-district"
                  onMouseEnter={() => setHoveredDistrict('whitefield')}
                  onClick={() => setSelectedDistrict('whitefield')}
                />
                <text x="330" y="105" fill="#fff" fontSize="10" fontWeight="600" pointerEvents="none">Whitefield Plot</text>

                {/* ORR Bellandur */}
                <path 
                  d="M 220, 170 L 290, 150 L 320, 250 L 220, 270 Z" 
                  fill={getDistrictColor('outerRing')} 
                  fillOpacity="0.4"
                  stroke={selectedDistrict === 'outerRing' ? '#fff' : 'rgba(255,255,255,0.15)'}
                  strokeWidth={selectedDistrict === 'outerRing' ? '2.5' : '1'}
                  className="map-district"
                  onMouseEnter={() => setHoveredDistrict('outerRing')}
                  onClick={() => setSelectedDistrict('outerRing')}
                />
                <text x="235" y="215" fill="#fff" fontSize="9" fontWeight="600" pointerEvents="none">ORR Sector</text>

                {/* Sarjapur */}
                <path 
                  d="M 320, 250 L 410, 190 L 450, 310 L 330, 340 Z" 
                  fill={getDistrictColor('sarjapur')} 
                  fillOpacity="0.4"
                  stroke={selectedDistrict === 'sarjapur' ? '#fff' : 'rgba(255,255,255,0.15)'}
                  strokeWidth={selectedDistrict === 'sarjapur' ? '2.5' : '1'}
                  className="map-district"
                  onMouseEnter={() => setHoveredDistrict('sarjapur')}
                  onClick={() => setSelectedDistrict('sarjapur')}
                />
                <text x="355" y="275" fill="#fff" fontSize="9" fontWeight="600" pointerEvents="none">Sarjapur Land</text>

                {/* Electronic City */}
                <path 
                  d="M 170, 280 L 290, 265 L 310, 350 L 190, 370 Z" 
                  fill={getDistrictColor('electronicCity')} 
                  fillOpacity="0.4"
                  stroke={selectedDistrict === 'electronicCity' ? '#fff' : 'rgba(255,255,255,0.15)'}
                  strokeWidth={selectedDistrict === 'electronicCity' ? '2.5' : '1'}
                  className="map-district"
                  onMouseEnter={() => setHoveredDistrict('electronicCity')}
                  onClick={() => setSelectedDistrict('electronicCity')}
                />
                <text x="200" y="325" fill="#fff" fontSize="9" fontWeight="600" pointerEvents="none">E-City Industrial</text>
              </g>
            </svg>
          </div>

          {/* Details sidepanel */}
          <div className="map-legend">
            <div className="district-tooltip-card">
              <h4 className="tooltip-title">{districtData[hoveredDistrict].name}</h4>
              <div className="tooltip-row">
                <span>Water Tanker Reliance:</span>
                <span style={{ color: districtData[hoveredDistrict].waterColor }}>{districtData[hoveredDistrict].waterTanker}</span>
              </div>
              <div className="tooltip-row">
                <span>Monsoon Flood Risk:</span>
                <span style={{ color: districtData[hoveredDistrict].floodColor }}>{districtData[hoveredDistrict].floodRisk}</span>
              </div>
              <div className="tooltip-row">
                <span>Peak hour commute time:</span>
                <span style={{ color: districtData[hoveredDistrict].commuteColor }}>{districtData[hoveredDistrict].commuteTime}</span>
              </div>
              <p style={{ marginTop: '10px', fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: '1.4', background: '#1f2937', padding: '8px', borderRadius: '4px' }}>
                <strong>Strategic Insight:</strong> {districtData[hoveredDistrict].recommendation}
              </p>
            </div>

            <div className="legend-card">
              <span className="legend-title">Metric Severity Guide:</span>
              <div className="legend-bar" style={{ background: 'linear-gradient(90deg, var(--accent-emerald), var(--accent-amber), var(--accent-red))' }}></div>
              <div className="legend-labels">
                <span>Excellent</span>
                <span>Moderate</span>
                <span>Critical</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default InfrastructureMap;

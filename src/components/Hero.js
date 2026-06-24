import React from 'react';

function Hero() {
  return (
    <section className="hero-section">
      <div className="hero-content">
        <h1 className="hero-title">Shifting the Trust Dynamic <span>Natively</span></h1>
        <p className="hero-desc">
          Incumbent portals function as unverified ad bulletin boards. 
          Ghar AI shifts the paradigm by validating RERA records, land deed mutations, and unbundling regulatory taxes inline.
        </p>
        <div className="hero-stats">
          <div className="stat-item">
            <span className="stat-val">100%</span>
            <span className="stat-lbl">RERA Checked</span>
          </div>
          <div className="stat-item">
            <span className="stat-val">Telangana</span>
            <span className="stat-lbl">Dharani Portal Match</span>
          </div>
          <div className="stat-item">
            <span className="stat-val">₹0</span>
            <span className="stat-lbl">Hidden Charges</span>
          </div>
        </div>
      </div>
      <div className="hero-image-container">
        <div className="hero-image-wrapper">
          <img src={process.env.PUBLIC_URL + '/hero_image.jpg'} alt="Architectural Building and Lands Illustration" className="hero-img" />
        </div>
      </div>
    </section>
  );
}

export default Hero;

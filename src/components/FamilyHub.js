import React from 'react';

// Icons
const UsersIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
);

function FamilyHub({ 
  chatLog, 
  chatInput, 
  setChatInput, 
  handleSendChat, 
  likedProperties, 
  handleVote 
}) {
  return (
    <div className="glass-panel full-width-card">
      <div className="panel-header">
        <h3 className="panel-title"><UsersIcon /> Family Circle Collaborative Feed</h3>
        <span className="brand-tagline">Multi-buyer shared grading matrix</span>
      </div>
      <div className="panel-content">
        <div className="family-dashboard">
          
          {/* Properties Shared list */}
          <div className="shared-feed-pane">
            
            {/* Property 1 */}
            <div className="property-deck-card">
              <div className="deck-header">
                <div className="deck-prop-info">
                  <h4>Cybercity Marina Skies (Kondapur)</h4>
                  <p>3 BHK Luxury Suite • Base: ₹1.2 Cr</p>
                </div>
                <span className="deck-compliance-tag badge-green">GharScore: 92</span>
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '10px' }}>
                <em>Status Notes:</em> Clear land titles. Validated partition deeds on Dharani portal matching co-owners.
              </div>
              <div className="stakeholder-votes">
                <button 
                  className="vote-chip up" 
                  onClick={() => handleVote('lakeside', 'up')}
                  style={{ background: likedProperties.lakeside.userVoted === 'up' ? 'rgba(16, 185, 129, 0.2)' : '' }}
                >
                  👍 {likedProperties.lakeside.upVotes} Upvotes
                </button>
                <button 
                  className="vote-chip down" 
                  onClick={() => handleVote('lakeside', 'down')}
                  style={{ background: likedProperties.lakeside.userVoted === 'down' ? 'rgba(239, 68, 68, 0.2)' : '' }}
                >
                  👎 {likedProperties.lakeside.downVotes} Downvotes
                </button>
              </div>
            </div>

            {/* Property 2 */}
            <div className="property-deck-card">
              <div className="deck-header">
                <div className="deck-prop-info">
                  <h4>Aurobindo Galaxy Heights (Gachibowli)</h4>
                  <p>3 BHK High Rise • Base: ₹95 L</p>
                </div>
                <span className="deck-compliance-tag badge-orange">GharScore: 74</span>
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '10px' }}>
                <em>Status Notes:</em> Pending GHMC tax assessment dues. RERA registration verified active.
              </div>
              <div className="stakeholder-votes">
                <button 
                  className="vote-chip up" 
                  onClick={() => handleVote('valley', 'up')}
                  style={{ background: likedProperties.valley.userVoted === 'up' ? 'rgba(16, 185, 129, 0.2)' : '' }}
                >
                  👍 {likedProperties.valley.upVotes} Upvotes
                </button>
                <button 
                  className="vote-chip down" 
                  onClick={() => handleVote('valley', 'down')}
                  style={{ background: likedProperties.valley.userVoted === 'down' ? 'rgba(239, 68, 68, 0.2)' : '' }}
                >
                  👎 {likedProperties.valley.downVotes} Downvotes
                </button>
              </div>
            </div>

            {/* Property 3 */}
            <div className="property-deck-card">
              <div className="deck-header">
                <div className="deck-prop-info">
                  <h4>Mayfair Green Vista (Miyapur)</h4>
                  <p>2 BHK Land Plot Plot • Base: ₹65 L</p>
                </div>
                <span className="deck-compliance-tag badge-red">GharScore: 41</span>
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '10px' }}>
                <em>Status Notes:</em> RERA expired on Phase 2. active land ownership litigation logs.
              </div>
              <div className="stakeholder-votes">
                <button 
                  className="vote-chip up" 
                  onClick={() => handleVote('vista', 'up')}
                  style={{ background: likedProperties.vista.userVoted === 'up' ? 'rgba(16, 185, 129, 0.2)' : '' }}
                >
                  👍 {likedProperties.vista.upVotes} Upvotes
                </button>
                <button 
                  className="vote-chip down" 
                  onClick={() => handleVote('vista', 'down')}
                  style={{ background: likedProperties.vista.userVoted === 'down' ? 'rgba(239, 68, 68, 0.2)' : '' }}
                >
                  👎 {likedProperties.vista.downVotes} Downvotes
                </button>
              </div>
            </div>

          </div>

          {/* Chat feed pane */}
          <div className="chat-panel-pane">
            <div className="chat-panel-header">Family Hub Discussion Feed</div>
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
                placeholder="Discuss legal checks or pricing breakdowns..." 
                className="glass-input chat-text-input"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
              />
              <button type="submit" className="glow-btn chat-send-btn">Send</button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}

export default FamilyHub;

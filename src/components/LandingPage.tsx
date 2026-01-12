import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/analyze');
  };

  return (
    <div className="landing-page">
      <header className="landing-header">
        <h1>Loan Agreement Analyzer</h1>
      </header>
      
      <main className="landing-main">
        <section className="hero-section">
          <h2>Understand Your Loan Contracts</h2>
          <p className="subtitle">Our AI-powered tool helps you comprehend complex loan agreements without legal expertise</p>
          
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🔍</div>
              <h3>Clear Summaries</h3>
              <p>Get simplified explanations of complex legal terms and conditions</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">⚠️</div>
              <h3>Risk Identification</h3>
              <p>Spot potential risks and hidden clauses in your loan agreement</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">📋</div>
              <h3>Structured Overview</h3>
              <p>View key information organized in an easy-to-understand format</p>
            </div>
          </div>
          
          <div className="cta-section">
            <button className="primary-button" onClick={handleGetStarted}>
              Analyze Your Contract
            </button>
          </div>
        </section>
        
        <section className="how-it-works">
          <h2>How It Works</h2>
          <div className="steps-container">
            <div className="step">
              <div className="step-number">1</div>
              <h3>Upload Your Document</h3>
              <p>Simply upload your loan agreement in PDF or Word format</p>
            </div>
            
            <div className="step">
              <div className="step-number">2</div>
              <h3>AI Analysis</h3>
              <p>Our AI processes the document and extracts key information</p>
            </div>
            
            <div className="step">
              <div className="step-number">3</div>
              <h3>Review Summary</h3>
              <p>Get a structured summary highlighting important terms and risks</p>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="landing-footer">
        <p>Note: This tool provides a summary based on AI analysis. Always consult with a legal professional before signing any contract.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
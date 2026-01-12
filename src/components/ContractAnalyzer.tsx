import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FileUpload from './FileUpload';
import ContractSummaryDisplay from './ContractSummaryDisplay';
import { type ContractSummary } from '../types/contract';

const ContractAnalyzer: React.FC = () => {
  const [contractSummary, setContractSummary] = useState<ContractSummary | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleAnalysisComplete = (summary: ContractSummary) => {
    setContractSummary(summary);
    setError(null);
  };

  const handleError = (message: string) => {
    setError(message);
    setContractSummary(null);
  };

  const handleLoadingChange = (isLoading: boolean) => {
    setLoading(isLoading);
  };

  const handleGoBack = () => {
    navigate('/');
  };

  return (
    <div className="contract-analyzer">
      <header className="analyzer-header">
        <button className="back-button" onClick={handleGoBack}>
          ← Back to Home
        </button>
        <h1>Loan Agreement Analyzer</h1>
        <p>Upload your loan contract to get a structured summary and understand what you're signing</p>
      </header>
      
      <main className="analyzer-main">
        <FileUpload 
          onAnalysisComplete={handleAnalysisComplete}
          onError={handleError}
          onLoadingChange={handleLoadingChange}
        />
        
        {loading && (
          <div className="loading-container">
            <p>Analyzing your contract with AI...</p>
          </div>
        )}
        
        {error && (
          <div className="error-container">
            <p>Error: {error}</p>
          </div>
        )}
        
        {contractSummary && !loading && (
          <div className="results-container">
            <h2>Contract Summary</h2>
            <ContractSummaryDisplay summary={contractSummary} />
          </div>
        )}
      </main>
      
      <footer className="analyzer-footer">
        <p>Note: This tool provides a summary based on AI analysis. Always consult with a legal professional before signing any contract.</p>
      </footer>
    </div>
  );
};

export default ContractAnalyzer;
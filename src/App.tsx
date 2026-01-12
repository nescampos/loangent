import { useState } from 'react';
import './App.css';
import FileUpload from './components/FileUpload';
import ContractSummaryDisplay from './components/ContractSummaryDisplay';
import { type ContractSummary } from './types/contract';

function App() {
  const [contractSummary, setContractSummary] = useState<ContractSummary | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

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

  return (
    <div className="app">
      <header className="app-header">
        <h1>Loan Agreement Analyzer</h1>
        <p>Upload your loan contract to get a structured summary and understand what you're signing</p>
      </header>

      <main className="app-main">
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

      <footer className="app-footer">
        <p>Note: This tool provides a summary based on AI analysis. Always consult with a legal professional before signing any contract.</p>
      </footer>
    </div>
  );
}

export default App;

import React from 'react';
import { type ContractSummary } from '../types/contract';

interface ContractSummaryDisplayProps {
  summary: ContractSummary;
}

const ContractSummaryDisplay: React.FC<ContractSummaryDisplayProps> = ({ summary }) => {
  return (
    <div className="contract-summary-container">
      <h2>{summary.title}</h2>
      
      <div className="summary-section">
        <h3>Parties Involved</h3>
        <ul>
          {summary.parties.map((party, index) => (
            <li key={index}>{party}</li>
          ))}
        </ul>
      </div>
      
      <div className="summary-grid">
        <div className="summary-card">
          <h4>Loan Amount</h4>
          <p>{summary.loanAmount}</p>
        </div>
        
        <div className="summary-card">
          <h4>Interest Rate</h4>
          <p>{summary.interestRate}</p>
        </div>
        
        <div className="summary-card">
          <h4>Repayment Terms</h4>
          <p>{summary.repaymentTerms}</p>
        </div>
        
        <div className="summary-card">
          <h4>Collateral</h4>
          <p>{summary.collateral}</p>
        </div>
        
        <div className="summary-card">
          <h4>Payment Schedule</h4>
          <p>{summary.paymentSchedule}</p>
        </div>
        
        <div className="summary-card">
          <h4>Governing Law</h4>
          <p>{summary.governingLaw}</p>
        </div>
      </div>
      
      <div className="summary-section">
        <h3>Key Risks</h3>
        <ul>
          {summary.keyRisks.map((risk, index) => (
            <li key={index}>{risk}</li>
          ))}
        </ul>
      </div>
      
      <div className="summary-section">
        <h3>Important Clauses</h3>
        <ul>
          {summary.importantClauses.map((clause, index) => (
            <li key={index}>{clause}</li>
          ))}
        </ul>
      </div>
      
      <div className="summary-section">
        <h3>Penalties</h3>
        <ul>
          {summary.penalties.map((penalty, index) => (
            <li key={index}>{penalty}</li>
          ))}
        </ul>
      </div>
      
      {summary.expirationDate && (
        <div className="summary-section">
          <h3>Expiration Date</h3>
          <p>{summary.expirationDate}</p>
        </div>
      )}
      
      {summary.earlyTerminationConditions && (
        <div className="summary-section">
          <h3>Early Termination Conditions</h3>
          <p>{summary.earlyTerminationConditions}</p>
        </div>
      )}
      
      <div className="summary-section">
        <h3>Dispute Resolution</h3>
        <p>{summary.disputeResolution}</p>
      </div>
    </div>
  );
};

export default ContractSummaryDisplay;
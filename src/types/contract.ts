export interface ContractSummary {
  title: string;
  parties: string[];
  loanAmount: string;
  interestRate: string;
  repaymentTerms: string;
  collateral: string;
  keyRisks: string[];
  importantClauses: string[];
  expirationDate?: string;
  earlyTerminationConditions?: string;
  penalties: string[];
  paymentSchedule: string;
  governingLaw: string;
  disputeResolution: string;
}

export interface FileUploadResult {
  success: boolean;
  error?: string;
  content?: string;
}
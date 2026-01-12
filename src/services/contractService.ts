import OpenAI from 'openai';
import { type ContractSummary } from '../types/contract';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY || '',
  baseURL: import.meta.env.VITE_OPENAI_BASE_URL || 'https://api.openai.com/v1',
  dangerouslyAllowBrowser: true // Note: Only for development purposes
});

export const analyzeContract = async (contractText: string): Promise<ContractSummary | null> => {
  try {
    const completion = await openai.chat.completions.create({
      model: import.meta.env.VITE_OPENAI_MODEL,
      messages: [
        {
          role: "system",
          content: `You are an expert legal analyst specializing in financial loan agreements. Extract and summarize the key information from the loan contract provided by the user. Return the information in a structured JSON format with the following fields:
          {
            "title": "Title of the contract",
            "parties": ["List of parties involved"],
            "loanAmount": "Total loan amount",
            "interestRate": "Interest rate",
            "repaymentTerms": "Repayment terms",
            "collateral": "Collateral information",
            "keyRisks": ["List of key risks"],
            "importantClauses": ["List of important clauses"],
            "expirationDate": "Expiration date (if mentioned)",
            "earlyTerminationConditions": "Early termination conditions (if mentioned)",
            "penalties": ["List of penalties"],
            "paymentSchedule": "Payment schedule",
            "governingLaw": "Governing law",
            "disputeResolution": "Dispute resolution mechanism"
          }

          If any field is not present in the contract, return an empty string or empty array as appropriate. Keep descriptions concise but informative.`
        },
        {
          role: "user",
          content: contractText
        }
      ],
      temperature: 0.2,
      response_format: { type: "json_object" }
    });

    const responseContent = completion.choices[0]?.message?.content;
    
    if (!responseContent) {
      throw new Error('No response from OpenAI');
    }

    // Parse the JSON response
    const parsedResponse = JSON.parse(responseContent);
    
    // Validate the structure of the response
    const requiredFields: (keyof ContractSummary)[] = [
      'title', 'parties', 'loanAmount', 'interestRate', 'repaymentTerms', 
      'collateral', 'keyRisks', 'importantClauses', 'penalties', 
      'paymentSchedule', 'governingLaw', 'disputeResolution'
    ];

    for (const field of requiredFields) {
      if (!(field in parsedResponse)) {
        throw new Error(`Missing required field: ${field}`);
      }
    }

    return parsedResponse as ContractSummary;
  } catch (error) {
    console.error('Error analyzing contract:', error);
    throw new Error(`Contract analysis failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};
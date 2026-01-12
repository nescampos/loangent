# Loangent

Loangent is a web application that helps users understand complex loan contracts by providing AI-powered summaries and explanations. The application allows users to upload loan agreements in PDF or Word format and receive a structured, easy-to-understand summary of key terms, risks, and conditions.

## Features

- **File Upload**: Supports PDF and Word document uploads (up to 10MB)
- **AI-Powered Analysis**: Uses OpenAI's GPT model to analyze loan agreements
- **Structured Summary**: Extracts and organizes key information including loan amount, interest rate, repayment terms, collateral, risks, and important clauses
- **User-Friendly Interface**: Clean, intuitive design with clear navigation
- **Two-Page Layout**: Landing page explaining the service and a dedicated analysis page
- **Responsive Design**: Works on desktop and mobile devices

## Technologies Used

- React 19.2.0
- TypeScript
- Vite
- OpenAI SDK
- pdf-parse
- mammoth (for Word documents)
- react-router-dom

## Prerequisites

- Node.js (version 18 or higher)
- npm or yarn
- OpenAI API key

## Installation

1. Clone the repository:

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your OpenAI API key:
   ```
   VITE_OPENAI_API_KEY=your_openai_api_key_here
   VITE_OPENAI_BASE_URL=https://api.openai.com/v1 or any other base URL
   VITE_OPENAI_MODEL=the_model_name
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:5173`

## Usage

1. Visit the landing page to learn about the service
2. Click the "Analyze Your Contract" button
3. Upload a loan agreement in PDF or Word format
4. Wait for the AI to analyze the document
5. Review the structured summary of key terms and conditions

## Project Structure

```
src/
├── components/           # React components
│   ├── LandingPage.tsx   # Landing page component
│   ├── ContractAnalyzer.tsx # Main analyzer component
│   ├── FileUpload.tsx    # File upload component
│   └── ContractSummaryDisplay.tsx # Summary display component
├── services/             # API and business logic
│   └── contractService.ts # OpenAI integration
├── utils/                # Utility functions
│   └── fileUtils.ts      # File processing utilities
├── types/                # TypeScript type definitions
│   └── contract.ts       # Contract summary types
├── App.tsx               # Main application component
└── App.css               # Global styles
```

## Environment Variables

- `VITE_OPENAI_API_KEY`: Your OpenAI API key (required)
- `VITE_OPENAI_BASE_URL`: OpenAI API base URL (defaults to https://api.openai.com/v1)
- `VITE_OPENAI_MODEL`: The model to use for analysis (required)

## API Integration

The application uses OpenAI's GPT model to analyze loan agreements. The analysis extracts key information including:

- Contract title and parties involved
- Loan amount and interest rate
- Repayment terms and schedule
- Collateral information
- Key risks and important clauses
- Penalties and early termination conditions
- Governing law and dispute resolution

## File Processing

The application supports both PDF and Word documents:

- PDF files are processed using the `pdf-parse` library
- Word documents (.docx) are processed using the `mammoth` library
- File size is limited to 10MB
- All file validation happens client-side

## Security

- API keys are stored in environment variables and never committed to the repository
- The `.env` file is included in `.gitignore`
- All file processing happens client-side for privacy


## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Disclaimer

This tool provides a summary based on AI analysis. Always consult with a legal professional before signing any contract.

import React, { useState, useRef, type ChangeEvent } from 'react';
import { extractTextFromPDF, extractTextFromDocx, validateFileType, validateFileSize } from '../utils/fileUtils';
import { analyzeContract } from '../services/contractService';
import { type ContractSummary } from '../types/contract';

interface FileUploadProps {
  onAnalysisComplete: (summary: ContractSummary) => void;
  onError: (message: string) => void;
  onLoadingChange: (loading: boolean) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onAnalysisComplete, onError, onLoadingChange }) => {
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const file = files[0]; // Take only the first file
    
    // Validate file type
    if (!validateFileType(file)) {
      onError('Invalid file type. Please upload a PDF or Word document.');
      return;
    }

    // Validate file size (max 10MB)
    if (!validateFileSize(file)) {
      onError('File too large. Please upload a file smaller than 10MB.');
      return;
    }

    try {
      onLoadingChange(true);
      
      let extractedText: string | undefined;
      
      // Extract text based on file type
      if (file.type === 'application/pdf') {
        const result = await extractTextFromPDF(file);
        if (!result.success) {
          throw new Error(result.error || 'Failed to extract PDF text');
        }
        extractedText = result.content;
      } else if (
        file.type === 'application/msword' || 
        file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      ) {
        const result = await extractTextFromDocx(file);
        if (!result.success) {
          throw new Error(result.error || 'Failed to extract Word document text');
        }
        extractedText = result.content;
      }

      if (!extractedText) {
        throw new Error('Could not extract text from the uploaded file');
      }

      // Analyze the contract
      const summary = await analyzeContract(extractedText);
      if (summary) {
        onAnalysisComplete(summary);
      } else {
        throw new Error('Contract analysis returned no results');
      }
    } catch (error) {
      console.error('Error processing file:', error);
      onError(error instanceof Error ? error.message : 'An error occurred while processing the file');
    } finally {
      onLoadingChange(false);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  const onButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="file-upload-container">
      <form 
        className={`upload-area ${dragActive ? 'drag-active' : ''}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input 
          ref={fileInputRef}
          type="file" 
          accept=".pdf,.doc,.docx" 
          onChange={handleChange} 
          className="file-input"
        />
        <div className="upload-content">
          <div className="upload-icon">📁</div>
          <p>Drag & drop your contract here, or click to browse</p>
          <p className="file-types">Supports PDF and Word documents (Max 10MB)</p>
          <button 
            type="button" 
            onClick={onButtonClick}
            className="browse-button"
          >
            Browse Files
          </button>
        </div>
      </form>
    </div>
  );
};

export default FileUpload;
import pdfParse from 'pdf-parse';
import * as mammoth from 'mammoth';

import { type FileUploadResult } from '../types/contract';

export const extractTextFromPDF = async (file: File): Promise<FileUploadResult> => {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const pdfData = await pdfParse(Buffer.from(arrayBuffer));
    return {
      success: true,
      content: pdfData.text
    };
  } catch (error) {
    console.error('Error extracting text from PDF:', error);
    return {
      success: false,
      error: 'Failed to extract text from PDF file'
    };
  }
};

export const extractTextFromDocx = async (file: File): Promise<FileUploadResult> => {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const result = await mammoth.extractRawText({ arrayBuffer });
    return {
      success: true,
      content: result.value
    };
  } catch (error) {
    console.error('Error extracting text from DOCX:', error);
    return {
      success: false,
      error: 'Failed to extract text from Word document'
    };
  }
};

export const validateFileType = (file: File): boolean => {
  const validTypes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ];
  
  return validTypes.includes(file.type);
};

export const validateFileSize = (file: File, maxSizeMB: number = 10): boolean => {
  return file.size <= maxSizeMB * 1024 * 1024; // Convert MB to bytes
};
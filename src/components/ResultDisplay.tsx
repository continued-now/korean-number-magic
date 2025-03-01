
import React, { useState, useEffect } from 'react';
import { 
  formatToKorean, 
  formatWithCommas, 
  formatToSinoKorean,
  formatToEnglish,
  formatToScientific
} from '../utils/formatNumber';
import { parseKoreanNumber } from '../utils/parseNumber';
import CopyButton from './CopyButton';

interface ResultDisplayProps {
  number: number | null;
  onNumberChange: (value: number | null) => void;
  className?: string;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ number, onNumberChange, className = '' }) => {
  const [koreanFormat, setKoreanFormat] = useState('');
  const [commaFormat, setCommaFormat] = useState('');
  const [sinoKoreanFormat, setSinoKoreanFormat] = useState('');
  const [englishFormat, setEnglishFormat] = useState('');
  const [scientificFormat, setScientificFormat] = useState('');
  
  // Update formatted values when number changes
  useEffect(() => {
    if (number !== null) {
      setKoreanFormat(formatToKorean(number));
      setCommaFormat(formatWithCommas(number));
      setSinoKoreanFormat(formatToSinoKorean(number));
      setEnglishFormat(formatToEnglish(number));
      setScientificFormat(formatToScientific(number));
    } else {
      setKoreanFormat('');
      setCommaFormat('');
      setSinoKoreanFormat('');
      setEnglishFormat('');
      setScientificFormat('');
    }
  }, [number]);

  // Handle Korean format change
  const handleKoreanChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setKoreanFormat(value);
    
    try {
      const parsed = parseKoreanNumber(value);
      if (parsed !== null) {
        onNumberChange(parsed);
      }
    } catch (e) {
      // If parsing fails, don't update the number
    }
  };

  // Handle comma format change
  const handleCommaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCommaFormat(value);
    
    // Remove commas and try to parse as number
    const cleanedValue = value.replace(/,/g, '');
    const parsed = Number(cleanedValue);
    if (!isNaN(parsed)) {
      onNumberChange(parsed);
    }
  };

  // Handle Sino-Korean format change
  const handleSinoKoreanChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSinoKoreanFormat(value);
    
    try {
      const parsed = parseKoreanNumber(value);
      if (parsed !== null) {
        onNumberChange(parsed);
      }
    } catch (e) {
      // If parsing fails, don't update the number
    }
  };

  // Handle English format change
  const handleEnglishChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEnglishFormat(value);
    
    // For simplicity, we'll just try to extract numbers from the English text
    const matches = value.match(/[\d.]+/g);
    if (matches && matches.length > 0) {
      const numberStr = matches.join('');
      const parsed = Number(numberStr);
      if (!isNaN(parsed)) {
        onNumberChange(parsed);
      }
    }
  };

  // Handle scientific format change
  const handleScientificChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setScientificFormat(value);
    
    // Try to convert from scientific notation
    try {
      // Convert superscript characters to regular exponent notation
      const normalized = value.replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹]/g, (match) => {
        const index = '⁰¹²³⁴⁵⁶⁷⁸⁹'.indexOf(match);
        return index.toString();
      });
      
      // Try to parse scientific notation
      const parts = normalized.split('×10');
      if (parts.length === 2) {
        const base = Number(parts[0]);
        const exponent = Number(parts[1]);
        if (!isNaN(base) && !isNaN(exponent)) {
          onNumberChange(base * Math.pow(10, exponent));
        }
      } else {
        // Try as regular number
        const parsed = Number(normalized);
        if (!isNaN(parsed)) {
          onNumberChange(parsed);
        }
      }
    } catch (e) {
      // If parsing fails, don't update the number
    }
  };
  
  if (number === null) {
    return (
      <div className={`rounded-xl p-6 bg-secondary/50 backdrop-blur-sm ${className}`}>
        <div className="h-[120px] flex flex-col items-center justify-center text-muted-foreground">
          <p className="text-lg">결과가 여기에 표시됩니다</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className={`rounded-xl p-6 bg-white/80 backdrop-blur-sm shadow-md animate-scale-in border border-border/30 ${className}`}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-muted-foreground">한국어 단위 표기</h3>
            <CopyButton text={koreanFormat} />
          </div>
          <div className="relative bg-secondary/70 hover:bg-green-100/70 backdrop-blur-sm rounded-lg p-3 min-h-12 transition-colors duration-200">
            <input
              type="text"
              value={koreanFormat}
              onChange={handleKoreanChange}
              className="w-full bg-transparent outline-none text-lg font-medium text-center"
            />
          </div>
        </div>
        
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-muted-foreground">쉼표 형식</h3>
            <CopyButton text={commaFormat} />
          </div>
          <div className="relative bg-secondary/70 hover:bg-green-100/70 backdrop-blur-sm rounded-lg p-3 min-h-12 transition-colors duration-200">
            <input
              type="text"
              value={commaFormat}
              onChange={handleCommaChange}
              className="w-full bg-transparent outline-none text-lg font-medium text-center"
            />
          </div>
        </div>
        
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-muted-foreground">한자어 독음</h3>
            <CopyButton text={sinoKoreanFormat} />
          </div>
          <div className="relative bg-secondary/70 hover:bg-green-100/70 backdrop-blur-sm rounded-lg p-3 min-h-12 transition-colors duration-200">
            <input
              type="text"
              value={sinoKoreanFormat}
              onChange={handleSinoKoreanChange}
              className="w-full bg-transparent outline-none text-lg font-medium text-center"
            />
          </div>
        </div>
        
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-muted-foreground">영어 표기</h3>
            <CopyButton text={englishFormat} />
          </div>
          <div className="relative bg-secondary/70 hover:bg-green-100/70 backdrop-blur-sm rounded-lg p-3 min-h-12 transition-colors duration-200">
            <input
              type="text"
              value={englishFormat}
              onChange={handleEnglishChange}
              className="w-full bg-transparent outline-none text-lg font-medium text-center"
            />
          </div>
        </div>
        
        <div className="space-y-1 md:col-span-2">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-muted-foreground">과학적 표기법</h3>
            <CopyButton text={scientificFormat} />
          </div>
          <div className="relative bg-secondary/70 hover:bg-green-100/70 backdrop-blur-sm rounded-lg p-3 min-h-12 transition-colors duration-200">
            <input
              type="text"
              value={scientificFormat}
              onChange={handleScientificChange}
              className="w-full bg-transparent outline-none text-lg font-medium text-center"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultDisplay;

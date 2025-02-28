
import React, { useState, useEffect } from 'react';
import { 
  formatToKorean, 
  formatWithCommas, 
  formatToSinoKorean,
  formatToEnglish,
  formatToScientific
} from '../utils/formatNumber';
import CopyButton from './CopyButton';

interface ResultDisplayProps {
  number: number | null;
  className?: string;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ number, className = '' }) => {
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
              onChange={(e) => setKoreanFormat(e.target.value)}
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
              onChange={(e) => setCommaFormat(e.target.value)}
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
              onChange={(e) => setSinoKoreanFormat(e.target.value)}
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
              onChange={(e) => setEnglishFormat(e.target.value)}
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
              value={scientificFormat.replace(/\^(\d+)/, (_, p1) => '⁰¹²³⁴⁵⁶⁷⁸⁹'.split('')[parseInt(p1)])}
              onChange={(e) => setScientificFormat(e.target.value)}
              className="w-full bg-transparent outline-none text-lg font-medium text-center"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultDisplay;

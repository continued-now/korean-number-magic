
import React from 'react';
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
  const koreanFormat = number !== null ? formatToKorean(number) : '';
  const commaFormat = number !== null ? formatWithCommas(number) : '';
  const sinoKoreanFormat = number !== null ? formatToSinoKorean(number) : '';
  const englishFormat = number !== null ? formatToEnglish(number) : '';
  const scientificFormat = number !== null ? formatToScientific(number) : '';
  
  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      // You could add a toast notification here
    } catch (err) {
      console.error('Failed to copy text: ', err);
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
          <button 
            onClick={() => handleCopy(koreanFormat)}
            className="w-full bg-secondary/70 hover:bg-green-100/70 backdrop-blur-sm rounded-lg p-3 min-h-12 flex items-center justify-center transition-colors duration-200"
          >
            <p className="text-lg font-medium text-center break-all">{koreanFormat}</p>
          </button>
        </div>
        
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-muted-foreground">쉼표 형식</h3>
            <CopyButton text={commaFormat} />
          </div>
          <button 
            onClick={() => handleCopy(commaFormat)}
            className="w-full bg-secondary/70 hover:bg-green-100/70 backdrop-blur-sm rounded-lg p-3 min-h-12 flex items-center justify-center transition-colors duration-200"
          >
            <p className="text-lg font-medium text-center break-all">{commaFormat}</p>
          </button>
        </div>
        
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-muted-foreground">한자어 독음</h3>
            <CopyButton text={sinoKoreanFormat} />
          </div>
          <button 
            onClick={() => handleCopy(sinoKoreanFormat)}
            className="w-full bg-secondary/70 hover:bg-green-100/70 backdrop-blur-sm rounded-lg p-3 min-h-12 flex items-center justify-center transition-colors duration-200"
          >
            <p className="text-lg font-medium text-center break-all">{sinoKoreanFormat}</p>
          </button>
        </div>
        
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-muted-foreground">영어 표기</h3>
            <CopyButton text={englishFormat} />
          </div>
          <button 
            onClick={() => handleCopy(englishFormat)}
            className="w-full bg-secondary/70 hover:bg-green-100/70 backdrop-blur-sm rounded-lg p-3 min-h-12 flex items-center justify-center transition-colors duration-200"
          >
            <p className="text-lg font-medium text-center break-all">{englishFormat}</p>
          </button>
        </div>
        
        <div className="space-y-1 md:col-span-2">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-muted-foreground">과학적 표기법</h3>
            <CopyButton text={scientificFormat} />
          </div>
          <button 
            onClick={() => handleCopy(scientificFormat)}
            className="w-full bg-secondary/70 hover:bg-green-100/70 backdrop-blur-sm rounded-lg p-3 min-h-12 flex items-center justify-center transition-colors duration-200"
          >
            <p className="text-lg font-medium text-center break-all">{scientificFormat.replace(/\^(\d+)/, (_, p1) => '⁰¹²³⁴⁵⁶⁷⁸⁹'.split('')[parseInt(p1)])}</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultDisplay;

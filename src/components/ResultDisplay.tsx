
import React from 'react';
import { formatToKorean, formatWithCommas } from '../utils/formatNumber';
import CopyButton from './CopyButton';

interface ResultDisplayProps {
  number: number | null;
  className?: string;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ number, className = '' }) => {
  const koreanFormat = number !== null ? formatToKorean(number) : '';
  const commaFormat = number !== null ? formatWithCommas(number) : '';
  
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
      <div className="space-y-6">
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-muted-foreground">한국어 단위 표기</h3>
            <CopyButton text={koreanFormat} />
          </div>
          <div className="bg-secondary/70 backdrop-blur-sm rounded-lg p-4 min-h-16 flex items-center justify-center">
            <p className="text-xl font-medium text-center break-all">{koreanFormat}</p>
          </div>
        </div>
        
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-muted-foreground">쉼표 형식</h3>
            <CopyButton text={commaFormat} />
          </div>
          <div className="bg-secondary/70 backdrop-blur-sm rounded-lg p-4 min-h-16 flex items-center justify-center">
            <p className="text-xl font-medium text-center break-all">{commaFormat}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultDisplay;

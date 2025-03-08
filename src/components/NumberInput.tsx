
import React, { useState, useEffect } from 'react';
import { isValidNumber } from '../utils/formatNumber';
import { parseKoreanNumber } from '../utils/parseNumber';
import Numpad from './Numpad';
import { useIsMobile } from '../hooks/use-mobile';

interface NumberInputProps {
  value: string;
  onChange: (value: string) => void;
  onNumberChange: (value: number | null) => void;
}

const NumberInput: React.FC<NumberInputProps> = ({ value, onChange, onNumberChange }) => {
  const [error, setError] = useState<string | null>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [showKeyboard, setShowKeyboard] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (value === '') {
      setError(null);
      onNumberChange(null);
      return;
    }

    // Remove commas for numeric validation
    const valueWithoutCommas = value.replace(/,/g, '');

    // Try to parse as a regular number first
    if (isValidNumber(valueWithoutCommas)) {
      const parsedValue = Number(valueWithoutCommas);
      if (isNaN(parsedValue)) {
        setError('유효한 숫자가 아닙니다');
        onNumberChange(null);
        return;
      }

      // Valid number
      setError(null);
      onNumberChange(parsedValue);
      return;
    }

    // If not a valid number format, try to parse Korean number words
    try {
      const parsedNumber = parseKoreanNumber(value);
      if (parsedNumber !== null) {
        setError(null);
        onNumberChange(parsedNumber);
        return;
      }
    } catch (e) {
      // Failed to parse as Korean number words
    }

    // If we get here, neither numeric nor word format worked
    setError('숫자 또는 한글 숫자 단어를 입력해주세요');
    onNumberChange(null);
  }, [value, onNumberChange]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const handleNumPress = (num: string) => {
    onChange(value + num);
  };

  const handleBackspace = () => {
    onChange(value.slice(0, -1));
  };

  const handleClear = () => {
    onChange('');
  };

  const toggleInputMethod = () => {
    setShowKeyboard(!showKeyboard);
  };

  return (
    <div className="space-y-2 w-full">
      <div 
        className={`relative rounded-xl overflow-hidden transition-all duration-300 ${
          isFocused 
            ? 'ring-2 ring-primary/50 shadow-lg' 
            : 'shadow'
        }`}
      >
        <input
          type="text"
          value={value}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="숫자 또는 '일만', '삼억' 등 한글로 입력하세요"
          className={`w-full px-4 py-3 bg-white/80 backdrop-blur-sm border border-border/50 outline-none text-lg ${
            error ? 'border-destructive/30 text-destructive' : ''
          }`}
          aria-invalid={!!error}
          aria-describedby={error ? "number-error" : undefined}
          readOnly={isMobile && !showKeyboard}
        />
        
        {isMobile && (
          <button 
            onClick={toggleInputMethod}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs bg-primary/10 text-primary px-2 py-1 rounded-full"
          >
            {showKeyboard ? '숫자패드' : '키보드'}
          </button>
        )}
      </div>
      
      {error && (
        <p 
          id="number-error" 
          className="text-sm text-destructive animate-fade-in ml-1"
        >
          {error}
        </p>
      )}

      {isMobile && !showKeyboard && (
        <Numpad 
          onNumPress={handleNumPress} 
          onBackspace={handleBackspace} 
          onClear={handleClear} 
        />
      )}
    </div>
  );
};

export default NumberInput;

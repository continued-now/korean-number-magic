
import React, { useState, useEffect } from 'react';
import { isValidNumber } from '../utils/formatNumber';

interface NumberInputProps {
  value: string;
  onChange: (value: string) => void;
  onNumberChange: (value: number | null) => void;
}

const NumberInput: React.FC<NumberInputProps> = ({ value, onChange, onNumberChange }) => {
  const [error, setError] = useState<string | null>(null);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (value === '') {
      setError(null);
      onNumberChange(null);
      return;
    }

    if (!isValidNumber(value)) {
      setError('숫자만 입력해주세요');
      onNumberChange(null);
      return;
    }

    const parsedValue = Number(value);
    if (isNaN(parsedValue)) {
      setError('유효한 숫자가 아닙니다');
      onNumberChange(null);
      return;
    }

    // Valid number
    setError(null);
    onNumberChange(parsedValue);
  }, [value, onNumberChange]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
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
          placeholder="숫자를 입력하세요"
          className={`w-full px-4 py-3 bg-white/80 backdrop-blur-sm border border-border/50 outline-none text-lg ${
            error ? 'border-destructive/30 text-destructive' : ''
          }`}
          aria-invalid={!!error}
          aria-describedby={error ? "number-error" : undefined}
        />
      </div>
      
      {error && (
        <p 
          id="number-error" 
          className="text-sm text-destructive animate-fade-in ml-1"
        >
          {error}
        </p>
      )}
    </div>
  );
};

export default NumberInput;

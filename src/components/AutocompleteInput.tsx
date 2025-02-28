
import React, { useState, useRef, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

export interface AutocompleteOption {
  id: string;
  name: string;
  description: string;
}

interface AutocompleteInputProps {
  options: AutocompleteOption[];
  onSelect: (option: AutocompleteOption | null) => void;
  placeholder?: string;
  className?: string;
}

const AutocompleteInput: React.FC<AutocompleteInputProps> = ({
  options,
  onSelect,
  placeholder = '검색어를 입력하세요',
  className = '',
}) => {
  const [inputValue, setInputValue] = useState('');
  const [filteredOptions, setFilteredOptions] = useState<AutocompleteOption[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<AutocompleteOption | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Filter options based on input with debounce
  useEffect(() => {
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    if (inputValue.trim() === '') {
      setFilteredOptions([]);
      setIsOpen(false);
      return;
    }

    const timeoutId = setTimeout(() => {
      const filtered = options.filter(option =>
        option.name.toLowerCase().includes(inputValue.toLowerCase())
      );
      setFilteredOptions(filtered);
      setIsOpen(filtered.length > 0);
    }, 400);

    setDebounceTimeout(timeoutId as unknown as NodeJS.Timeout);

    return () => {
      if (debounceTimeout) {
        clearTimeout(debounceTimeout);
      }
    };
  }, [inputValue, options, debounceTimeout]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Validate input when it changes
  useEffect(() => {
    if (!inputValue.trim() && !selectedOption) {
      setError('필드를 비워둘 수 없습니다');
    } else if (
      inputValue.trim() &&
      !selectedOption &&
      !options.some(option => option.name.toLowerCase() === inputValue.toLowerCase())
    ) {
      setError('목록에서 옵션을 선택해주세요');
    } else {
      setError(null);
    }
  }, [inputValue, selectedOption, options]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    
    if (selectedOption && value !== selectedOption.name) {
      setSelectedOption(null);
      onSelect(null);
    }
  };

  const handleOptionSelect = (option: AutocompleteOption) => {
    setSelectedOption(option);
    setInputValue(option.name);
    setIsOpen(false);
    setError(null);
    onSelect(option);
    
    toast({
      title: "옵션 선택됨",
      description: `${option.name}이(가) 선택되었습니다.`,
    });
  };

  const handleClear = () => {
    setInputValue('');
    setSelectedOption(null);
    setIsOpen(false);
    onSelect(null);
    inputRef.current?.focus();
  };

  return (
    <div className={`relative w-full ${className}`}>
      <div 
        className={`relative rounded-xl overflow-hidden transition-all duration-300 ${
          error 
            ? 'ring-2 ring-destructive/50 shadow' 
            : 'shadow'
        }`}
      >
        <div className="flex items-center">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onFocus={() => {
              if (inputValue.trim() && filteredOptions.length > 0) {
                setIsOpen(true);
              }
            }}
            placeholder={placeholder}
            className={`w-full px-4 py-3 bg-white/80 backdrop-blur-sm border border-border/50 outline-none text-lg ${
              error ? 'border-destructive/30 text-destructive' : ''
            }`}
            aria-invalid={!!error}
            aria-describedby={error ? "autocomplete-error" : undefined}
          />
          {(inputValue || selectedOption) && (
            <button
              onClick={handleClear}
              className="absolute right-3 flex items-center justify-center w-6 h-6 rounded-full bg-muted hover:bg-secondary/90 text-muted-foreground"
              aria-label="Clear input"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          )}
        </div>
      </div>
      
      {error && (
        <p 
          id="autocomplete-error" 
          className="text-sm text-destructive animate-fade-in mt-1 ml-1"
        >
          {error}
        </p>
      )}
      
      {isOpen && (
        <div 
          ref={dropdownRef}
          className="absolute z-10 w-full mt-1 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg border border-border/30 max-h-60 overflow-y-auto"
        >
          {filteredOptions.map(option => (
            <div
              key={option.id}
              onClick={() => handleOptionSelect(option)}
              className="p-3 hover:bg-secondary/70 cursor-pointer transition-colors duration-200"
            >
              <div className="font-medium">{option.name}</div>
              {option.description && (
                <div className="text-sm text-muted-foreground mt-1">{option.description}</div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AutocompleteInput;

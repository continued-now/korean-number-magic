
import React, { useState } from 'react';
import NumberInput from '../components/NumberInput';
import ResultDisplay from '../components/ResultDisplay';

const Index = () => {
  const [inputValue, setInputValue] = useState('');
  const [number, setNumber] = useState<number | null>(null);
  
  const handleInputChange = (value: string) => {
    setInputValue(value);
  };
  
  const handleNumberChange = (value: number | null) => {
    setNumber(value);
    
    // Only update the input field when a number is entered directly in the input field
    // Don't update when changes come from the result fields
    if (value !== null && document.activeElement?.tagName !== 'INPUT') {
      setInputValue(value.toString());
    }
  };
  
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-b from-background to-secondary/30 px-4 py-12">
      <div className="w-full max-w-4xl mx-auto">
        <div className="space-y-8 animate-fade-in">
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="inline-flex items-center justify-center px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium mb-2 animate-pulse-soft">
              한국어 숫자 변환기
            </div>
            <h1 className="text-3xl font-light tracking-tight">
              Korean Number Formatter
            </h1>
            <p className="text-muted-foreground mt-2 max-w-sm mx-auto">
              숫자를 입력하면 한국어 단위로 변환해 드립니다.
            </p>
          </div>
          
          {/* Input Section */}
          <div className="space-y-6 animate-slide-up" style={{ animationDelay: "0.1s" }}>
            <NumberInput 
              value={inputValue}
              onChange={handleInputChange}
              onNumberChange={handleNumberChange}
            />
            
            <div className="pt-2">
              <ResultDisplay 
                number={number} 
                onNumberChange={handleNumberChange}
                className="transition-all duration-500"
              />
            </div>
          </div>
          
          {/* Examples */}
          <div className="pt-6 space-y-3 animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <h3 className="text-sm font-medium text-center text-muted-foreground">예시</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
              <div className="bg-white/60 backdrop-blur-sm rounded-lg p-3 border border-border/30">
                <div className="text-muted-foreground">10,000</div>
                <div className="font-medium">1만</div>
              </div>
              <div className="bg-white/60 backdrop-blur-sm rounded-lg p-3 border border-border/30">
                <div className="text-muted-foreground">100,000,000</div>
                <div className="font-medium">1억</div>
              </div>
              <div className="bg-white/60 backdrop-blur-sm rounded-lg p-3 border border-border/30">
                <div className="text-muted-foreground">1,000,000,000,000</div>
                <div className="font-medium">1조</div>
              </div>
              <div className="bg-white/60 backdrop-blur-sm rounded-lg p-3 border border-border/30">
                <div className="text-muted-foreground">1,234,567,890,000</div>
                <div className="font-medium">1조 2345억 6789만</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="mt-16 text-xs text-muted-foreground animate-fade-in" style={{ animationDelay: "0.3s" }}>
        <p>Korean Number Magic &copy; {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
};

export default Index;

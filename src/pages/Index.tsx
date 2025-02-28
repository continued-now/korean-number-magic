
import React, { useState } from 'react';
import NumberInput from '../components/NumberInput';
import ResultDisplay from '../components/ResultDisplay';
import AutocompleteInput, { AutocompleteOption } from '../components/AutocompleteInput';

const Index = () => {
  const [inputValue, setInputValue] = useState('');
  const [number, setNumber] = useState<number | null>(null);
  const [selectedOption, setSelectedOption] = useState<AutocompleteOption | null>(null);
  
  const handleInputChange = (value: string) => {
    setInputValue(value);
  };
  
  const handleNumberChange = (value: number | null) => {
    setNumber(value);
  };

  const handleOptionSelect = (option: AutocompleteOption | null) => {
    setSelectedOption(option);
  };
  
  // Sample autocomplete options
  const autocompleteOptions: AutocompleteOption[] = [
    { id: '1', name: '서울', description: '대한민국의 수도' },
    { id: '2', name: '부산', description: '제2의 도시, 항구도시' },
    { id: '3', name: '인천', description: '국제공항이 있는 도시' },
    { id: '4', name: '대구', description: '경상북도의 중심 도시' },
    { id: '5', name: '광주', description: '전라남도의 중심 도시' },
    { id: '6', name: '대전', description: '충청남도의 중심 도시' },
    { id: '7', name: '울산', description: '공업도시' },
    { id: '8', name: '세종', description: '행정중심복합도시' },
    { id: '9', name: '경기도', description: '서울을 둘러싼 지역' },
    { id: '10', name: '강원도', description: '산과 바다가 있는 지역' },
  ];
  
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
                className="transition-all duration-500"
              />
            </div>
          </div>
          
          {/* Autocomplete Input */}
          <div className="pt-8 pb-2 space-y-4 animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <div className="text-center space-y-2">
              <h2 className="text-xl font-light tracking-tight">
                도시 검색
              </h2>
              <p className="text-muted-foreground text-sm max-w-sm mx-auto">
                한국의 도시를 검색해보세요
              </p>
            </div>
            
            <div className="max-w-md mx-auto">
              <AutocompleteInput 
                options={autocompleteOptions}
                onSelect={handleOptionSelect}
                placeholder="도시 이름을 입력하세요"
              />
              
              {selectedOption && (
                <div className="mt-4 p-4 bg-white/80 backdrop-blur-sm rounded-lg border border-border/30 shadow-md">
                  <h3 className="font-medium text-primary">선택된 도시:</h3>
                  <div className="mt-2">
                    <p className="text-lg font-medium">{selectedOption.name}</p>
                    <p className="text-muted-foreground">{selectedOption.description}</p>
                  </div>
                </div>
              )}
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

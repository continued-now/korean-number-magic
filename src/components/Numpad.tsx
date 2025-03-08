
import React from 'react';

interface NumpadProps {
  onNumPress: (num: string) => void;
  onBackspace: () => void;
  onClear: () => void;
}

const Numpad: React.FC<NumpadProps> = ({ onNumPress, onBackspace, onClear }) => {
  const buttons = [
    '7', '8', '9',
    '4', '5', '6',
    '1', '2', '3',
    '0', '.', '만',
    '억', '조', '천'
  ];

  return (
    <div className="w-full bg-white/90 backdrop-blur-sm rounded-xl shadow-md border border-border/30 p-2 animate-slide-up">
      <div className="grid grid-cols-3 gap-2">
        {buttons.map((btn) => (
          <button
            key={btn}
            onClick={() => onNumPress(btn)}
            className="bg-secondary/80 hover:bg-primary/10 text-foreground rounded-lg p-3 text-lg font-medium transition-colors duration-200"
          >
            {btn}
          </button>
        ))}
        <button
          onClick={onBackspace}
          className="bg-secondary/80 hover:bg-primary/10 text-foreground rounded-lg p-3 text-lg font-medium transition-colors duration-200 col-span-2"
        >
          ← 지우기
        </button>
        <button
          onClick={onClear}
          className="bg-secondary/80 hover:bg-primary/10 text-foreground rounded-lg p-3 text-lg font-medium transition-colors duration-200"
        >
          초기화
        </button>
      </div>
    </div>
  );
};

export default Numpad;


import React, { useState } from 'react';

interface CopyButtonProps {
  text: string;
}

const CopyButton: React.FC<CopyButtonProps> = ({ text }) => {
  const [copied, setCopied] = useState(false);
  
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      
      // Reset the copied state after 2 seconds
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };
  
  return (
    <button
      onClick={handleCopy}
      className="text-xs px-2 py-1 rounded-md transition-all duration-300 hover:bg-secondary/80 text-muted-foreground hover:text-foreground focus:outline-none focus:ring-1 focus:ring-primary/30"
      aria-label={copied ? "Copied" : "Copy to clipboard"}
    >
      {copied ? "복사됨" : "복사"}
    </button>
  );
};

export default CopyButton;

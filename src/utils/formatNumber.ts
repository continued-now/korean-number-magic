
/**
 * Formats a number into Korean number system
 * @param num The number to format
 * @returns The formatted string in Korean number system
 */
export const formatToKorean = (num: number): string => {
  if (isNaN(num) || !isFinite(num)) return '입력 오류';
  
  if (num === 0) return '0';
  
  const units = ['', '만', '억', '조', '경'];
  const unitSize = 10000;
  let result = '';
  let isNegative = false;
  
  // Handle negative numbers
  if (num < 0) {
    isNegative = true;
    num = Math.abs(num);
  }
  
  let unitIndex = 0;
  while (num > 0) {
    const segment = num % unitSize;
    
    if (segment > 0) {
      // Only add unit if segment is not zero
      result = `${segment} ${units[unitIndex]}${result ? ' ' + result : ''}`;
    }
    
    num = Math.floor(num / unitSize);
    unitIndex++;
  }
  
  return (isNegative ? '-' : '') + result.trim();
};

/**
 * Formats a number with commas for readability
 * @param num The number to format
 * @returns The formatted string with commas
 */
export const formatWithCommas = (num: number): string => {
  if (isNaN(num) || !isFinite(num)) return '';
  
  // Format with commas (e.g., 1,234,567)
  return num.toLocaleString('en-US');
};

/**
 * Converts a number to Sino-Korean pronunciation
 * @param num The number to convert
 * @returns The Sino-Korean pronunciation
 */
export const formatToSinoKorean = (num: number): string => {
  if (isNaN(num) || !isFinite(num)) return '입력 오류';
  
  if (num === 0) return '영';
  
  const digits = ['영', '일', '이', '삼', '사', '오', '육', '칠', '팔', '구'];
  const places = ['', '십', '백', '천'];
  const units = ['', '만', '억', '조', '경'];
  const unitSize = 10000;
  
  let result = '';
  let isNegative = false;
  
  // Handle negative numbers
  if (num < 0) {
    isNegative = true;
    num = Math.abs(num);
  }
  
  let unitIndex = 0;
  while (num > 0) {
    let segment = num % unitSize;
    let segmentResult = '';
    
    if (segment > 0) {
      let placeIndex = 0;
      while (segment > 0) {
        const digit = segment % 10;
        
        // Only add non-zero digits or digits at specific places
        if (digit !== 0) {
          // Only show '일' for tens, hundreds, etc. if it's the only digit
          const digitText = (digit === 1 && placeIndex > 0) ? '' : digits[digit];
          segmentResult = digitText + places[placeIndex] + segmentResult;
        }
        
        segment = Math.floor(segment / 10);
        placeIndex++;
      }
      
      // Add unit name
      result = segmentResult + units[unitIndex] + (result ? ' ' + result : '');
    }
    
    num = Math.floor(num / unitSize);
    unitIndex++;
  }
  
  return (isNegative ? '마이너스 ' : '') + result.trim();
};

/**
 * Converts a number to an English equivalent
 * @param num The number to convert
 * @returns The English equivalent
 */
export const formatToEnglish = (num: number): string => {
  if (isNaN(num) || !isFinite(num)) return 'Error';
  
  if (num === 0) return '0';
  
  const isNegative = num < 0;
  num = Math.abs(num);
  
  // English number equivalents (approximations)
  if (num >= 1e15) return `${(isNegative ? '-' : '')}${(num / 1e15).toFixed(3)} Quadrillion`;
  if (num >= 1e12) return `${(isNegative ? '-' : '')}${(num / 1e12).toFixed(3)} Trillion`;
  if (num >= 1e9) return `${(isNegative ? '-' : '')}${(num / 1e9).toFixed(3)} Billion`;
  if (num >= 1e6) return `${(isNegative ? '-' : '')}${(num / 1e6).toFixed(3)} Million`;
  if (num >= 1e3) return `${(isNegative ? '-' : '')}${(num / 1e3).toFixed(3)} Thousand`;
  
  return (isNegative ? '-' : '') + num.toString();
};

/**
 * Formats a number in scientific notation
 * @param num The number to format
 * @returns The scientific notation
 */
export const formatToScientific = (num: number): string => {
  if (isNaN(num) || !isFinite(num)) return '';
  
  if (num === 0) return '0';
  
  // Format in scientific notation
  const scientific = num.toExponential(3);
  
  // Replace e+ with × 10^ for better readability
  return scientific.replace(/e\+?/, ' × 10^');
};

/**
 * Validates if a string can be converted to a number
 * @param value The string to validate
 * @returns true if valid, false otherwise
 */
export const isValidNumber = (value: string): boolean => {
  // Allow empty strings
  if (value === '') return true;
  
  // Check for valid number pattern (allow decimal and negative numbers)
  const numRegex = /^-?[0-9]*\.?[0-9]*$/;
  return numRegex.test(value);
};

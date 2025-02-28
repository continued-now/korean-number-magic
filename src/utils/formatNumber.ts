
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

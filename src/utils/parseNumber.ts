
/**
 * Parse Korean number words into numeric values
 * @param text The Korean text to parse
 * @returns The parsed number or null if parsing failed
 */
export const parseKoreanNumber = (text: string): number | null => {
  // Remove all spaces
  text = text.replace(/\s+/g, '');
  
  if (!text) return null;
  
  // Define Korean number words and their values
  const koreanDigits: Record<string, number> = {
    '영': 0, '공': 0, '빵': 0,
    '일': 1, '하나': 1, '한': 1, '원': 1,
    '이': 2, '둘': 2, '두': 2,
    '삼': 3, '셋': 3, '세': 3,
    '사': 4, '넷': 4, '네': 4,
    '오': 5, '다섯': 5,
    '육': 6, '여섯': 6,
    '칠': 7, '일곱': 7,
    '팔': 8, '여덟': 8,
    '구': 9, '아홉': 9
  };
  
  const koreanUnits: Record<string, number> = {
    '십': 10,
    '백': 100,
    '천': 1000,
    '만': 10000,
    '억': 100000000,
    '조': 1000000000000,
    '경': 10000000000000000
  };
  
  let result = 0;
  let currentNumber = 0;
  let temp = 0;
  let digitFound = false;
  
  for (let i = 0; i < text.length; i++) {
    const char = text.charAt(i);
    
    // Check if it's a digit
    if (koreanDigits[char] !== undefined) {
      currentNumber = koreanDigits[char];
      digitFound = true;
      continue;
    }
    
    // Check for units
    let unitFound = false;
    for (const unit in koreanUnits) {
      if (text.substring(i).startsWith(unit)) {
        const unitValue = koreanUnits[unit];
        
        // If no digit was specified before the unit, assume 1
        if (!digitFound) {
          currentNumber = 1;
        }
        
        if (unitValue >= 10000) {
          // For large units (만, 억, 조, 경)
          // First add the current temp value to the result
          temp += currentNumber;
          // Then multiply by the unit and add to the result
          result += temp * unitValue;
          // Reset temp and currentNumber for next calculation
          temp = 0;
          currentNumber = 0;
        } else {
          // For small units (십, 백, 천)
          // Add to the temp value (e.g., 삼천 = 3 * 1000 = 3000)
          temp += currentNumber * unitValue;
          currentNumber = 0;
        }
        
        digitFound = false;
        i += unit.length - 1; // Skip the unit characters
        unitFound = true;
        break;
      }
    }
    
    // If no unit was found and there's a digit, add it to temp
    if (!unitFound && digitFound) {
      temp += currentNumber;
      currentNumber = 0;
      digitFound = false;
    }
  }
  
  // Add any remaining values
  result += temp + currentNumber;
  
  return result > 0 ? result : null;
};

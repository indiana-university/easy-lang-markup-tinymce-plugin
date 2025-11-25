/**
 * @jest-environment node
 */

import { readFileSync, existsSync, readdirSync } from 'fs';
import { join, basename } from 'path';

// Valid language codes based on BCP 47 / RFC 5646
const VALID_LANG_CODES = new Set<string>([
  'af', 'ak', 'ar', 'az', 'bg', 'bho', 'bm', 'bn', 'bo', 'bs', 'ca', 'cs', 'cu', 'cy',
  'da', 'de', 'el', 'en', 'es', 'et', 'eu', 'fa', 'fi', 'fr', 'ga', 'gl', 'he', 'hi', 
  'hr', 'ht', 'hu', 'hy', 'id', 'is', 'it', 'ja', 'kk', 'kn', 'ko', 'la', 'lkt', 'mi',
  'mn', 'mr', 'ms', 'nb', 'nl', 'nn', 'pl', 'ps', 'pt', 'qu', 'ro', 'ru', 'sa', 'se',
  'sk', 'sl', 'sma', 'sme', 'smj', 'sr', 'sv', 'sw', 'ta', 'te', 'tg', 'th', 'tr', 
  'ug', 'uk', 'ur', 'uz', 'vi', 'wo', 'yi', 'yo', 'yua', 'zh', 'zu'
 ]);

const VALID_REGIONS = new Set<string>([
  'AD', 'AE', 'AF', 'AG', 'AI', 'AL', 'AM', 'AO', 'AQ', 'AR', 'AS', 'AT', 'AU', 'AW', 'AX', 'AZ',
  'BA', 'BB', 'BD', 'BE', 'BF', 'BG', 'BH', 'BI', 'BJ', 'BL', 'BM', 'BN', 'BO', 'BQ', 'BR', 'BS',
  'BT', 'BV', 'BW', 'BY', 'BZ', 'CA', 'CC', 'CD', 'CF', 'CG', 'CH', 'CI', 'CK', 'CL', 'CM', 'CN',
  'CO', 'CR', 'CU', 'CV', 'CW', 'CX', 'CY', 'CZ', 'DE', 'DJ', 'DK', 'DM', 'DO', 'DZ', 'EC', 'EE',
  'EG', 'EH', 'ER', 'ES', 'ET', 'FI', 'FJ', 'FK', 'FM', 'FO', 'FR', 'GA', 'GB', 'GD', 'GE', 'GF',
  'GG', 'GH', 'GI', 'GL', 'GM', 'GN', 'GP', 'GQ', 'GR', 'GS', 'GT', 'GU', 'GW', 'GY', 'HK', 'HM',
  'HN', 'HR', 'HT', 'HU', 'ID', 'IE', 'IL', 'IM', 'IN', 'IO', 'IQ', 'IR', 'IS', 'IT', 'JE', 'JM',
  'JO', 'JP', 'KE', 'KG', 'KH', 'KI', 'KM', 'KN', 'KP', 'KR', 'KW', 'KY', 'KZ', 'LA', 'LB', 'LC',
  'LI', 'LK', 'LR', 'LS', 'LT', 'LU', 'LV', 'LY', 'MA', 'MC', 'MD', 'ME', 'MF', 'MG', 'MH', 'MK',
  'ML', 'MM', 'MN', 'MO', 'MP', 'MQ', 'MR', 'MS', 'MT', 'MU', 'MV', 'MW', 'MX', 'MY', 'MZ', 'NA',
  'NC', 'NE', 'NF', 'NG', 'NI', 'NL', 'NO', 'NP', 'NR', 'NU', 'NZ', 'OM', 'PA', 'PE', 'PF', 'PG',
  'PH', 'PK', 'PL', 'PM', 'PN', 'PR', 'PS', 'PT', 'PW', 'PY', 'QA', 'RE', 'RO', 'RS', 'RU', 'RW',
  'SA', 'SB', 'SC', 'SD', 'SE', 'SG', 'SH', 'SI', 'SJ', 'SK', 'SL', 'SM', 'SN', 'SO', 'SR', 'SS',
  'ST', 'SV', 'SX', 'SY', 'SZ', 'TC', 'TD', 'TF', 'TG', 'TH', 'TJ', 'TK', 'TL', 'TM', 'TN', 'TO',
  'TR', 'TT', 'TV', 'TW', 'TZ', 'UA', 'UG', 'UM', 'US', 'UY', 'UZ', 'VA', 'VC', 'VE', 'VG', 'VI',
  'VN', 'VU', 'WF', 'WS', 'YE', 'YT', 'ZA', 'ZM', 'ZW'
]);

const VALID_SCRIPTS = new Set<string>([
  'Hans', 'Hant', 'Arab', 'Armn', 'Beng', 'Bopo', 'Brai', 'Cyrl', 'Deva', 'Ethi', 'Geor',
  'Grek', 'Gujr', 'Guru', 'Hang', 'Hani', 'Hebr', 'Hira', 'Jpan', 'Kana', 'Khmr', 'Knda',
  'Kore', 'Laoo', 'Latn', 'Mlym', 'Mong', 'Mymr', 'Orya', 'Sinh', 'Taml', 'Telu', 'Thaa',
  'Thai', 'Tibt', 'Yiii'
]);

const LANGS_FOLDER = join(__dirname, '../src/langs');

interface ParsedLocalizationFile {
  fileName: string;
  filePath: string;
  declaredLangCode: string;
  keys: Set<string>;
  content: string;
}

interface MissingKeysReport {
  fileName: string;
  missingKeys: string[];
}

interface FileStatistics {
  totalFiles: number;
  parsedFiles: number;
  wellFormedFiles: number;
  uniqueKeys: number;
  keyCountRange: {
    min: number;
    max: number;
    average: number;
  };
  uniqueLanguages: string[];
}

let localizationFiles: string[];
let parsedFiles: ParsedLocalizationFile[];
let wellFormedFiles: ParsedLocalizationFile[];
let allUniqueKeys: Set<string>;
let statistics: FileStatistics;

function isNotBlank(value: any): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

function isValidLanguageCode(code: string): boolean {
  // Convert underscores to hyphens for validation
  if(!isNotBlank(code)) return false;
  if(code.includes('-')) return false;

  const normalizedCode = code.replace(/_/g, '-');
  const parts = normalizedCode.split('-');
  
  if (parts.length === 0) return false;
  
  // First part must be a valid language
  const language = parts[0].toLowerCase();
  if (!VALID_LANG_CODES.has(language)) return false;
  
  // Check remaining parts
  for (let i = 1; i < parts.length; i++) {
    const part = parts[i];
    
    // Script codes are 4 letters, title case
    if (i==1 && part.length === 4 && /^[A-Z][a-z]{3}$/.test(part)) {
      if (!VALID_SCRIPTS.has(part)) return false;
      continue;
    }
    
    // Region codes are 2 uppercase letters or 3 digits
    if ((part.length === 2 && /^[A-Z]{2}$/.test(part)) || 
        (part.length === 3 && /^[0-9]{3}$/.test(part))) {
      if (part.length === 2 && !VALID_REGIONS.has(part)) return false;
      continue;
    }
    
    /*
    // Variant codes are 5-8 alphanumeric characters or 4 characters starting with digit
    if ((part.length >= 5 && part.length <= 8 && /^[A-Za-z0-9]+$/.test(part)) ||
        (part.length === 4 && /^[0-9][A-Za-z0-9]{3}$/.test(part))) {
      continue;
    }
    
    */

    // Private use subtags start with 'x-'
    if (part=='x') {
      return true;
    }
    
    // If we get here, the part is invalid
    return false;
  }
  
  return true;
}

function parseLocalizationFile(filePath: string): ParsedLocalizationFile | null {
  const content = readFileSync(filePath, 'utf8');
  const fileName = basename(filePath);
  
  // Extract the first parameter (language code)
  const match = content.match(/tinymce\.addI18n\s*\(\s*['"]([^'"]+)['"]/);
  if (!match) {
    return null;
  }
  
  const declaredLangCode = match[1];
  
  // Extract translation keys
  const keys = new Set<string>();
  const keyMatches = content.matchAll(/"([^"]+)":\s*['"][^'"]*['"]/g);
  for (const keyMatch of keyMatches) {
    keys.add(keyMatch[1]);
  }
  
  return {
    fileName,
    filePath,
    declaredLangCode,
    keys,
    content
  };
}

function getAllLocalizationFiles(): string[] {
  if (!existsSync(LANGS_FOLDER)) {
    console.log(`LANGS_FOLDER: ${LANGS_FOLDER} does not exist.`);
    return [];
  }
  
  return readdirSync(LANGS_FOLDER)
    .filter((file: string) => file.endsWith('.js'))
    .map((file: string) => join(LANGS_FOLDER, file));
}

function calculateStatistics(
  localizationFiles: string[],
  parsedFiles: ParsedLocalizationFile[],
  wellFormedFiles: ParsedLocalizationFile[],
  allUniqueKeys: Set<string>
): FileStatistics {
  const keyCounts = wellFormedFiles.map(f => f.keys.size);
  const minKeys = keyCounts.length > 0 ? Math.min(...keyCounts) : 0;
  const maxKeys = keyCounts.length > 0 ? Math.max(...keyCounts) : 0;
  const avgKeys = keyCounts.length > 0 ? Math.round(keyCounts.reduce((a, b) => a + b, 0) / keyCounts.length) : 0;
  
  const uniqueLangCodes = new Set(wellFormedFiles.map(f => f.declaredLangCode.replace(/_/g, '-')));
  
  return {
    totalFiles: localizationFiles.length,
    parsedFiles: parsedFiles.length,
    wellFormedFiles: wellFormedFiles.length,
    uniqueKeys: allUniqueKeys.size,
    keyCountRange: {
      min: minKeys,
      max: maxKeys,
      average: avgKeys
    },
    uniqueLanguages: Array.from(uniqueLangCodes).sort()
  };
}

  localizationFiles = getAllLocalizationFiles();
  parsedFiles = localizationFiles
    .map(parseLocalizationFile)
    .filter((file): file is ParsedLocalizationFile => file !== null);
  
  wellFormedFiles = parsedFiles.filter(file => {
    // Basic validation for well-formed files
    return file.content.includes('tinymce.addI18n(') &&
           !file.declaredLangCode.includes('-') &&
           isValidLanguageCode(file.declaredLangCode);
  });

  // Collect all unique keys
  allUniqueKeys = new Set<string>();
  wellFormedFiles.forEach(file => {
    file.keys.forEach(key => allUniqueKeys.add(key));
  });

  statistics = calculateStatistics(localizationFiles, parsedFiles, wellFormedFiles, allUniqueKeys);

describe('Localization Files', () => {

  test('should find localization files in ../src/langs/', () => {
    expect(localizationFiles.length).toBeGreaterThan(0);
  });

  describe('Individual File Validation', () => {
    test.each(localizationFiles)('file %s should contain tinymce.addI18n(', (filePath: string) => {
      const content = readFileSync(filePath, 'utf8');
      expect(content).toMatch(/tinymce\.addI18n\s*\(/);
    });

    test.each(parsedFiles)('file $fileName should use underscores in language code (TinyMCE requirement)', (file: ParsedLocalizationFile) => {
      expect(file.declaredLangCode).not.toMatch(/-/);
    });

    test.each(parsedFiles)('file $fileName should have valid language code', (file: ParsedLocalizationFile) => {
      expect(isValidLanguageCode(file.declaredLangCode)).toBe(true);
    });

    test.each(parsedFiles)('file $fileName should have filename matching declared language code', (file: ParsedLocalizationFile) => {
      const expectedFileName = `${file.declaredLangCode}.js`;
      expect(file.fileName).toBe(expectedFileName);
    });

    test.each(parsedFiles)('file $fileName should have valid JSON structure', (file: ParsedLocalizationFile) => {
      const objectMatch = file.content.match(/tinymce\.addI18n\s*\(\s*['"][^'"]+['"],\s*(\{[\s\S]*\})\s*\)/);
      expect(objectMatch).toBeTruthy();
      
      expect(() => {
        JSON.parse(objectMatch![1]);
      }).not.toThrow();
    });

    test.each(parsedFiles)('file $fileName should not have duplicate keys', (file: ParsedLocalizationFile) => {
      const keyArray = Array.from(file.keys);
      const uniqueKeys = new Set(keyArray);
      expect(keyArray.length).toBe(uniqueKeys.size);
    });

    test.each(parsedFiles)('file $fileName should have reasonable number of keys', (file: ParsedLocalizationFile) => {
      expect(file.keys.size).toBeGreaterThanOrEqual(1);
      expect(file.keys.size).toBeLessThanOrEqual(1000);
    });
  });

  describe('Cross-File Consistency', () => {
    test('should have at least one well-formed file for cross-file analysis', () => {
      expect(wellFormedFiles.length).toBeGreaterThan(0);
    });

    test('all well-formed files should have the same translation keys', () => {
      if (wellFormedFiles.length < 2) {
        // Skip this test if we don't have enough files to compare
        return;
      }

      const missingKeysReport: MissingKeysReport[] = [];
      
      wellFormedFiles.forEach(file => {
        const missingKeys: string[] = [];
        allUniqueKeys.forEach(key => {
          if (!file.keys.has(key)) {
            missingKeys.push(key);
          }
        });
        
        if (missingKeys.length > 0) {
          missingKeysReport.push({
            fileName: file.fileName,
            missingKeys: missingKeys.sort()
          });
        }
      });

      if (missingKeysReport.length > 0) {
        const errorMessage = missingKeysReport
          .map(report => 
            `${report.fileName} is missing ${report.missingKeys.length} keys: ${report.missingKeys.join(', ')}`
          )
          .join('\n');
        
        expect(`Translation key inconsistencies found:\n${errorMessage}`).toBe('No inconsistencies should exist');
      }
    });

    test('should have consistent key counts across files', () => {
      if (wellFormedFiles.length < 2) return;
      
      const { min, max } = statistics.keyCountRange;
      const variance = max - min;
      
      // Allow some variance but not too much (max 10% difference)
      expect(variance).toBeLessThanOrEqual(0);
    });
  });

  describe('File Statistics', () => {
    test('should provide useful statistics', () => {
      console.log('\n📊 Localization File Statistics:');
      console.log(`Total .js files found: ${statistics.totalFiles}`);
      console.log(`Successfully parsed files: ${statistics.parsedFiles}`);
      console.log(`Well-formed files: ${statistics.wellFormedFiles}`);
      console.log(`Total unique translation keys: ${statistics.uniqueKeys}`);
      
      if (statistics.wellFormedFiles > 0) {
        const { min, max, average } = statistics.keyCountRange;
        console.log(`Key count range: ${min} - ${max} (average: ${average})`);
        console.log(`Unique language codes: ${statistics.uniqueLanguages.length}`);
        console.log(`Languages: ${statistics.uniqueLanguages.join(', ').replace(/-/g,'_')}`);
      }
      
      // Always pass this test - it's just for reporting
      expect(true).toBe(true);
    });

  });

  describe('Language Code Validation', () => {
    const testCases: Array<[string, boolean]> = [
      ['en', true],
      ['en_US', true],
      ['zh_Hans', true],
      ['zh_Hant', true],
      ['en-US', false], // Should be false for TinyMCE (uses underscores)
      ['invalid', false],
      ['en_INVALID', false],
    ];

    test.each(testCases)('isValidLanguageCode("%s") should return %s', (code: string, expected: boolean) => {
      expect(isValidLanguageCode(code)).toBe(expected);
    });
  });
});
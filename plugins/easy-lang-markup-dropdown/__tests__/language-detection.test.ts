import { LanguageSelect } from '../dist/plugin_for_tests/plugin-for-tests';
import * as Types from '../src/plugin_types';

// Mock the document
const mockDocument = {
  documentElement: {
    lang: 'es-419',
    getAttribute: jest.fn().mockReturnValue('es-419'),
  },
  body: {
    lang: 'de',
    getAttribute: jest.fn().mockReturnValue('de'),
    children: []
  },
  querySelector: jest.fn(),
} as unknown as Document;

const mockDocumentNoLang = {
  documentElement: {
    lang: '',
    getAttribute: jest.fn().mockReturnValue(''),
  },
  body: {
    lang: '',
    getAttribute: jest.fn().mockReturnValue(''),
    children: []
  },
  querySelector: jest.fn(),
} as unknown as Document;

const mockDocumentOneChildWithLang = {
  documentElement: {
    lang: '',
    getAttribute: jest.fn().mockReturnValue(''),
  },
  body: {
    lang: '',
    getAttribute: jest.fn().mockReturnValue(''),
    children: [{
      getAttribute: jest.fn().mockReturnValue('jp')
    }
    ]
  },
  querySelector: jest.fn(),
} as unknown as Document;

describe('LanguageDetector', () => {
  let mockEditor: Types.TinyMCEEditor;

  beforeEach(() => {
    jest.spyOn(document.body, 'getAttribute').mockImplementation((name: string) => {
      if (name === 'lang') return 'zh';
      return null;
    });

    jest.spyOn(document.documentElement, 'getAttribute').mockImplementation((name: string) => {
      if (name === 'lang') return 'zz';
      return null;
    });

    Object.defineProperty(document.body, 'parentElement', {
      value: document.documentElement,
    });

    Object.defineProperty(document.documentElement, 'parentElement', {
      value: null,
    });

    // Mock the global navigator
    Object.defineProperty(globalThis, 'navigator', {
      value: {
        language: 'fr'
      },
      configurable: true
    });

    const translations: Record<string, string> = {
      'Set text language': 'Imposta lingua del testo',
      'Choose from list': 'Scegli dalla lista',
      'Manual language entry': 'Inserimento manuale della lingua',
      'Configure languages': 'Configura lingue',
      'Remove Language Markup': 'Rimuovi marcatura lingua',
      'Reveal lang markup': 'Mostra marcatura lingua',
      '-Language Not Set-': '-Lingua non impostata-',
      "langName.af": 'Afrikáans',
      "langName.ak": 'Akan',
      "langName.ar": 'Árabe',
      "langName.az": 'Azerbaiyano',
      "langName.bg": 'Búlgaro',
      "langName.bho": 'Bhojpuri',
      "langName.bm": 'Bambara',
      "langName.bn": 'Bengalí',
    };

    // Create more flexible mock editor
    mockEditor = {
      getDoc: () => mockDocument,
      options: {
        get: (s) => '',
      },
      translate: (key: string) => translations[key] || key,
      settings: {
        language: 'it'
      },
      // Add required properties with proper types or undefined
      iframeElement: document.createElement('iframe') as HTMLIFrameElement,
      container: document.createElement('div'),
      formatter: {
        register: jest.fn(),
        apply: jest.fn(),
      },
      shortcuts: {
        add: jest.fn(),
      },
      selection: {
        getNode: jest.fn(),
      } as any,
      dom: {
        getAttrib: jest.fn(),
      } as any,
      focus: jest.fn(),
    };
  });

  describe('detectEditorLanguage', () => {
    it('should detect language from editor document body', () => {
      const plugin = new LanguageSelect(mockEditor, 'fakeURL');
      expect(plugin.getTinymceDefaultDocumentLanguage()).toBe('de');
    });

    it('should detect language from editor document element (html)', () => {
      mockDocument.body = document.createElement('div');
      const plugin = new LanguageSelect(mockEditor, 'fakeURL');
      expect(plugin.getTinymceDefaultDocumentLanguage()).toBe('es-419');
    });


    it('should detect language from editor settings', () => {
      // Create a new editor mock with empty settings
      const editorWithEmptySettings = {
        ...mockEditor,
        getDoc: () => mockDocumentNoLang,
      };
      const plugin = new LanguageSelect(editorWithEmptySettings, 'fakeURL');
      expect(plugin.getTinymceDefaultDocumentLanguage()).toBe('it');
    });

    it('should detect language from top document body when editor document and editor settings are empty', () => {
      // Create a new editor mock with empty settings
      const editorWithEmptySettings = {
        ...mockEditor,
        getDoc: () => mockDocumentNoLang,
        settings: {} as any,
      };

      const plugin = new LanguageSelect(editorWithEmptySettings, 'fakeURL');
      expect(plugin.getLanguageFromTopDocument()).toBe('zh');
      expect(plugin.getTinymceDefaultDocumentLanguage()).toBe('zh');
    });

    it('should detect language from top document HTML element when editor document and editor settings are empty', () => {
      // Create a new editor mock with empty settings
      const editorWithEmptySettings = {
        ...mockEditor,
        getDoc: () => mockDocumentNoLang,
        settings: {} as any,
      };
      const getAttrSpy = jest.spyOn(document.body, 'getAttribute');
      getAttrSpy.mockImplementation((name: string) => {
        if (name === 'lang') return '';
        return null;
      });

      const plugin = new LanguageSelect(editorWithEmptySettings, 'fakeURL');
      expect(plugin.getLanguageFromTopDocument()).toBe('zz');
      expect(plugin.getTinymceDefaultDocumentLanguage()).toBe('zz');
    });

  });

  describe('detectContentLanguage', () => {
    it('should detect language from content elements', () => {
      // Create a new editor mock with empty settings
      const editorWithEmptySettings = {
        ...mockEditor,
        getDoc: () => mockDocumentOneChildWithLang,
        settings: {} as any,
      };

      const plugin = new LanguageSelect(editorWithEmptySettings, 'fakeURL');
      expect(plugin.getTinymceDefaultDocumentLanguage()).toEqual('jp');
    });
  });

  describe('getNativeLanguageName', () => {
    it('should return the native spelling a language name', () => {
      expect(LanguageSelect.getNativeLanguageName('en')).toBe('English');
      expect(LanguageSelect.getNativeLanguageName(' en ')).toBe('English');
      expect(LanguageSelect.getNativeLanguageName('fr-CA')).toBe('Français (Canada)');
    });
    it('should return the lang code when not found', () => {
      expect(LanguageSelect.getNativeLanguageName('en')).toBe('English');
      expect(LanguageSelect.getNativeLanguageName(' en ')).toBe('English');
      expect(LanguageSelect.getNativeLanguageName('x-klingon')).toBe('x-klingon');
    });
  });

  describe('getLanguageNameForLocale', () => {
    it('should return the key for a lang code not found', () => {
      const plugin = new LanguageSelect(mockEditor, 'fakeURL');
      expect(plugin.getLanguageNameForLocale('x-klingon')).toBe('x-klingon');
    });
    it('should return the name for a lang code it has', () => {
      const plugin = new LanguageSelect(mockEditor, 'fakeURL');
      expect(plugin.getLanguageNameForLocale('az')).toBe('Azerbaiyano');
    });
    it('should return the native language name for missing keys that are in langAtts', () => {
      const plugin = new LanguageSelect(mockEditor, 'fakeURL');
      expect(plugin.getLanguageNameForLocale('fr-CA')).toBe('Français (Canada)');
    })

  });

});
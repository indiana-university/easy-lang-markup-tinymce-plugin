import { EasyLangMarkup } from '../dist/plugin_for_tests/plugin-for-tests';
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


describe('isNullOrWhitespace', () => {
  test('isNullOrWhitespace should return true for vars with no content', () => {
    expect(EasyLangMarkup.isNotBlank(null)).toBe(false);
    expect(EasyLangMarkup.isNotBlank('')).toBe(false);
    expect(EasyLangMarkup.isNotBlank(' ')).toBe(false);
    expect(EasyLangMarkup.isNotBlank('    ')).toBe(false);
    expect(EasyLangMarkup.isNotBlank("\t\n\r")).toBe(false);
  });

  test('isNullOrWhitespace should return false for vars with content', () => {
    expect(EasyLangMarkup.isNotBlank('a')).toBe(true);
    expect(EasyLangMarkup.isNotBlank('1')).toBe(true);
    expect(EasyLangMarkup.isNotBlank('A')).toBe(true);
    expect(EasyLangMarkup.isNotBlank('@')).toBe(true);
  });

});

describe('translate functions', () => {
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

    // Mock window.tinymce
    Object.defineProperty(globalThis, 'tinymce', {
      value: {
        PluginManager: {
          add: jest.fn(),
        },
        util: {
          I18n: {
            translate: jest.fn((key: string) => key),
            add: jest.fn(),
          },
        },
        majorVersion: '6',
        minorVersion: '4',
        // Add other tinymce properties/methods as needed
      },
      configurable: true,
      writable: true,
    });

    // Create more flexible mock editor
    mockEditor = {
      getDoc: () => mockDocument,
      options: {
        get: (s) => '',
      },
      translate: (s) => s,
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
      focus: jest.fn(),
      dom: {
        getAttrib: jest.fn(),
        setAttrib: jest.fn(),
        removeAttrib: jest.fn(),
      },
      ui: {
        registry: {
          addIcon: jest.fn(),
          addMenuButton: jest.fn(),
          addNestedMenuItem: jest.fn(),
          getAll: jest.fn(),
        },
      },
      getBody: () => document.body,
      getParam: (name: string, defaultValue?: any, type?: string) => { 
          return undefined
        },
      windowManager: {
        open: jest.fn(),
      },
    };
  });

  afterEach(() => {
    // Clean up if needed
    delete (globalThis as any).tinymce;
  });

  describe('translate', () => {
    it('should return the key if the translation is not found', () => {
      const plugin = new EasyLangMarkup(mockEditor, 'fakeURL');
      expect(plugin.translate('this probably is not a real translation key')).toBe('this probably is not a real translation key');
    });

    it('should detect language from editor document element (html)', () => {
      mockDocument.body = document.createElement('div');
      const plugin = new EasyLangMarkup(mockEditor, 'fakeURL');
      expect(plugin.getTinymceDefaultDocumentLanguage()).toBe('es-419');
    });

  });

  describe('translateTemplate', () => {
    it('should return the key with substituted values if the translation is not found', () => {
      const plugin = new EasyLangMarkup(mockEditor, 'fakeURL');
      expect(plugin.evalTemplate('this probably is not a real translation key {{text}}', { text: 'right?' })).toBe('this probably is not a real translation key right?');
    });

  });

  describe('plugin integration', () => {
    it('should initialize without errors', () => {
      const plugin = new EasyLangMarkup(mockEditor, 'fakeURL');
      expect(() => plugin.init()).not.toThrow();
    });
  });

});

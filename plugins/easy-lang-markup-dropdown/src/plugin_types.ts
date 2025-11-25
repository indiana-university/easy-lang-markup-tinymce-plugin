/**
 * Copyright (C) 2012 The Trustees of Indiana University
 * SPDX-License-Identifier: GPL-3.0-only
 */

declare global {
  interface Window {
    wp?: any;  // WordPress global object
  }
}

export interface ElementAttributes {
  readonly [key: string]: string;
}

export interface TinyMCE4MenuButtonControl {
  settings: {
    menu: any[];
    [key: string]: unknown;
  };
  state: {
    data: {
      menu: any[];
      [key: string]: unknown;
    };
    [key: string]: unknown;
  };
  menu?: {
    remove: () => void;
  } | null;
  active: (state: boolean) => void;
  on: (event: string, handler: Function) => void;
}

export interface TinyMCE4MenuItem {
  active: (state: boolean) => void;
  disabled: (state: boolean) => void;
  visible: (state: boolean) => void;
}

export type TinyMCEEditorButtonRegistry = {
      addButton: (...args: any[]) => void;
      addMenuItem: (...args: any[]) => void;
}

export type TinyMCEEditor = {

  addCommand?: (...args: any[]) => void;
  addShortcut?: (...args: any[]) => void;
  addButton?: (...args: any[]) => void;

  container?: HTMLElement | null;
  dom?: unknown;

  focus?: () => void;
  getDoc?: () => Document | null;
  getBody?: () => Element | null;
  getContainer?: () => Element | null;
  getParam?: (...args: any[]) => any | null;

  formatter: {
    register?: (...args: any[]) => any;
    apply?: (...args: any[]) => any;
    [key: string]: unknown;
  };

  iframeElement?: HTMLElement | null;

  off?: (...args: any[]) => void;
  on?: (...args: any[]) => void;

  options: {
    get: (...args: any[]) => any | null;
    [key: string]: unknown;
  };

  selection?: {
    getNode?: (...args: any[]) => Element | null;
  }

  settings?: {
    language?: string;
    selector?: string;
    [key: string]: unknown;
  };

  shortcuts?: {
    add?: (...args: any[]) => any;
    [key: string]: unknown;
  };

  translate: (key: string) => string;

  ui?: {
    registry?: {
      addIcon: (...args: any[]) => void;
      getAll: (...args: any[]) => any | null;
      addMenuButton: (...args: any[]) => void;
      addNestedMenuItem: (...args: any[]) => void;
    }
  }

  undoManager?: {
    transact?: (callback: () => void) => void;
    [key: string]: unknown;
  };

  windowManager?: {
    open?: (...args: any[]) => any;
    alert?: (...args: any[]) => any; // TODO Verify it exists
  }

  [key: string]: unknown; // fallback for any dynamic access
};

export interface LanguageMenuItem {
  type: 'menuitem' | 'nestedmenuitem' | 'togglemenuitem';
  text: string;
  icon?: string;
  shortcut?: string;
  disabled?: boolean;
  onAction?: (event: Event) => void;
  onSetup?: (api: any) => Function | null;
  getSubmenuItems?: (event: Event) => LanguageMenuItem[];
}

export interface DialogData {
  language?: string;
  manualLanguage?: string;
  [key: string]: string | undefined;
}

export interface ButtonApi {
  setActive(state: boolean): void;
  isActive(): boolean;
  setEnabled(state: boolean): void;
  isEnabled(): boolean;
}

export interface MenuApi {
  setActive(state: boolean): void;
  isActive(): boolean;
  setEnabled(state: boolean): void;
  isEnabled(): boolean;
}

export interface EventArgs<T = any> {
  type: string;
  target: any;
  preventDefault(): void;
  stopPropagation(): void;
}

export interface LocaleParts {
  language: string;
  script?: string;
  region?: string;
}

export interface ContentLanguage {
  code: string;
  title: string;
}

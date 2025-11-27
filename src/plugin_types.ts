/**
 * Copyright (C) 2012 The Trustees of Indiana University
 * SPDX-License-Identifier: GPL-3.0-only
 */

declare global {
  interface Window {
    wp?: any; // WordPress global object (if present)
    PB_EasyLangToken?: Record<string, string>; // Pressbooks language selector token map
  }
}

/**
 * Generic attribute map used in a few places for convenience.
 */
export interface ElementAttributes {
  readonly [key: string]: string;
}

/**
 * TinyMCE 4 observable interface for event handling.
 *
 * We only model the methods that the plugin actually uses.
 */
export interface TinyMCE4Observable {
  on(event: string, callback: (...args: any[]) => void): void;
  off(event: string, callback: (...args: any[]) => void): void;
  fire(event: string, args?: any): void;
}

/**
 * Shape of the menu button control object that TinyMCE 4 passes
 * as `this` to onPostRender for a `type: "menubutton"` toolbar button.
 *
 * We only model the properties that the plugin actually uses:
 * - settings.menu
 * - state.data.menu
 * - menu (the open menu instance)
 * - active()
 */
export interface TinyMCE4MenuButtonControl extends TinyMCE4Observable {
  settings: {
    menu?: any[];
    [key: string]: any;
  };

  state: {
    data: {
      menu?: any[];
      [key: string]: any;
    };
    [key: string]: any;
  };

  menu: any | null;

  active(state: boolean): void;
}

/**
 * Shape of a TinyMCE 4 menu item as seen from an onclick handler,
 * where `this` is the menu item instance.
 *
 * We only call .active() to toggle the visual state.
 */
export interface TinyMCE4MenuItem {
  active(state: boolean): void;
}

/**
 * Button API for TinyMCE 5+ toolbar buttons.
 *
 * The plugin only calls setActive, but we leave room for
 * future use of setText/setIcon via optional properties.
 */
export interface ButtonApi {
  setActive(state: boolean): void;
  setText?(text: string): void;
  setIcon?(icon: string | null): void;
}

/**
 * Menu item spec for TinyMCE 5+ `ui.registry` menus.
 *
 * This is a simplified subset tailored to how the plugin uses it:
 * - type: "menuitem" or "nestedmenuitem"
 * - text, icon, shortcut, disabled
 * - onAction() for leaf items
 * - getSubmenuItems() for nested menu items
 */
export interface LanguageMenuItem {
  // include togglemenuitem (and optionally separator)
  type: 'menuitem' | 'nestedmenuitem' | 'togglemenuitem' | 'separator';

  text?: string;         // separator doesn’t need text
  icon?: string;
  shortcut?: string;
  disabled?: boolean;

  // for menuitem / togglemenuitem
  onAction?: (api: any) => void;

  // for nestedmenuitem
  getSubmenuItems?: (api?: any) => LanguageMenuItem[];

  // for togglemenuitem you might also be using:
  onSetup?: (api: any) => void;   // TinyMCE passes a ToggleMenuItemApi here
  // checked / active state is usually controlled via onSetup + api.setActive()
}

/**
 * LocaleParts describes the result of breaking a BCP-47-ish
 * language tag into its components.
 */
export interface LocaleParts {
  language: string;
  script?: string;
  region?: string;
}

/**
 * Matches TinyMCE's content_langs-style config:
 *  editor.getParam("content_langs") => { code, title }[]
 */
export interface ContentLanguage {
  code: string;
  title: string;
}

/**
 * Common subset of TinyMCE editor APIs used by the plugin,
 * shared between TinyMCE 4 and TinyMCE 5+.
 *
 * Everything not needed by this plugin is intentionally left as `any`
 * or omitted to keep the types lightweight and easy to maintain.
 */
export interface TinyMCEEditorBase {
  // Core editor methods we use
  getBody(): HTMLElement;
  getDoc(): Document;
  getContainer?(): HTMLElement;

  getParam(name: string, defaultValue?: any, type?: string): any;

  addCommand?(
    name: string,
    callback: (ui: boolean, value: any) => void
  ): void;

  addShortcut?(
    pattern: string,
    descOrCommand: string,
    cmdOrCallback?: string | (() => void)
  ): void;

  dom?: {
    getAttrib(el: Element, name: string, defaultValue?: string): string | null;
    setAttrib(el: Element, name: string, value: string): void;
    removeAttrib(el: Element, name: string): void;
  };

  shortcuts?: {
    add(
      pattern: string,
      desc: string,
      cmd: string
    ): void;
  };

  addMenuItem?(name: string, settings: any): void;
  addButton?(name: string, settings: any): void;

  translate?(key: string): string;
  focus?(): void;

  on?(event: string, callback: (e: any) => void): void;
  off?(event: string, callback: (e: any) => void): void;

  // Various property bags used in plugin.ts
  formatter?: any;
  undoManager?: any;
  iframeElement?: HTMLIFrameElement;
  container?: HTMLElement;

  options?: {
    get(name: string): any;
    [key: string]: any;
  };

  settings?: {
    language?: string;
    selector?: string;
    [key: string]: any;
  };

  selection?: {
    getNode(): Element | null;
    [key: string]: any;
  };

  ui?: any;

  windowManager: {
    open(spec: any, params?: any): any;
    [key: string]: any;
  };
}

/**
 * TinyMCE 4 editor shape as used by this plugin.
 *
 * This extends the common base and tightens the types for
 * addButton/addMenuItem where we rely on TinyMCE 4 APIs.
 */
export interface TinyMCE4Editor extends TinyMCEEditorBase {
  // TinyMCE 4 UI is not strongly typed here – we only
  // use addButton/addMenuItem, which are on the editor itself.
  ui?: any;

  addButton(
    name: string,
    settings: {
      type?: string; // "menubutton"
      text?: string | null;
      icon?: string | null;
      tooltip?: string;
      menu?: any[];
      onPostRender?: (this: TinyMCE4MenuButtonControl) => void;
      onclick?: () => void;
      [key: string]: any;
    }
  ): void;

  addMenuItem(name: string, settings: any): void;

  addShortcut(
    pattern: string,
    desc: string,
    cmd: string
  ): void;
}

/**
 * TinyMCE 5+ UI registry subset that this plugin uses.
 */
export interface TinyMCE5UIRegistry {
  addIcon(name: string, svg: string): void;

  addMenuButton(
    name: string,
    spec: {
      text?: string | null;
      icon?: string | null;
      tooltip?: string;
      fetch: (callback: (items: LanguageMenuItem[]) => void) => void;
      onSetup?: (api: ButtonApi) => void;
      [key: string]: any;
    }
  ): void;

  addNestedMenuItem(
    name: string,
    spec: {
      text: string;
      icon?: string;
      disabled?: boolean;
      getSubmenuItems: (api?: any) => LanguageMenuItem[];
      [key: string]: any;
    }
  ): void;

  getAll(): {
    icons: Record<string, any>;
    [key: string]: any;
  };
}

/**
 * TinyMCE 5+ editor shape as used by this plugin.
 *
 * The key difference from TinyMCE 4 for our purposes is the
 * existence of `ui.registry` for menu/button registration.
 */
export interface TinyMCE5Editor extends TinyMCEEditorBase {
  ui: {
    registry: TinyMCE5UIRegistry;
    [key: string]: any;
  };

  // In TinyMCE 5, addShortcut has a slightly different signature,
  // but our base type is permissive enough to cover both.
}

/**
 * Union type used by the plugin – the actual editor instance will be
 * narrowed at runtime using feature checks (e.g. editor.ui?.registry
 * for v5+, editor.addButton for v4).
 */
export type TinyMCEEditor = TinyMCE4Editor | TinyMCE5Editor;

/**
 * Shape of the global `tinymce` object as used by this plugin.
 * Works for both TinyMCE 4 and 5+ and for WordPress/Canvas/Pressbooks.
 */
export interface TinyMCEGlobal {
  majorVersion?: string;
  minorVersion?: string;
  version?: string;

  init(config: any): TinyMCE4Editor | TinyMCE5Editor;

  get(id?: string): TinyMCE4Editor | TinyMCE5Editor | null;

  activeEditor?: TinyMCE4Editor | TinyMCE5Editor;

  editors?: Array<TinyMCE4Editor | TinyMCE5Editor>;

  // Allow additional properties without turning everything into `any`
  [key: string]: any;
}

// Make the global `tinymce` available in any file that imports this module
declare global {
  // eslint-disable-next-line no-var
  var tinymce: TinyMCEGlobal;
}
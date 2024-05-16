/**
 * An object literal that holds all the DOM element references for the application.
 * Each property of the object represents a section or component of the application,
 * and its value is an object containing references to the corresponding DOM elements.
 */
export const data = {
  /**
   * Object containing references to DOM elements related to the book list.
   */
  list: {
    items: document.querySelector("[data-list-items]"),
    button: document.querySelector("[data-list-button]"),
    message: document.querySelector("[data-list-message]"),
    active: document.querySelector("[data-list-active]"),
    close: document.querySelector("[data-list-close]"),
    blur: document.querySelector("[data-list-blur]"),
    image: document.querySelector("[data-list-image]"),
    title: document.querySelector("[data-list-title]"),
    subtitle: document.querySelector("[data-list-subtitle]"),
    description: document.querySelector("[data-list-description]"),
  },
  /**
   * Object containing references to DOM elements related to the search functionality.
   */
  search: {
    overlay: document.querySelector("[data-search-overlay]"),
    form: document.querySelector("[data-search-form]"),
    cancel: document.querySelector("[data-search-cancel]"),
    title: document.querySelector("[data-search-title]"),
    genres: document.querySelector("[data-search-genres]"),
    authors: document.querySelector("[data-search-authors]"),
  },
  /**
   * Object containing references to DOM elements related to the settings functionality.
   */
  settings: {
    overlay: document.querySelector("[data-settings-overlay]"),
    form: document.querySelector("[data-settings-form]"),
    cancel: document.querySelector("[data-settings-cancel]"),
    theme: document.querySelector("[data-settings-theme]"),
  },
  /**
   * Object containing references to DOM elements in the header.
   */
  header: {
    search: document.querySelector("[data-header-search]"),
    settings: document.querySelector("[data-header-settings]"),
    help: document.querySelector("[data-header-help]"),
    add: document.querySelector("[data-header-add]"),
    order: document.querySelector("[data-header-order]"),
    grid: document.querySelector("[data-header-grid]"),
    list: document.querySelector("[data-header-list]"),
    title: document.querySelector("[data-header-title]"),
    subtitle: document.querySelector("[data-header-subtitle]"),
  },
};

/**
 * A document fragment that will be used to hold the search results.
 */
export const searchResultFragment = document.createDocumentFragment();

/**
 * A document fragment that will be used to hold the initial book list.
 */
export const bookListFragment = document.createDocumentFragment();

/**
 * A document fragment that will be used to hold the genre options.
 */
export const genreFragment = document.createDocumentFragment();

/**
 * A document fragment that will be used to hold the author options.
 */
export const authorFragment = document.createDocumentFragment();

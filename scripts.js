// Importing necessary data and objects
import {
  books as bookData,
  authors as authorData,
  genres as genreData,
  BOOKS_PER_PAGE,
} from "./data.js";

import { Author, Genre, Book } from "./objects.js";

import {
  data,
  bookListFragment,
  genreFragment,
  authorFragment,
  searchResultFragment,
} from "./element.js";

// Created instances of Author and Genre objects
const authors = Object.entries(authorData).map(
  ([id, name]) => new Author(id, name)
);
const genres = Object.entries(genreData).map(
  ([id, name]) => new Genre(id, name)
);

// Created instances of Book objects
const books = bookData.map((book) => new Book(book));

// Initialized variables for page and matches
let page = 1; // Keep track of the current page
let matches = books; // Keep track of the matched books

// Function to create a book preview element
/**
 * Creates a button element representing a book preview.
 *
 * @param {Object} book - The book object containing book details.
 * @param {string} book.author - The ID of the book's author.
 * @param {string} book.id - The unique ID of the book.
 * @param {string} book.image - The URL of the book's cover image.
 * @param {string} book.title - The title of the book.
 * @returns {HTMLButtonElement} The created button element representing the book preview.
 */
function createBookPreview({ author, id, image, title }) {
  const element = document.createElement("button");
  element.classList = "preview";
  element.setAttribute("data-preview", id);

  // Finding the author name from the authors array
  const authorName = authors.find((a) => a.id === author).name;

  element.innerHTML = `
        <img class="preview__image" src="${image}" />
        <div class="preview__info">
            <h3 class="preview__title">${title}</h3>
            <div class="preview__author">${authorName}</div>
        </div>
    `;

  return element;
}

// Function to render the book list
/**
 * Renders a list of book previews.
 *
 * @param {Book[]} books - An array of Book objects to be rendered.
 * @param {DocumentFragment} fragment - The document fragment to which the book previews will be appended.
 */
function renderBookList(books, fragment) {
  // Iterating over the books and create book previews
  for (const book of books.slice(0, BOOKS_PER_PAGE)) {
    fragment.appendChild(createBookPreview(book));
  }
  // Appending the book previews to the list container
  data.list.items.appendChild(fragment);
}

// Function to create options for genres
/**
 * Creates options for the genre select element.
 */
function genresOptions() {
  // Creating an option for "All Genres"
  const firstGenreElement = document.createElement("option");
  firstGenreElement.value = "any";
  firstGenreElement.innerText = "All Genres";
  genreFragment.appendChild(firstGenreElement);

  // Creating options for each genre
  for (const genre of genres) {
    const element = document.createElement("option");
    element.value = genre.id;
    element.innerText = genre.name;
    genreFragment.appendChild(element);
  }

  // Appending the genre options to the genre select element
  data.search.genres.appendChild(genreFragment);
}

// Function to create options for authors
/**
 * Creates options for the author select element.
 */
function authorsOptions() {
  // Creating an option for "All Authors"
  const firstAuthorElement = document.createElement("option");
  firstAuthorElement.value = "any";
  firstAuthorElement.innerText = "All Authors";
  authorFragment.appendChild(firstAuthorElement);

  // Creating options for each author
  for (const author of authors) {
    const element = document.createElement("option");
    element.value = author.id;
    element.innerText = author.name;
    authorFragment.appendChild(element);
  }
  // Appending the author options to the author select element
  data.search.authors.appendChild(authorFragment);
}

/**
 * Setting up the theme based on the user's preferred color scheme.
 * If the user prefers a dark color scheme, the theme is set to 'night' and the '--color-dark' and '--color-light' CSS variables are updated accordingly.
 * If the user prefers a light color scheme, the theme is set to 'day' and the '--color-dark' and '--color-light' CSS variables are updated accordingly.
 */
function setupTheme() {
  if (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    document.querySelector("[data-settings-theme]").value = "night";
    document.documentElement.style.setProperty("--color-dark", "255, 255, 255");
    document.documentElement.style.setProperty("--color-light", "10, 10, 20");
  } else {
    document.querySelector("[data-settings-theme]").value = "day";
    document.documentElement.style.setProperty("--color-dark", "10, 10, 20");
    document.documentElement.style.setProperty(
      "--color-light",
      "255, 255, 255"
    );
  }
}

/**
 * Updates the "Show more" button text and state based on the remaining number of books to be shown.
 * The button text displays the remaining book count, and the button is disabled if there are no more books to show.
 */
function showMoreButton() {
  const remainingBooks = matches.length - page * BOOKS_PER_PAGE;
  data.list.button.innerText = `Show more (${remainingBooks > 0 ? remainingBooks : 0})`;
  data.list.button.disabled = remainingBooks <= 0;

  data.list.button.innerHTML = `
        <span>Show more</span>
        <span class="list__remaining"> (${remainingBooks > 0 ? remainingBooks : 0})</span>
    `;
}

/**
 * Sets up event listeners for various UI elements and form submissions.
 */
function setupEventListeners() {
  data.search.cancel.addEventListener("click", () => {
    data.search.overlay.open = false;
  });

  data.settings.cancel.addEventListener("click", () => {
    data.settings.overlay.open = false;
  });

  data.header.search.addEventListener("click", () => {
    data.search.overlay.open = true;
    data.search.title.focus();
  });

  data.header.settings.addEventListener("click", () => {
    data.settings.overlay.open = true;
  });

  data.list.close.addEventListener("click", () => {
    data.list.active.open = false;
  });

  data.settings.form.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const { theme } = Object.fromEntries(formData);

    if (theme === "night") {
      document.documentElement.style.setProperty(
        "--color-dark",
        "255, 255, 255"
      );
      document.documentElement.style.setProperty("--color-light", "10, 10, 20");
    } else {
      document.documentElement.style.setProperty("--color-dark", "10, 10, 20");
      document.documentElement.style.setProperty(
        "--color-light",
        "255, 255, 255"
      );
    }

    data.settings.overlay.open = false;
  });

  data.search.form.addEventListener("submit", handlingSearchSubmit);
  data.list.button.addEventListener("click", handleShowMore);
  data.list.items.addEventListener("click", bookClick);
}

/**
 * Handling the submission of the search form.
 * Filtering the book data based on the provided search criteria (title, author, and genre).
 * Updating the book list and "Show more" button based on the search results.
 *
 * @param {Event} event - The form submission event.
 */
function handlingSearchSubmit(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const filters = Object.fromEntries(formData);
  const result = [];

  for (const book of books) {
    let genreMatch = filters.genre === "any";

    for (const singleGenre of book.genres) {
      if (genreMatch) break;
      if (singleGenre === filters.genre) {
        genreMatch = true;
      }
    }

    if (
      (filters.title.trim() === "" ||
        book.title.toLowerCase().includes(filters.title.toLowerCase())) &&
      (filters.author === "any" || book.author === filters.author) &&
      genreMatch
    ) {
      result.push(book);
    }
  }

  page = 1;
  matches = result;

  if (result.length < 1) {
    data.list.message.classList.add("list__message_show");
  } else {
    data.list.message.classList.remove("list__message_show");
  }

  data.list.items.innerHTML = "";
  renderBookList(result, searchResultFragment);

  showMoreButton();
  window.scrollTo({ top: 0, behavior: "smooth" });
  data.search.overlay.open = false;
}

/**
 * Handles the click event on the "Show more" button.
 * Creates and appends book preview elements for the next set of books based on the current page and matches.
 * Updates the current page number and the "Show more" button state.
 */
function handleShowMore() {
  const fragment = document.createDocumentFragment();

  for (const book of matches.slice(
    page * BOOKS_PER_PAGE,
    (page + 1) * BOOKS_PER_PAGE
  )) {
    fragment.appendChild(createBookPreview(book));
  }

  data.list.items.appendChild(fragment);
  page += 1;
  showMoreButton();
}

/**
 * Handles the click event on a book preview element.
 * Finds the corresponding book object based on the clicked preview.
 * Opens the book details overlay and populates it with the book details.
 *
 * @param {Event} event - The click event on a book preview element.
 */
function bookClick(event) {
  const pathArray = Array.from(event.path || event.composedPath());
  let active = null;

  for (const node of pathArray) {
    if (active) break;

    if (node?.dataset?.preview) {
      let result = null;

      for (const singleBook of books) {
        if (result) break;
        if (singleBook.id === node?.dataset?.preview) result = singleBook;
      }

      active = result;
    }
  }

  if (active) {
    data.list.active.open = true;
    data.list.blur.src = active.image;
    data.list.image.src = active.image;
    data.list.title.innerText = active.title;
    data.list.subtitle.innerText = `${authors.find((a) => a.id === active.author).name} (${new Date(active.published).getFullYear()})`;
    data.list.description.innerText = active.description;
  }
}

/**
 * Event listener for the DOMContentLoaded event.
 * Calls the init function once the DOM is fully loaded.
 */
document.addEventListener("DOMContentLoaded", function () {
  init(); // init is called after the DOM is fully loaded
});

/**
 * Event listener for the DOMContentLoaded event.
 * Calls the init function once the DOM is fully loaded.
 */
function init() {
  renderBookList(matches, bookListFragment);
  genresOptions();
  authorsOptions();
  setupTheme();
  showMoreButton();
  setupEventListeners();
}

/**
 * Author Class .
 */
export class Author {
  /**
   * Creates an instance of Author.
   * @param {string} id - The unique identifier of the author.
   * @param {string} name - The name of the author.
   */
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }
}

/**
 * Genre Class.
 */
export class Genre {
  /**
   * Creates an instance of Genre.
   * @param {string} id - The unique identifier of the genre.
   * @param {string} name - The name of the genre.
   */
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }
}

/**
 * Book Class.
 */
export class Book {
  /**
   * Creates an instance of Book.
   * @param {Object} bookData - An object containing the book data.
   * @param {string} bookData.id - The unique identifier of the book.
   * @param {string} bookData.title - The title of the book.
   * @param {string} bookData.author - The identifier of the book's author.
   * @param {string} bookData.image - The URL of the book's cover image.
   * @param {string[]} bookData.genres - An array of genre identifiers for the book.
   * @param {number} bookData.published - The publication date of the book (Unix timestamp).
   * @param {string} bookData.description - The description of the book.
   */
  constructor({ id, title, author, image, genres, published, description }) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.image = image;
    this.genres = genres;
    this.published = published;
    this.description = description;
  }
}

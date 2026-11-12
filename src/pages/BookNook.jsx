import { useEffect, useState } from "react";

import BookResults from "../components/BookResults";
import BookSearch from "../components/BookSearch";
import FavoritesSection from "../components/FavoritesSection";

const OPEN_LIBRARY_URL = "https://openlibrary.org/search.json";
const BOOKS_PER_PAGE = 15;
const MAX_PAGES = 3;
const FAVORITES_STORAGE_KEY = "book-nook-favorites";

async function searchBooks(query, currentPage, signal) {
  const params = new URLSearchParams({
    q: query,
    limit: String(BOOKS_PER_PAGE),
    page: String(currentPage),
  });

  const response = await fetch(`${OPEN_LIBRARY_URL}?${params}`, { signal });

  if (!response.ok) {
    throw new Error("Unable to load books from Open Library.");
  }

  const data = await response.json();
  return {
    books: data.docs,
    totalPages: Math.min(
      MAX_PAGES,
      Math.ceil(data.numFound / BOOKS_PER_PAGE)
    ),
  };
}

function BookNook() {
  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [books, setBooks] = useState([]);
  const [favorites, setFavorites] = useState(() => {
    const storedFavorites = localStorage.getItem(FAVORITES_STORAGE_KEY);

    if (!storedFavorites) {
      return [];
    }

    try {
      const parsedFavorites = JSON.parse(storedFavorites);
      return Array.isArray(parsedFavorites) ? parsedFavorites : [];
    } catch {
      return [];
    }
  });
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [favoriteMessage, setFavoriteMessage] = useState("");

  useEffect(() => {
    localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    if (!favoriteMessage) {
      return undefined;
    }

    const timeout = setTimeout(() => {
      setFavoriteMessage("");
    }, 3000);

    return () => clearTimeout(timeout);
  }, [favoriteMessage]);

  useEffect(() => {
    if (!searchTerm) {
      return;
    }

    const controller = new AbortController();

    async function loadBooks() {
      try {
        setIsLoading(true);
        setError("");
        const { books: foundBooks, totalPages: availablePages } =
          await searchBooks(searchTerm, currentPage, controller.signal);
        setBooks(foundBooks);
        setTotalPages(availablePages);
      } catch (fetchError) {
        if (fetchError.name !== "AbortError") {
          setError(fetchError.message);
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    loadBooks();

    return () => controller.abort();
  }, [searchTerm, currentPage]);

  function handleSubmit(event) {
    event.preventDefault();
    const nextSearchTerm = searchInput.trim();

    setCurrentPage(1);
    setSearchTerm(nextSearchTerm);

    if (!nextSearchTerm) {
      setBooks([]);
      setTotalPages(0);
      setIsLoading(false);
      setError("");
    }
  }

  function handlePageChange(page) {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleToggleFavorite(book) {
    const bookTitle = book.title || "This book";
    const alreadyFavorite = isFavorite(book);

    setFavoriteMessage(
      alreadyFavorite
        ? `${bookTitle} was removed from your favorites.`
        : `${bookTitle} was added to your favorites.`,
    );
    setFavorites((currentFavorites) => {
      const isAlreadyFavorite = currentFavorites.some(
        (favorite) => favorite.key === book.key
      );

      if (isAlreadyFavorite) {
        return currentFavorites.filter((favorite) => favorite.key !== book.key);
      }

      return [...currentFavorites, book];
    });
  }

  function isFavorite(book) {
    return favorites.some((favorite) => favorite.key === book.key);
  }

  return (
    <section className="book-nook-page">
      <h1>Book Nook</h1>
      <p className="book-nook-intro">
        Discover new stories, find your next favourite read and get lost in
        the magic of books.
      </p>
      {favoriteMessage && (
        <p className="book-favorite-message" role="status" aria-live="polite">
          {favoriteMessage}
        </p>
      )}

      <section className="book-search-section" aria-labelledby="search-heading">
        <h2 id="search-heading">Find your next little escape</h2>
        <p>
          Search for a book by its title or author and discover a story worth
          getting lost in.
        </p>
        <BookSearch
          value={searchInput}
          onChange={(event) => setSearchInput(event.target.value)}
          onSubmit={handleSubmit}
        />
      </section>

      <div className="book-results">
        <BookResults
          isLoading={isLoading}
          error={error}
          searchTerm={searchTerm}
          books={books}
          currentPage={currentPage}
          totalPages={totalPages}
          isFavorite={isFavorite}
          onToggleFavorite={handleToggleFavorite}
          onPageChange={handlePageChange}
        />
      </div>

      <FavoritesSection
        favorites={favorites}
        onToggleFavorite={handleToggleFavorite}
      />
    </section>
  );
}

export default BookNook;
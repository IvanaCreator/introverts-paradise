import { useEffect, useState } from "react";

import BookCard from "../components/BookCard";
import BookSearch from "../components/BookSearch";

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

  useEffect(() => {
    localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    if (!searchTerm) {
      setBooks([]);
      setTotalPages(0);
      setIsLoading(false);
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
    setCurrentPage(1);
    setSearchTerm(searchInput.trim());
  }

  function handlePageChange(page) {
    setCurrentPage(page);
  }

  function handleToggleFavorite(book) {
    setFavorites((currentFavorites) => {
      const isFavorite = currentFavorites.some(
        (favorite) => favorite.key === book.key
      );

      if (isFavorite) {
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

      <section className="favorites-section" aria-labelledby="favorites-heading">
        <h2 id="favorites-heading">My favorites</h2>
        {favorites.length > 0 ? (
          <ul className="book-grid">
            {favorites.map((book) => (
              <BookCard
                key={book.key}
                book={book}
                isFavorite={true}
                onToggleFavorite={handleToggleFavorite}
              />
            ))}
          </ul>
        ) : (
          <p className="book-status">You have no favorite books yet.</p>
        )}
      </section>

      <BookSearch
        value={searchInput}
        onChange={(event) => setSearchInput(event.target.value)}
        onSubmit={handleSubmit}
      />

      {isLoading && <p className="book-status">Loading books...</p>}
      {error && <p className="book-status book-error">{error}</p>}

      {!isLoading && !error && (
        <>
          {searchTerm && books.length === 0 && (
            <p className="book-status">No books found.</p>
          )}

          {books.length > 0 && (
            <>
              <ul className="book-grid">
                {books.map((book) => (
                  <BookCard
                    key={book.key}
                    book={book}
                    isFavorite={isFavorite(book)}
                    onToggleFavorite={handleToggleFavorite}
                  />
                ))}
              </ul>

              <nav className="book-pagination" aria-label="Book search pages">
                <button
                  type="button"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>

                {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                  (page) => (
                    <button
                      key={page}
                      type="button"
                      onClick={() => handlePageChange(page)}
                      disabled={currentPage === page}
                    >
                      {page}
                    </button>
                  )
                )}

                <button
                  type="button"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </nav>
            </>
          )}
        </>
      )}
    </section>
  );
}

export default BookNook;
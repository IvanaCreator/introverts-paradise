import { useEffect, useState } from "react";

import BookSearch from "../components/BookSearch";

const OPEN_LIBRARY_URL = "https://openlibrary.org/search.json";

async function searchBooks(query, signal) {
  const params = new URLSearchParams({
    q: query,
    limit: "12",
  });

  const response = await fetch(`${OPEN_LIBRARY_URL}?${params}`, { signal });

  if (!response.ok) {
    throw new Error("Unable to load books from Open Library.");
  }

  const data = await response.json();
  return data.docs;
}

function BookNook() {
  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!searchTerm) {
      setBooks([]);
      setIsLoading(false);
      return;
    }

    const controller = new AbortController();

    async function loadBooks() {
      try {
        setIsLoading(true);
        setError("");
        const results = await searchBooks(searchTerm, controller.signal);
        setBooks(results);
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
  }, [searchTerm]);

  function handleSubmit(event) {
    event.preventDefault();
    setSearchTerm(searchInput.trim());
  }

  return (
    <section>
      <h1>Book Nook</h1>

      <BookSearch
        value={searchInput}
        onChange={(event) => setSearchInput(event.target.value)}
        onSubmit={handleSubmit}
      />

      {isLoading && <p>Loading books...</p>}
      {error && <p>{error}</p>}

      {!isLoading && !error && (
        <>
          {searchTerm && books.length === 0 && <p>No books found.</p>}

          {books.length > 0 && (
            <ul>
              {books.map((book) => (
                <li key={book.key}>
                  <strong>{book.title}</strong>
                  {book.author_name && <span> — {book.author_name[0]}</span>}
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </section>
  );
}

export default BookNook;
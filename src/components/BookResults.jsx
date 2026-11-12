import BookCard from "./BookCard";
import BookPagination from "./BookPagination";

function BookResults({
  isLoading,
  error,
  searchTerm,
  books,
  currentPage,
  totalPages,
  isFavorite,
  onToggleFavorite,
  onPageChange,
}) {
  if (isLoading) {
    return (
      <div className="book-status" role="status" aria-live="polite">
        Loading books...
      </div>
    );
  }

  if (error) {
    return (
      <div className="book-status book-error" role="alert">
        {error}
      </div>
    );
  }

  if (!searchTerm) {
    return (
      <p className="book-status">
        Search for a book to discover your next read.
      </p>
    );
  }

  if (books.length === 0) {
    return <p className="book-status">No books found.</p>;
  }

  return (
    <section aria-labelledby="book-results-heading">
      <h2 className="visually-hidden" id="book-results-heading">
        Search results
      </h2>
      <p className="book-results-count" aria-live="polite">
        Showing {books.length} books, page {currentPage} of {totalPages}.
      </p>
      <ul className="book-grid row g-4 list-unstyled p-0 mt-4 mb-4">
        {books.map((book) => (
          <BookCard
            key={book.key}
            book={book}
            isFavorite={isFavorite(book)}
            onToggleFavorite={onToggleFavorite}
          />
        ))}
      </ul>
      <BookPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </section>
  );
}

export default BookResults;

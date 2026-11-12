function BookPagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <nav
      className="book-pagination pagination justify-content-center gap-2 my-4"
      aria-label="Book search pages"
    >
      <button
        className="btn book-pagination-button"
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>

      {Array.from({ length: totalPages }, (_, index) => index + 1).map(
        (page) => (
          <button
            className="btn book-pagination-button"
            key={page}
            type="button"
            onClick={() => onPageChange(page)}
            disabled={currentPage === page}
            aria-current={currentPage === page ? "page" : undefined}
          >
            {page}
          </button>
        ),
      )}

      <button
        className="btn book-pagination-button"
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </nav>
  );
}

export default BookPagination;

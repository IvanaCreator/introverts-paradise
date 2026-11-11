function BookCard({ book }) {
  const author = book.author_name?.join(", ") || "Unknown author";
  const coverUrl = book.cover_i
    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
    : null;
  const bookUrl = `https://openlibrary.org${book.key}`;

  return (
    <li className="book-card">
      <div className="book-cover">
        {coverUrl ? (
          <img src={coverUrl} alt={`Cover of ${book.title}`} />
        ) : (
          <span>No cover available</span>
        )}
      </div>

      <div className="book-card-content">
        <h2>{book.title}</h2>
        <p className="book-author">{author}</p>

        <dl className="book-details">
          {book.first_publish_year && (
            <>
              <dt>First published</dt>
              <dd>{book.first_publish_year}</dd>
            </>
          )}

          {book.edition_count && (
            <>
              <dt>Editions</dt>
              <dd>{book.edition_count}</dd>
            </>
          )}

          {book.publisher?.[0] && (
            <>
              <dt>Publisher</dt>
              <dd>{book.publisher[0]}</dd>
            </>
          )}
        </dl>

        <a
          className="book-details-link"
          href={bookUrl}
          target="_blank"
          rel="noreferrer"
        >
          View on Open Library
        </a>
      </div>
    </li>
  );
}

export default BookCard;

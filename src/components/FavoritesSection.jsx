import BookCard from "./BookCard";

function FavoritesSection({ favorites, onToggleFavorite }) {
  return (
    <section className="favorites-section" aria-labelledby="favorites-heading">
      <h2 id="favorites-heading">My favorites</h2>
      <p className="favorites-intro">
        A collection of stories that caught my heart.
      </p>
      {favorites.length > 0 ? (
        <ul className="book-grid row g-4 list-unstyled p-0 mt-4 mb-4">
          {favorites.map((book) => (
            <BookCard
              key={book.key}
              book={book}
              isFavorite
              onToggleFavorite={onToggleFavorite}
            />
          ))}
        </ul>
      ) : (
        <p className="book-status">You have no favorite books yet.</p>
      )}
    </section>
  );
}

export default FavoritesSection;

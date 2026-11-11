function BookSearch({ value, onChange, onSubmit }) {
  return (
    <form className="book-search-form" onSubmit={onSubmit}>
      <label htmlFor="book-search">Search by title or author</label>
      <div className="book-search-controls">
        <input
          className="book-search-input"
          id="book-search"
          type="search"
          value={value}
          onChange={onChange}
          placeholder="e.g. Jane Austen"
        />
        <button className="book-search-button" type="submit">
          Search
        </button>
      </div>
    </form>
  );
}

export default BookSearch;

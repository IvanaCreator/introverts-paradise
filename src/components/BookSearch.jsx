function BookSearch({ value, onChange, onSubmit }) {
  return (
    <form className="book-search-form mb-4" onSubmit={onSubmit}>
      <label className="visually-hidden" htmlFor="book-search">
        Search by book title or author
      </label>
      <div className="book-search-controls d-flex align-items-center gap-2">
        <input
          className="book-search-input form-control"
          id="book-search"
          type="search"
          value={value}
          onChange={onChange}
          placeholder="e.g. Jane Austen"
        />
        <button className="book-search-button btn" type="submit">
          Search
        </button>
      </div>
    </form>
  );
}

export default BookSearch;

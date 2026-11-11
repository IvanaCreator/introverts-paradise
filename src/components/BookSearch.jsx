function BookSearch({ value, onChange, onSubmit }) {
  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="book-search">Search by title or author</label>
      <input
        id="book-search"
        type="search"
        value={value}
        onChange={onChange}
        placeholder="e.g. Jane Austen"
      />
      <button type="submit">Search</button>
    </form>
  );
}

export default BookSearch;

function JournalEntryCard({ entry, onDelete }) {
  return (
    <li className="list-group-item">
      <p>{entry.text}</p>
      <p>
        <strong>Mood:</strong> {entry.mood}
      </p>
      <p>
        <strong>Date:</strong> {entry.date}
      </p>
      <button
        className="btn btn-outline-danger"
        type="button"
        onClick={() => onDelete(entry.id)}
      >
        Delete
      </button>
    </li>
  );
}

export default JournalEntryCard;

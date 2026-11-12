import JournalEntryCard from "./JournalEntryCard";

function JournalHistory({ entries, selectedDate, onDelete }) {
  const visibleEntries = selectedDate
    ? entries.filter((entry) => entry.date === selectedDate)
    : entries;

  return (
    <section
      className="journal-history mb-5"
      aria-labelledby="journal-history-heading"
    >
      <h2 className="mb-3" id="journal-history-heading">
        Journal history
      </h2>
      <p className="journal-section-intro">
        {selectedDate
          ? `Entries from ${selectedDate}.`
          : "Look back on the days you've captured and see how far you've come."}
      </p>

      {visibleEntries.length === 0 ? (
        <p className="journal-empty">
          {selectedDate
            ? "No journal entries for this day."
            : "No journal entries yet."}
        </p>
      ) : (
        <ul className="journal-entry-list list-group">
          {visibleEntries.map((entry) => (
            <JournalEntryCard key={entry.id} entry={entry} onDelete={onDelete} />
          ))}
        </ul>
      )}
    </section>
  );
}

export default JournalHistory;

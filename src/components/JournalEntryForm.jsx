function JournalEntryForm({
  entryText,
  mood,
  entryDate,
  moods,
  onTextChange,
  onMoodChange,
  onDateChange,
  onSubmit,
}) {
  return (
    <form className="journal-form mb-5" onSubmit={onSubmit}>
      <div className="mb-3">
        <label className="form-label" htmlFor="journal-entry">
          Today's thoughts
        </label>
        <textarea
          className="form-control"
          id="journal-entry"
          value={entryText}
          onChange={onTextChange}
          placeholder="Write a little about your day..."
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label" htmlFor="journal-mood">
          Mood
        </label>
        <select
          className="form-select"
          id="journal-mood"
          value={mood}
          onChange={onMoodChange}
        >
          {moods.map((moodOption) => (
            <option key={moodOption} value={moodOption}>
              {moodOption}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label" htmlFor="journal-date">
          Date
        </label>
        <input
          className="form-control"
          id="journal-date"
          type="date"
          value={entryDate}
          onChange={onDateChange}
          required
        />
      </div>

      <button className="btn btn-success" type="submit">
        Save my thoughts
      </button>
    </form>
  );
}

export default JournalEntryForm;

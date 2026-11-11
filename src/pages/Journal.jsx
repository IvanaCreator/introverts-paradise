import { useEffect, useState } from "react";

const JOURNAL_STORAGE_KEY = "introverts-paradise-journal";
const MOODS = ["happy", "calm", "tired", "excited", "sad", "stressed", "thoughtful", "normal"];

function getToday() {
  return new Date().toISOString().slice(0, 10);
}

function Journal() {
  const [entryText, setEntryText] = useState("");
  const [mood, setMood] = useState(MOODS[0]);
  const [entryDate, setEntryDate] = useState(getToday);
  const [entries, setEntries] = useState(() => {
    const storedEntries = localStorage.getItem(JOURNAL_STORAGE_KEY);

    if (!storedEntries) {
      return [];
    }

    try {
      const parsedEntries = JSON.parse(storedEntries);
      return Array.isArray(parsedEntries) ? parsedEntries : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(JOURNAL_STORAGE_KEY, JSON.stringify(entries));
  }, [entries]);

  function handleSubmit(event) {
    event.preventDefault();

    const text = entryText.trim();

    if (!text) {
      return;
    }

    const newEntry = {
      id: Date.now(),
      text,
      mood,
      date: entryDate,
    };

    setEntries((currentEntries) => [newEntry, ...currentEntries]);
    setEntryText("");
  }

  function handleDelete(entryId) {
    setEntries((currentEntries) =>
      currentEntries.filter((entry) => entry.id !== entryId)
    );
  }

  return (
    <section>
      <h1>My Journal</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="journal-entry">Your entry</label>
          <textarea
            id="journal-entry"
            value={entryText}
            onChange={(event) => setEntryText(event.target.value)}
            placeholder="Write a little about your day..."
            required
          />
        </div>

        <div>
          <label htmlFor="journal-mood">Mood</label>
          <select
            id="journal-mood"
            value={mood}
            onChange={(event) => setMood(event.target.value)}
          >
            {MOODS.map((moodOption) => (
              <option key={moodOption} value={moodOption}>
                {moodOption}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="journal-date">Date</label>
          <input
            id="journal-date"
            type="date"
            value={entryDate}
            onChange={(event) => setEntryDate(event.target.value)}
            required
          />
        </div>

        <button type="submit">Save entry</button>
      </form>

      <section aria-labelledby="journal-history-heading">
        <h2 id="journal-history-heading">Journal history</h2>

        {entries.length === 0 ? (
          <p>No journal entries yet.</p>
        ) : (
          <ul>
            {entries.map((entry) => (
              <li key={entry.id}>
                <p>{entry.text}</p>
                <p>
                  <strong>Mood:</strong> {entry.mood}
                </p>
                <p>
                  <strong>Date:</strong> {entry.date}
                </p>
                <button type="button" onClick={() => handleDelete(entry.id)}>
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </section>
  );
}

export default Journal;
import { useEffect, useState } from "react";

const JOURNAL_STORAGE_KEY = "introverts-paradise-journal";
const BUCKET_LIST_STORAGE_KEY = "introverts-paradise-bucket-list";
const MOODS = ["happy", "calm", "tired", "excited", "sad", "stressed", "thoughtful", "hungry", "normal"];

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
  const [taskText, setTaskText] = useState("");
  const [tasks, setTasks] = useState(() => {
    const storedTasks = localStorage.getItem(BUCKET_LIST_STORAGE_KEY);

    if (!storedTasks) {
      return [];
    }

    try {
      const parsedTasks = JSON.parse(storedTasks);
      return Array.isArray(parsedTasks) ? parsedTasks : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(JOURNAL_STORAGE_KEY, JSON.stringify(entries));
  }, [entries]);

  useEffect(() => {
    localStorage.setItem(BUCKET_LIST_STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

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

  function handleTaskSubmit(event) {
    event.preventDefault();

    const text = taskText.trim();

    if (!text) {
      return;
    }

    setTasks((currentTasks) => [
      ...currentTasks,
      {
        id: Date.now(),
        text,
        completed: false,
      },
    ]);
    setTaskText("");
  }

  function handleTaskToggle(taskId) {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  }

  function handleTaskDelete(taskId) {
    setTasks((currentTasks) =>
      currentTasks.filter((task) => task.id !== taskId)
    );
  }

  return (
    <section className="journal-page container">
      <h1 className="mb-4">My Journal</h1>
      <p className="journal-intro">
        A quiet space for your thoughts, dreams and everything in between. Take
        a moment for yourself, let your thoughts flow and remember that every
        little feeling deserves a place.
      </p>

      <div className="journal-feature-row journal-writing-row">
        <div className="journal-image-frame">
          <img src="/open-journal.jpeg" alt="An open journal ready for writing" />
        </div>

        <form className="journal-form mb-5" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label" htmlFor="journal-entry">
              Today's thoughts
            </label>
            <textarea
              className="form-control"
              id="journal-entry"
              value={entryText}
              onChange={(event) => setEntryText(event.target.value)}
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
              onChange={(event) => setMood(event.target.value)}
            >
              {MOODS.map((moodOption) => (
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
              onChange={(event) => setEntryDate(event.target.value)}
              required
            />
          </div>

          <button className="btn btn-success" type="submit">
            Save my thoughts
          </button>
        </form>
      </div>

      <div className="journal-feature-row journal-history-row">
        <section
          className="journal-history mb-5"
          aria-labelledby="journal-history-heading"
        >
          <h2 className="mb-3" id="journal-history-heading">
            Journal history
          </h2>
          <p className="journal-section-intro">
            Look back on the days you've captured and see how far you've come.
          </p>

          {entries.length === 0 ? (
            <p className="journal-empty">No journal entries yet.</p>
          ) : (
            <ul className="journal-entry-list list-group">
              {entries.map((entry) => (
                <li className="list-group-item" key={entry.id}>
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
                    onClick={() => handleDelete(entry.id)}
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>

        <div className="journal-image-frame">
          <img src="/closed-journal.jpeg" alt="A closed journal" />
        </div>
      </div>

      <section className="bucket-list-section" aria-labelledby="bucket-list-heading">
        <h2 className="mb-2" id="bucket-list-heading">
          My Bucket List
        </h2>
        <p>Things I would like to try someday.</p>

        <form className="row g-2 mb-4" onSubmit={handleTaskSubmit}>
          <div className="col-12 col-md">
            <label className="visually-hidden" htmlFor="bucket-list-task">
              New bucket list task
            </label>
            <input
              className="form-control"
              id="bucket-list-task"
              type="text"
              value={taskText}
              onChange={(event) => setTaskText(event.target.value)}
              placeholder="Add something to your little dream list..."
              required
            />
          </div>
          <div className="col-12 col-md-auto">
            <button className="btn btn-success w-100" type="submit">
              Add task
            </button>
          </div>
        </form>

        {tasks.length === 0 ? (
          <p className="journal-empty">Your bucket list is empty.</p>
        ) : (
          <div className="row g-3">
            {tasks.map((task) => (
              <div className="col-12 col-md-6" key={task.id}>
                <article className="card h-100">
                  <div className="card-body d-flex align-items-center gap-3">
                    <input
                      className="form-check-input flex-shrink-0"
                      type="checkbox"
                      id={`task-${task.id}`}
                      checked={task.completed}
                      onChange={() => handleTaskToggle(task.id)}
                    />
                    <label
                      className={`card-text flex-grow-1 ${
                        task.completed ? "text-decoration-line-through" : ""
                      }`}
                      htmlFor={`task-${task.id}`}
                    >
                      {task.text}
                    </label>
                    <button
                      className="btn btn-outline-danger btn-sm"
                      type="button"
                      onClick={() => handleTaskDelete(task.id)}
                    >
                      Delete
                    </button>
                  </div>
                </article>
              </div>
            ))}
          </div>
        )}
      </section>
    </section>
  );
}

export default Journal;
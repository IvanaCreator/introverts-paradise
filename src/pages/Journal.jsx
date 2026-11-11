import { useEffect, useState } from "react";

import BucketListForm from "../components/BucketListForm";
import BucketListItem from "../components/BucketListItem";
import JournalEntryCard from "../components/JournalEntryCard";
import JournalEntryForm from "../components/JournalEntryForm";

const JOURNAL_STORAGE_KEY = "introverts-paradise-journal";
const BUCKET_LIST_STORAGE_KEY = "introverts-paradise-bucket-list";
const MOODS = [
  "happy",
  "calm",
  "tired",
  "excited",
  "sad",
  "stressed",
  "thoughtful",
  "hungry",
  "normal",
];

function getToday() {
  return new Date().toISOString().slice(0, 10);
}

function readStoredList(storageKey) {
  const storedItems = localStorage.getItem(storageKey);

  if (!storedItems) {
    return [];
  }

  try {
    const parsedItems = JSON.parse(storedItems);
    return Array.isArray(parsedItems) ? parsedItems : [];
  } catch {
    return [];
  }
}

function Journal() {
  const [entryText, setEntryText] = useState("");
  const [mood, setMood] = useState(MOODS[0]);
  const [entryDate, setEntryDate] = useState(getToday);
  const [entries, setEntries] = useState(() =>
    readStoredList(JOURNAL_STORAGE_KEY)
  );
  const [taskText, setTaskText] = useState("");
  const [tasks, setTasks] = useState(() =>
    readStoredList(BUCKET_LIST_STORAGE_KEY)
  );

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

    setEntries((currentEntries) => [
      {
        id: Date.now(),
        text,
        mood,
        date: entryDate,
      },
      ...currentEntries,
    ]);
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
          <img
            src="/open-journal.jpeg"
            alt="An open journal ready for writing"
          />
        </div>

        <JournalEntryForm
          entryText={entryText}
          mood={mood}
          entryDate={entryDate}
          moods={MOODS}
          onTextChange={(event) => setEntryText(event.target.value)}
          onMoodChange={(event) => setMood(event.target.value)}
          onDateChange={(event) => setEntryDate(event.target.value)}
          onSubmit={handleSubmit}
        />
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
                <JournalEntryCard
                  key={entry.id}
                  entry={entry}
                  onDelete={handleDelete}
                />
              ))}
            </ul>
          )}
        </section>

        <div className="journal-image-frame">
          <img src="/closed-journal.jpeg" alt="A closed journal" />
        </div>
      </div>

      <section
        className="bucket-list-section"
        aria-labelledby="bucket-list-heading"
      >
        <h2 className="mb-2" id="bucket-list-heading">
          My Bucket List
        </h2>
        <p>Things I would like to try someday.</p>

        <BucketListForm
          taskText={taskText}
          onTaskChange={(event) => setTaskText(event.target.value)}
          onSubmit={handleTaskSubmit}
        />

        {tasks.length === 0 ? (
          <p className="journal-empty">Your bucket list is empty.</p>
        ) : (
          <div className="row g-3">
            {tasks.map((task) => (
              <BucketListItem
                key={task.id}
                task={task}
                onToggle={handleTaskToggle}
                onDelete={handleTaskDelete}
              />
            ))}
          </div>
        )}
      </section>
    </section>
  );
}

export default Journal;

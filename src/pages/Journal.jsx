import { useEffect, useState } from "react";

import BucketListSection from "../components/BucketListSection";
import JournalEntryForm from "../components/JournalEntryForm";
import JournalCalendar from "../components/JournalCalendar";
import JournalHistory from "../components/JournalHistory";
import MoodChart from "../components/MoodChart";
import { getPublicAsset } from "../utils/assets";

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
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
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
  const [selectedDate, setSelectedDate] = useState(null);
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
            src={getPublicAsset("open-journal.jpeg")}
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

      <JournalCalendar
        entries={entries}
        selectedDate={selectedDate}
        onDateSelect={setSelectedDate}
        onClear={() => setSelectedDate(null)}
      />

      <div className="journal-feature-row journal-history-row">
        <JournalHistory
          entries={entries}
          selectedDate={selectedDate}
          onDelete={handleDelete}
        />

        <div className="journal-image-frame">
          <img
            src={getPublicAsset("closed-journal.jpeg")}
            alt="A closed journal"
          />
        </div>
      </div>

      <MoodChart entries={entries} />

      <BucketListSection
        taskText={taskText}
        tasks={tasks}
        onTaskChange={(event) => setTaskText(event.target.value)}
        onSubmit={handleTaskSubmit}
        onToggle={handleTaskToggle}
        onDelete={handleTaskDelete}
      />
    </section>
  );
}

export default Journal;

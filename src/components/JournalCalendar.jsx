import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

function toDateString(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function JournalCalendar({ entries, selectedDate, onDateSelect, onClear }) {
  const entryDates = new Set(entries.map((entry) => entry.date));
  const calendarValue = selectedDate
    ? new Date(`${selectedDate}T00:00:00`)
    : new Date();

  return (
    <section className="journal-calendar-section" aria-labelledby="calendar-heading">
      <h2 id="calendar-heading">Browse by date</h2>
      <p>Choose a day to revisit the thoughts you captured there.</p>
      <Calendar
        value={calendarValue}
        onChange={(date) => onDateSelect(toDateString(date))}
        tileClassName={({ date, view }) =>
          view === "month" && entryDates.has(toDateString(date))
            ? "journal-calendar-has-entry"
            : null
        }
      />
      {selectedDate && (
        <button
          className="journal-calendar-clear btn btn-outline-secondary"
          type="button"
          onClick={onClear}
        >
          Show all entries
        </button>
      )}
    </section>
  );
}

export default JournalCalendar;

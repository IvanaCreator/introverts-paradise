import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const MOOD_COLORS = [
  "#a77e75",
  "#68775b",
  "#d5a66f",
  "#8b9baf",
  "#9a7898",
  "#c47f6e",
  "#a18b78",
  "#d1a85d",
  "#8d8576",
];

function MoodChart({ entries }) {
  const moodCounts = entries.reduce((counts, entry) => {
    counts[entry.mood] = (counts[entry.mood] || 0) + 1;
    return counts;
  }, {});

  const chartData = Object.entries(moodCounts).map(([mood, count]) => ({
    name: mood.charAt(0).toUpperCase() + mood.slice(1),
    value: count,
  }));

  return (
    <section className="mood-chart-section" aria-labelledby="mood-chart-heading">
      <h2 id="mood-chart-heading">Mood overview</h2>
      <p>See which feelings have visited your journal most often.</p>
      {chartData.length === 0 ? (
        <p className="journal-empty">Add a journal entry to see your moods.</p>
      ) : (
        <div className="mood-chart">
          <ResponsiveContainer width="100%" height={320}>
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius="70%"
                label
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={`mood-cell-${entry.name}`}
                    fill={MOOD_COLORS[index % MOOD_COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </section>
  );
}

export default MoodChart;

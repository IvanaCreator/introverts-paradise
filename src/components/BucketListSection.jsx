import BucketListForm from "./BucketListForm";
import BucketListItem from "./BucketListItem";

function BucketListSection({
  taskText,
  tasks,
  onTaskChange,
  onSubmit,
  onToggle,
  onDelete,
}) {
  return (
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
        onTaskChange={onTaskChange}
        onSubmit={onSubmit}
      />

      {tasks.length === 0 ? (
        <p className="journal-empty">Your bucket list is empty.</p>
      ) : (
        <div className="row g-3">
          {tasks.map((task) => (
            <BucketListItem
              key={task.id}
              task={task}
              onToggle={onToggle}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default BucketListSection;

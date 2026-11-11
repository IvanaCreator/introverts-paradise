function BucketListItem({ task, onToggle, onDelete }) {
  return (
    <div className="col-12 col-md-6">
      <article className="card h-100">
        <div className="card-body d-flex align-items-center gap-3">
          <input
            className="form-check-input flex-shrink-0"
            type="checkbox"
            id={`task-${task.id}`}
            checked={task.completed}
            onChange={() => onToggle(task.id)}
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
            onClick={() => onDelete(task.id)}
          >
            Delete
          </button>
        </div>
      </article>
    </div>
  );
}

export default BucketListItem;

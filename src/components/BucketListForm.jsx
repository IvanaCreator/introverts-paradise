function BucketListForm({ taskText, onTaskChange, onSubmit }) {
  return (
    <form className="row g-2 mb-4" onSubmit={onSubmit}>
      <div className="col-12 col-md">
        <label className="visually-hidden" htmlFor="bucket-list-task">
          New bucket list task
        </label>
        <input
          className="form-control"
          id="bucket-list-task"
          type="text"
          value={taskText}
          onChange={onTaskChange}
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
  );
}

export default BucketListForm;

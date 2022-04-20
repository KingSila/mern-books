import { useState } from "react";
import { useDispatch } from "react-redux";
import { addBook } from "../features/books/bookSlice";

function BookForm() {
  const [id, setID] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");

  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(addBook({ id, title, author }));
    setID("");
    setTitle("");
    setAuthor("");
  };

  return (
    <section className="form>">
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="text">ID</label>
          <input
            type="text"
            name="text"
            id="text"
            value={id}
            onChange={(e) => setID(e.target.value)}
          />
          <label htmlFor="text">Title</label>
          <input
            type="text"
            name="text"
            id="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label htmlFor="text">Author</label>
          <input
            type="text"
            name="text"
            id="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <div className="form-group">
          <button className="btn btn-block" type="submit">
            Add Book
          </button>
        </div>
      </form>
    </section>
  );
}

export default BookForm;

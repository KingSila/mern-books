import { useDispatch } from "react-redux";
import { addBook } from "../features/books/bookSlice";
import useInput from "../hooks/useInput";

function BookForm() {
  const { value: book_id, bind: bindID, reset: resetID } = useInput("");
  const { value: title, bind: bindTitle, reset: resetTitle } = useInput("");
  const { value: author, bind: bindAuthor, reset: resetAuthor } = useInput("");

  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();

    resetID();
    resetTitle();
    resetAuthor();

    const bookData = {
      book_id,
      title,
      author,
    };

    dispatch(addBook(bookData));
  };

  return (
    <section className="form>">
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="text">ID</label>
          <input type="text" {...bindID} name="text" id="id" />
          <label htmlFor="text">Title</label>
          <input type="text" {...bindTitle} name="text" id="title" />
          <label htmlFor="text">Author</label>
          <input type="text" {...bindAuthor} name="text" id="author" />
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

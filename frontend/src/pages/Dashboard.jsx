import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import BookForm from "../components/BookForm";
import BookItem from "../components/BookItem";
import Spinner from "../components/Spinner";
import { reset, getBooks } from "../features/books/bookSlice";

function Dashboard() {
  const { user } = useSelector((state) => state.auth);
  const { books, isLoading, isError, message } = useSelector(
    (state) => state.books
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!user) {
      navigate("/login");
    }

    dispatch(getBooks());
    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <section className="heading">
        <h1>Welcome {user && user.name}</h1>
        <p>Books Dashboard</p>
      </section>
      <BookForm />
      <section className="content">
        {books.length > 0 ? (
          <div className="books">
            {books.map((book) => (
              <BookItem key={book.id} book={book} />
            ))}
          </div>
        ) : (
          <h3>You have no Books</h3>
        )}
      </section>
    </>
  );
}
export default Dashboard;

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import BookForm from "../components/BookForm";
import Spinner from "../components/Spinner";
import { reset, getBooks } from "../features/books/bookSlice";
import BookItem from "../components/BookItem";
import {
  TableBody,
  Table,
  TableHead,
  TableRow,
  TableCell,
} from "@material-ui/core";
import useTable from "../components/useTable";

function Dashboard() {
  const headCells = [
    { id: "bookname", label: "Book" },
    { id: "author", label: "Author" },
  ];

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { books, isLoading, isError, message } = useSelector(
    (state) => state.books
  );

  const { TblContainer, TblHead } = useTable(books, headCells);

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
          <TblContainer>
            <TblHead />
            <TableBody>
              {books.map((book) => (
                <TableRow key={book.id}>
                  <TableCell>{book.title}</TableCell>
                  <TableCell>{book.author}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </TblContainer>
        ) : (
          <h3>You have not Books</h3>
        )}
      </section>
    </>
  );
}

export default Dashboard;

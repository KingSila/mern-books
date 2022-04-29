import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import BookForm from "../components/BookForm";
import Spinner from "../components/Spinner";
import {
  reset,
  getBooks,
  deleteBook,
  bookSlice,
} from "../features/books/bookSlice";
import CreateIcon from "@material-ui/icons/Create";

import {
  Box,
  Button,
  Snackbar,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
} from "@material-ui/core";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import AddBoxIcon from "@material-ui/icons/AddBox";
import DoneIcon from "@material-ui/icons/Done";
import ClearIcon from "@material-ui/icons/Clear";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import useTable from "../components/useTable";

// Creating styles
const useStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
  table: {
    minWidth: 650,
  },
  snackbar: {
    bottom: "104px",
  },
});

function Dashboard() {
  const { user } = useSelector((state) => state.auth);
  const { books, isLoading, isError, message } = useSelector(
    (state) => state.books
  );

  // Creating style object
  const classes = useStyles();

  // Defining a state named rows
  // which we can update by calling on setRows function
  // const [rows, setRows] = React.useState([{ id: 1, book: "", author: "" }]);

  const headCells = [
    { id: "bookname", label: "Book" },
    { id: "author", label: "Author" },
  ];

  // Initial states
  const [open, setOpen] = React.useState(false);
  const [isEdit, setEdit] = React.useState(false);
  const [disable, setDisable] = React.useState(true);
  const [showConfirm, setShowConfirm] = React.useState(false);

  // Function For closing the alert snackbar
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  // Function For adding new row object
  const handleAdd = () => {
    // setRows([
    //   ...books,
    //   {
    //     id: books.length + 1,
    //     book: "",
    //     author: "",
    //   },
    // ]);
    setEdit(true);
  };

  // Function to handle edit
  const handleEdit = (i) => {
    // If edit mode is true setEdit will
    // set it to false and vice versa
    setEdit(!isEdit);
  };

  // Function to handle save
  const handleSave = () => {
    setEdit(!isEdit);

    console.log("saved : ", books);
    setDisable(true);
    setOpen(true);
  };

  // The handleInputChange handler can be set up to handle
  // many different inputs in the form, listen for changes
  // to input elements and record their values in state
  const handleInputChange = (e, index) => {
    setDisable(false);
    const { name, value } = e.target;
    console.log(name);
    console.log(value);
  };

  // Showing delete confirmation to users
  const handleConfirm = () => {
    setShowConfirm(true);
  };

  // Handle the case of delete confirmation where
  // user click yes delete a specific row of id:i
  const handleRemoveClick = () => {
    setShowConfirm(false);
  };

  // Handle the case of delete confirmation
  // where user click no
  const handleNo = () => {
    setShowConfirm(false);
  };

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
      {<BookForm />}

      <section className="content">
        {books.length > 0 ? (
          <TableBody>
            <Snackbar
              open={open}
              autoHideDuration={2000}
              onClose={handleClose}
              className={classes.snackbar}
            >
              <Alert onClose={handleClose} severity="success">
                Record saved successfully!
              </Alert>
            </Snackbar>
            <Box margin={1}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                  {isEdit ? (
                    <div>
                      <Button onClick={handleAdd}>
                        <AddBoxIcon onClick={handleAdd} />
                        ADD
                      </Button>
                      {books.length !== 0 && (
                        <div>
                          {disable ? (
                            <Button disabled align="right" onClick={handleSave}>
                              <DoneIcon />
                              SAVE
                            </Button>
                          ) : (
                            <Button align="right" onClick={handleSave}>
                              <DoneIcon />
                              SAVE
                            </Button>
                          )}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div>
                      <Button onClick={handleAdd}>
                        <AddBoxIcon onClick={handleAdd} />
                        ADD
                      </Button>
                      <Button align="right" onClick={handleEdit}>
                        <CreateIcon />
                        EDIT
                      </Button>
                    </div>
                  )}
                </div>
              </div>
              <TableRow align="center"> </TableRow>

              <Table
                className={classes.table}
                size="small"
                aria-label="a dense table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell>Book</TableCell>
                    <TableCell>Author</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {books.map((book, i) => {
                    return (
                      <div>
                        <TableRow>
                          {isEdit ? (
                            <div>
                              <TableCell padding="none">
                                <input
                                  value={book.title}
                                  name="book"
                                  onChange={(e) => handleInputChange(e, i)}
                                />
                              </TableCell>
                              <TableCell padding="none">
                                <input
                                  value={book.author}
                                  name="author"
                                  onChange={(e) => handleInputChange(e, i)}
                                />
                              </TableCell>
                            </div>
                          ) : (
                            <div>
                              <TableCell component="th" scope="row">
                                {book.title}
                              </TableCell>
                              <TableCell component="th" scope="row">
                                {book.author}
                              </TableCell>

                              <TableCell
                                component="th"
                                scope="row"
                                align="center"
                              ></TableCell>
                            </div>
                          )}
                          {isEdit ? (
                            <Button className="mr10" onClick={handleConfirm}>
                              <ClearIcon />
                            </Button>
                          ) : (
                            <Button className="mr10" onClick={handleConfirm}>
                              <DeleteOutlineIcon />
                            </Button>
                          )}
                          {showConfirm && (
                            <div>
                              <Dialog
                                open={showConfirm}
                                onClose={handleNo}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                              >
                                <DialogTitle id="alert-dialog-title">
                                  {"Confirm Delete"}
                                </DialogTitle>
                                <DialogContent>
                                  <DialogContentText id="alert-dialog-description">
                                    Are you sure to delete
                                  </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                  <Button
                                    onClick="{dispatch(deleteBook(book._id));{handleRemoveClick};''
                                    
                                    color="primary"
                                    autoFocus
                                  >
                                    Yes
                                  </Button>
                                  <Button
                                    onClick={handleNo}
                                    color="primary"
                                    autoFocus
                                  >
                                    No
                                  </Button>
                                </DialogActions>
                              </Dialog>
                            </div>
                          )}
                        </TableRow>
                      </div>
                    );
                  })}
                </TableBody>
              </Table>
            </Box>
          </TableBody>
        ) : (
          <h3>You have not Books</h3>
        )}
      </section>
    </>
  );
}

export default Dashboard;

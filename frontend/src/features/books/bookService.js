import axios from "axios";

const API_URL = "/api/books/";

//Add Book
const addBook = async (bookData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, bookData, config);

  if (response.data) {
    localStorage.setItem("book", JSON.stringify(response.data));
  }

  return response.data;
};

//Get Books
const getBooks = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);

  if (response.data) {
    localStorage.setItem("book", JSON.stringify(response.data));
  }

  return response.data;
};

//Delete  Book
const deleteBook = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(API_URL + id, config);

  return response.data;
};

const bookService = {
  addBook,
  getBooks,
  deleteBook,
};

export default bookService;

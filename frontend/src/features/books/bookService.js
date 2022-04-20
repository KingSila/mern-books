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

const bookService = {
  addBook,
};

export default bookService;

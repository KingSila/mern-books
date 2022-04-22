import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import bookService from "./bookService";

const initialState = {
  books: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

//Add a new book

export const addBook = createAsyncThunk(
  "books/add",
  async (bookData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;

      return await bookService.addBook(bookData, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(addBook.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addBook.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.books.push(action.payload);
      })
      .addCase(addBook.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = bookSlice.actions;
export default bookSlice.reducer;

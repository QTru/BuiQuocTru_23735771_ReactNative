import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { Book } from "../types/book";
import type { RootState } from "./index";

const API_URL = "https://my.api.mockaroo.com/books?key=212e1540";

export const fetchBooks = createAsyncThunk<Book[], void, { rejectValue: string }>(
  "books/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error(`Lỗi HTTP ${response.status}`);
      return (await response.json()) as Book[];
    } catch (e) {
      return rejectWithValue(
        e instanceof Error ? e.message : "Không tải được dữ liệu",
      );
    }
  },
);

const booksAdapter = createEntityAdapter<Book>();

const booksSlice = createSlice({
  name: "books",
  initialState: booksAdapter.getInitialState({
    status: "idle" as "idle" | "loading" | "succeeded" | "failed",
    error: null as string | null,
  }),
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.status = "succeeded";
        booksAdapter.setAll(state, action.payload);
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ?? "Không tải được dữ liệu";
      });
  },
});

export default booksSlice.reducer;

export const booksSelectors = booksAdapter.getSelectors(
  (state: RootState) => state.books,
);

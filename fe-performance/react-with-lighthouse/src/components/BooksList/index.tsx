import { FC } from "react";
import { Book } from "../../store/reducers/books";
import BookItem from "../BookItem";

type BookList = { books: Book[] };

const BooksList: FC<BookList> = ({ books }) => (
  <>
    {books.map((book) => (
      <BookItem book={book} key={book.id} />
    ))}
  </>
);

export default BooksList;

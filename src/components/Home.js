import React from "react";
import { Row, Col } from "react-bootstrap";
import Book from "./Book";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import bookAction from "../actions/bookAction";
import DataLoader from "./DataLoader";
import Message from "./Message";
const Home = () => {
  const dispatch = useDispatch();
  const listOfBooksReducer = useSelector((state) => state.bookList);
  const { loading, error, books } = listOfBooksReducer;
  const googleBooksReducer = useSelector((state) => state.googleBooks);
  const { googleBooks, googleBooksError, searching } = googleBooksReducer;
  useEffect(() => {
    console.log("Dispatching...BookList");
    dispatch(bookAction());
  }, [dispatch]);

  let resultantBooks = [...googleBooks, ...books];
  return (
    <div>
      {loading || searching ? (
        <DataLoader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : googleBooksError ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          {resultantBooks.map((book) => (
            <Col key={book.bookId} sm={12} md={6} g={4} xl={3}>
              <Book book={book}></Book>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default Home;

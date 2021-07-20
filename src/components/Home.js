import React from "react";
import { Row, Col } from "react-bootstrap";
import Book from "./Book";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { bookAction } from "../actions/bookAction";
import DataLoader from "./DataLoader";
import Message from "./Message";
import Reactpaginate from "react-paginate";
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

  let resultantBooks = [];
  if (books && googleBooks) resultantBooks = [...googleBooks, ...books];

  let noOfBooksPerPage = 8;
  const [pageNumber, setPageNumber] = useState(0);
  const pagesVisited = pageNumber * noOfBooksPerPage;
  const pageCount = Math.ceil(resultantBooks.length / noOfBooksPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };
  const displayBooks = resultantBooks
    .slice(pagesVisited, pagesVisited + noOfBooksPerPage)
    .map((book) => {
      return (
        <Col key={book.bookId} sm={12} md={6} g={4} xl={3}>
          <Book book={book}></Book>
        </Col>
      );
    });

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
          {displayBooks}
          <br></br>
          <br></br>
          &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;
          <Row style={{ justifyContent: "center" }}>
            <Reactpaginate
              previousLabel={"prev"}
              nextLabel={"next"}
              pageCount={pageCount}
              onPageChange={changePage}
              containerClassName={"paginationButtons"}
              previousClassName={"previousLink"}
              nextLinkClassName={"nextLink"}
              disabledClassName={"disabledLink"}
              activeClassName={"pageActive"}
              initialPage={0}
            />
          </Row>
        </Row>
      )}
    </div>
  );
};

export default Home;

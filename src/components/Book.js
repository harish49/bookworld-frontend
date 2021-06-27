import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "react-rater/lib/react-rater.css";
const Book = ({ book }) => {
  let averageRating = 0;
  book.reviews.forEach(
    (review) => (averageRating = averageRating + review.rating)
  );
  let rating = averageRating / book.reviews.length;
  return (
    <Card className="my-3 p-3 rounded shadow rounded" style={{ height: 450 }}>
      <Link to={`/books/defaultbooks/${book.bookId}`}>
        <Card.Img
          src={book.thumbnail}
          style={{
            height: 250,
          }}
        />
      </Link>
      <Card.Body>
        <Link to={`/books/defaultbooks/${book.bookId}`}>
          <Card.Title as="div">
            <strong>{book.title}</strong>
          </Card.Title>
        </Link>
        <Card.Text as="div">
          <div className="my-1">
            {rating >= 1 ? (
              <i
                className="fa fa-star checked"
                style={{ color: "#fc9403" }}
              ></i>
            ) : (
              <i className="fa fa-star"></i>
            )}
            {rating >= 2 ? (
              <i
                className="fa fa-star
       checked"
                style={{ color: "#fc9403" }}
              ></i>
            ) : (
              <i
                className="fa fa-star
      "
              ></i>
            )}
            {rating >= 3 ? (
              <i
                className="fa fa-star
       checked"
                style={{ color: "#fc9403" }}
              ></i>
            ) : (
              <i
                className="fa fa-star
      "
              ></i>
            )}
            {rating >= 4 ? (
              <i
                className="fa fa-star
       checked"
                style={{ color: "#fc9403" }}
              ></i>
            ) : (
              <i
                className="fa fa-star
      "
              ></i>
            )}
            {rating >= 5 ? (
              <i
                className="fa fa-star
       checked"
                style={{ color: "#fc9403" }}
              ></i>
            ) : (
              <i
                className="fa fa-star
      "
              ></i>
            )}
            {book.reviews.length} reviews
          </div>
        </Card.Text>
        <Card.Text as="div">
          <div className="my-1">₹{book.price}</div>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Book;

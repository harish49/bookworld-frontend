import React from "react";
import { Form, Button, FormControl } from "react-bootstrap";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { googleBookAction } from "../actions/bookAction";
const Search = () => {
  const [searchItem, setSearchItem] = useState("");
  const dispatch = useDispatch();
  const formsubmitHandler = (e) => {
    e.preventDefault();
    dispatch(googleBookAction(searchItem));
    console.log("Getting book from google");
  };

  return (
    <>
      <Form onSubmit={formsubmitHandler} className="d-flex ">
        <FormControl
          type="search"
          placeholder="Search"
          className="mr-1 rounded ms-5"
          aria-label="Search"
          style={{ width: 400, height: 40 }}
          value={searchItem}
          onChange={(e) => setSearchItem(e.target.value)}
        />
        <Button
          type="submit"
          variant="warning"
          className="rounded"
          style={{ height: 41 }}
        >
          <i class="fas fa-search" style={{ color: "black" }}></i>
        </Button>
      </Form>
    </>
  );
};

export default Search;

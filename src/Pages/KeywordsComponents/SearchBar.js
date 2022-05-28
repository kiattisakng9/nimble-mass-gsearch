import React, { useRef } from "react";
import { Button, Col, Row } from "react-bootstrap";

const SearchBar = (props) => {
  const searchTerm = useRef("");
  const setSearchTerm = props.setSearchTerm;

  // Handle on change of search term inputs
  const handleOnChangeInput = (evt) => {
    const value = evt.target.value;

    // Reset selected keyword result
    if (value === "") setSearchTerm("");

    searchTerm.current = value.trim();
  };

  // Set search term after pressing the enter key
  const handleKeyPress = (target) => {
    // Enter key is pressed
    if (target.charCode == 13) setSearchTerm(searchTerm.current);
  };

  return (
    <Row id='search-bar-container'>
      <Col md={10}>
        <input
          id='search-bar'
          type='text'
          placeholder='Search keywords'
          onChange={handleOnChangeInput}
          onKeyPress={handleKeyPress}
        />
      </Col>
      <Col md={2}>
        <Button
          variant='primary'
          onClick={() => setSearchTerm(searchTerm.current)}
        >
          Search
        </Button>
      </Col>
    </Row>
  );
};

export default SearchBar;

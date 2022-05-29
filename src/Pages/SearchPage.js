import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import CSVInput from "./SearchComponents/CSVInput";
import UploadResults from "./SearchComponents/UploadResults";

const SearchPage = () => {
  return (
    <Container>
      <Row>
        <Col md={12}>
          <h3>Search Keywords</h3>
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <CSVInput />
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <UploadResults />
        </Col>
      </Row>
    </Container>
  );
};

export default SearchPage;

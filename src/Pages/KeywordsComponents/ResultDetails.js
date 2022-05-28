import React from "react";
import { Col, Row } from "react-bootstrap";

const ResultDetails = (props) => {
  const details = props.details;

  return (
    <div>
      <Row>
        <h4>
          <b>Keyword:</b> {details.keyword}
        </h4>
      </Row>
      <Row>
        <Col md={6}>
          <h5>Number of Adwords: {details.adwords_number}</h5>
        </Col>
        <Col md={6}>
          <h5>Number of links: {details.links_number}</h5>
        </Col>
      </Row>
      <Row>
        <h5>Total number of search results: {details.search_results_number}</h5>
      </Row>
    </div>
  );
};

export default ResultDetails;

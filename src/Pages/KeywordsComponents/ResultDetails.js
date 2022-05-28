import React from "react";
import { Col, Row } from "react-bootstrap";
import { numberWithCommas } from "../../Util/numberFormatter";

const ResultDetails = (props) => {
  const details = props.details;

  // Format details
  const keyword = details.keyword;
  const adwordsNo = numberWithCommas(details.adwords_number);
  const linksNo = numberWithCommas(details.links_number);
  const searchResultsNo = numberWithCommas(details.search_results_number);

  return (
    <div>
      <Row>
        <h4>
          <b>Keyword:</b> {keyword}
        </h4>
      </Row>
      <Row>
        <Col md={6}>
          <h5>Number of Adwords: {adwordsNo}</h5>
        </Col>
        <Col md={6}>
          <h5>Number of links: {linksNo}</h5>
        </Col>
      </Row>
      <Row>
        <h5>Total number of search results: {searchResultsNo}</h5>
      </Row>
    </div>
  );
};

export default ResultDetails;

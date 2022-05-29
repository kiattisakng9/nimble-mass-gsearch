import React from "react";
import { Row } from "react-bootstrap";
import parse from "html-react-parser";
import { decode } from "html-entities";
import EmptyResultPreview from "./EmptyResultPreview";
import ResultDetails from "./ResultDetails";

const ResultsPreview = (props) => {
  const selectedResult = props.selectedKeyword;

  // Encoded result body string
  const encodedBodyHTML = selectedResult?.body?.body_html
    ? `${selectedResult?.body?.body_html}`
    : "";

  const parsedBody = parse(encodedBodyHTML);

  // Decode result body string
  const joinedBodyHTML = Array.isArray(parsedBody)
    ? parsedBody.join("")
    : parsedBody;

  const decodedBodyHTML = decode(joinedBodyHTML);

  return (
    <div>
      {selectedResult != null ? (
        <Row>
          <ResultDetails details={selectedResult} />
          <hr />
          <div id='body-preview'>{parse(decodedBodyHTML)}</div>
        </Row>
      ) : (
        <EmptyResultPreview />
      )}
    </div>
  );
};

export default ResultsPreview;

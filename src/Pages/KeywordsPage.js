import React, { useRef } from "react";
import Axios from "axios";
import { useAuth } from "./../Contexts/AuthContext";
import { Row, Col, Container } from "react-bootstrap";
import ResultsPreview from "./KeywordsComponents/ResultsPreview";
import SearchBar from "./KeywordsComponents/SearchBar";
import KeywordsList from "./KeywordsComponents/KeywordsList";

const KeywordsPage = () => {
  const auth = useAuth();
  const user = auth.user;
  const userID = useRef(user.id);

  return (
    <div>
      <Container>
        <Row>
          <Col md={12}>
            <h3>Keywords</h3>
          </Col>
        </Row>
        <Row id='main-keywords-panel'>
          <Col md={5}>
            <Row>
              <SearchBar />
            </Row>
            <Row>
              <KeywordsList />
            </Row>
          </Col>
          <Col md={7}>
            <ResultsPreview />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default KeywordsPage;

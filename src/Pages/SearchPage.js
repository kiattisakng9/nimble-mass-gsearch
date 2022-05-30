import React, { useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import CSVInput from "./SearchComponents/CSVInput";
import Preloader from "./SearchComponents/Preloader";
import UploadResults from "./SearchComponents/UploadResults";

const SearchPage = () => {
  // Counters
  const [submittedCount, setSubmittedCount] = useState(0);
  const [duplicatesCount, setDuplicatesCount] = useState(0);
  const [executedCount, setExecutedCount] = useState(0);
  const [successCount, setSuccessCount] = useState(0);
  const [failCount, setFailCount] = useState(0);

  const [isExecuting, setIsExecuting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  return (
    <Container>
      <Row>
        <Col md={12}>
          <h3>Search Keywords</h3>
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <CSVInput
            setSubmittedCount={setSubmittedCount}
            setDuplicatesCount={setDuplicatesCount}
            setExecutedCount={setExecutedCount}
            setSuccessCount={setSuccessCount}
            setFailCount={setFailCount}
            setIsExecuting={setIsExecuting}
            setIsComplete={setIsComplete}
          />
        </Col>
      </Row>
      {isComplete && (
        <Row>
          <Col md={12}>
            <UploadResults
              submitted={submittedCount}
              duplicates={duplicatesCount}
              executed={executedCount}
              success={successCount}
              fail={failCount}
            />
          </Col>
        </Row>
      )}
      {isExecuting && <Preloader />}
    </Container>
  );
};

export default SearchPage;

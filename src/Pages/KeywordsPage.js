import React, { useRef, useState, useEffect } from "react";
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
  const [keywords, setKeywords] = useState([]);
  const [selectedKeyword, setSelectedKeyword] = useState(null);
  const [selectedID, setSelectedID] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const newUserID = user.id;

    if (userID.current != newUserID) userID.current = newUserID;
  }, [user]);

  useEffect(() => {
    // Fetch keywords of current user
    const fetchKeywords = async (userID) => {
      const keywords = await Axios.get(`/search_results/user/${userID}`)
        .then((res) => (!res.data?.error ? res.data : []))
        .catch((err) => {
          console.log(err);
          return [];
        });

      // Sort keyword results by ID
      const sortedKeywords = keywords.sort((a, b) => a.id - b.id);

      setKeywords(sortedKeywords);
    };

    // Fetch keyword results of user
    const currentUserID = userID.current;
    fetchKeywords(currentUserID);
  }, [userID.current]);

  // Handles event when selected keyword ID is changed
  useEffect(() => {
    handleOnKeywordIDChange(selectedID, keywords);
  }, [selectedID]);

  // Function to handle when keyword is selected
  const handleOnKeywordIDChange = (id, keywords) => {
    const keywordResult = keywords.filter((res) => res.id === id);

    setSelectedKeyword(keywordResult);
  };

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
              <KeywordsList keywords={keywords} setSelectedID={setSelectedID} />
            </Row>
          </Col>
          <Col md={7}>
            <ResultsPreview selectedKeyword={selectedKeyword} />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default KeywordsPage;

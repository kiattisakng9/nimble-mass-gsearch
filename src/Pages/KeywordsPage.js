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
    // Fetch keyword results of user
    const currentUserID = userID.current;
    fetchKeywords(currentUserID);
  }, [userID.current]);

  // Handles event when selected keyword ID is changed
  useEffect(() => {
    handleOnKeywordIDChange(selectedID, keywords);
  }, [selectedID]);

  // Search for keywords result with term entered
  useEffect(() => {
    const currentUserID = userID.current;
    fetchKeywordsWithTerm(currentUserID, searchTerm);
  }, [searchTerm]);

  // Reset selected keyword result to null
  useEffect(() => {
    resetSelectedKeyword();
  }, [keywords]);

  // Function to handle when keyword is selected
  const handleOnKeywordIDChange = (id, keywords) => {
    const keywordResult = keywords.filter((res) => res.id === id);

    // Set as selected if keyword result matches its ID
    if (keywordResult.length > 0) setSelectedKeyword(keywordResult[0]);
    else setSelectedKeyword(null);
  };

  // Fetch keywords of current user
  const fetchKeywords = (userID) => {
    const allKeywordsUTRI = `/search_results/user/${userID}`;
    handleRequests(allKeywordsUTRI);
  };

  // Fetch keywords of current user based on search term
  const fetchKeywordsWithTerm = (userID, searchTerm) => {
    const searchTermURI = `/search_results/user/${userID}/search?keyword=%${searchTerm}%`;
    handleRequests(searchTermURI);
  };

  // Handle API requests for keyword results fetching
  const handleRequests = async (uri) => {
    const keywords = await Axios.get(uri)
      .then((res) => (!res.data?.error ? res.data : []))
      .catch((err) => {
        console.log(err);
        return [];
      });

    // Sort keyword results by ID
    const sortedKeywords = keywords.sort((a, b) => a.id - b.id);

    setKeywords(sortedKeywords);
  };

  // Remove selected keyword result
  const resetSelectedKeyword = () => {
    setSelectedKeyword(null);
    setSelectedID(null);
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
              <SearchBar setSearchTerm={setSearchTerm} />
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

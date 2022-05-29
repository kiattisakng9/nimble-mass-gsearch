import Axios from "axios";
import React, { useRef, useState } from "react";
import { Row } from "react-bootstrap";
import CSVReader from "react-csv-reader";
import { encode } from "html-entities";
import { useAuth } from "./../../Contexts/AuthContext";

const CSVInput = () => {
  const auth = useAuth();
  const [errorMessage, setErrorMessage] = useState("");

  // Counters
  const submittedCount = useRef(0);
  const duplicatesCount = useRef(0);
  const executedCount = useRef(0);
  const [successCount, setSuccessCount] = useState(0);
  const [failCount, setFailCount] = useState(0);

  const [isComplete, setIsComplete] = useState(false);

  const papaparseOptions = {
    header: false,
    dynamicTyping: true,
    skipEmptyLines: true,
  };

  // Handle contents of CSV file input
  const handleCSVInput = (data, fileInfo, originalFile) => {
    // Reset error message and reset counts
    setErrorMessage("");
    resetCounts();
    setIsComplete(false);

    // CSV file exceeds 1 MB in size
    if (fileInfo.size > 1000000) return handleError("File size exceed 1MB");

    // Validate and get unique keywords from CSV file
    const uniqueKeywords = validateKeywords(data);

    massSearch(uniqueKeywords);
  };

  // Validate keywords in CSV file
  const validateKeywords = (data) => {
    const dataIsVertical = data.length >= 1 && data[0].length === 1;
    const dataIsHorizontal = data.length === 1 && data[0].length >= 1;

    let keywords = [];

    // Check if CSV file's direction is horizontal or vertical
    switch (true) {
      case dataIsVertical:
        keywords = handleVerticalCSV(data);
        break;
      case dataIsHorizontal:
        keywords = handleHorizontalCSV(data);
        break;

      default:
        return handleError("Invalid CSV file");
    }

    // Trim keywords
    const trimmedKeywords = keywords.map((keywords) => keywords.trim());

    // CSV file must be at least 1 to 100 keywords
    const numberOfKeywords = trimmedKeywords.length;
    if (numberOfKeywords < 1 || numberOfKeywords > 100)
      return handleError(
        "Number of keywords submitted must be at least 1 to 100 keywords"
      );

    // Remove duplicated keywords (case-insensitive)
    const uniqueKeywords = removeDuplicatesCaseInsensitive(trimmedKeywords);

    // Set counts
    setInitialCounts(trimmedKeywords, uniqueKeywords);

    return uniqueKeywords;
  };

  // Handle vertical CSV files
  const handleVerticalCSV = (data) => data.map((row) => row[0]);

  // Handle horizontal CSV files
  const handleHorizontalCSV = (data) => data[0];

  // Remove duplicated keywords from array
  const removeDuplicatesCaseInsensitive = (arr) => {
    const res = [];
    arr.forEach(function (i) {
      if (!(res.includes(i) || res.includes(i.toLowerCase()))) res.push(i);
    });

    return res;
  };

  // Make google search queries
  const massSearch = (keywords) => {
    // Get search query endpoints for each keyword
    const endpoints = keywords.map((query) => getURI(query));
    const queryAPIs = endpoints.map((endpoint) => Axios.get(endpoint));

    // Make requests
    Axios.all(queryAPIs).then((responses) => {
      const responseData = responses.map((response) => response?.data);
      handleMassResults(responseData);
    });
  };

  // Handle all responses
  const handleMassResults = async (responses) => {
    // Scan responses to get required information
    const requestParams = responses.map((response) =>
      handleSingleResult(response)
    );

    // Request parameters
    const SRParams = requestParams.map((params) => params.searchResultParam);
    const RBParams = requestParams.map((params) => params.resultBodyParam);

    // Prepare search results API request
    const SRRequests = SRParams.map((param) =>
      Axios.post("/search_results", param)
    );

    // Make create new search result request
    Axios.all(SRRequests).then((SRResponses) => {
      const responsesData = SRResponses.map((response) => response?.data);

      const successRequests = responsesData.filter((data) => !data?.error);

      const mappedRBParams = [];

      // Map successful requests to result body parameters
      for (let i = 0; i < successRequests.length; i++) {
        const req = successRequests[i];
        const reqKeyword = req.keyword;
        const reqNewID = req.id;

        for (let j = 0; j < RBParams.length; j++) {
          const param = RBParams[j];
          if (reqKeyword == param.keyword) {
            mappedRBParams.push({ ...param, result_id: reqNewID });
            break;
          }
        }
      }

      // Prepare result body API requests
      const RBRequests = mappedRBParams.map((param) =>
        Axios.post("/bodies", param)
      );

      // Make create new result body request
      Axios.all(RBRequests).then((RBResponses) => {
        const RBResponsesData = RBResponses.map((response) => response?.data);

        const RBSuccessRequests = RBResponsesData.filter(
          (data) => !data?.error
        );

        // Set response counts
        setResponseCounts(requestParams, RBSuccessRequests);
        setIsComplete(true);
      });
    });
  };

  // Scan response to get required information
  const handleSingleResult = (response) => {
    const userID = auth.user.id;
    const keyword = response?.keyword;
    const body = response?.body;

    // Get <body> tag from the whole HTML document
    const cacheVersion = body.match(/<body[^>]*>(.*?)<\/body>/is);
    const joinedCacheVersion =
      cacheVersion != null ? cacheVersion.join("") : "";

    const encodedBody = encode(joinedCacheVersion);

    // Get number of Adwords by searching for <span> tags with 'Ad' string
    const adwordsMatch = body.match(/<span .+?Ad<\/span>/g);
    const adwordsNumber = adwordsMatch != null ? adwordsMatch.length : 0;

    // Get total number of links by searching for <a> tags
    const allLinksMatch = body.match(/<a href.+?a>/g);
    const allLinksNumber = allLinksMatch != null ? allLinksMatch.length : 0;

    // Search for string 'About {number} results' and extract the number
    const resultStatsMatch = body.match(/About .+? results/g);
    let resultsNumber =
      resultStatsMatch != null ? getResultNumber(resultStatsMatch[0]) : 0;

    // Return parameters to create new search requests and bodies
    const resultObj = {
      searchResultParam: {
        keyword,
        adwords_number: adwordsNumber,
        links_number: allLinksNumber,
        search_results_number: resultsNumber,
        user_id: userID,
      },
      resultBodyParam: {
        keyword,
        body_html: encodedBody,
      },
    };

    return resultObj;
  };

  const getResultNumber = (str) => {
    const resultStatsString = str;
    const splitString = resultStatsString.split(" ");
    const resultsNumber = parseInt(splitString[1].replace(/,/g, ""));

    return resultsNumber;
  };

  // Get google search with query URI
  const getURI = (query) => {
    const encodedQuery = encodeURIComponent(query);
    return `/gsearch/search?query=${encodedQuery}`;
  };

  // Set keywords uploaded counts
  const setInitialCounts = (totalArr, uniqueArr) => {
    const totalSize = totalArr.length;
    const uniqueSize = uniqueArr.length;
    const duplicatedSize = totalSize - uniqueSize;

    submittedCount.current = totalSize;
    executedCount.current = uniqueSize;
    duplicatesCount.current = duplicatedSize;
  };

  // Set response counts
  const setResponseCounts = (totalArr, successArr) => {
    const totalSize = totalArr.length;
    const successSize = successArr.length;
    const failedSize = totalSize - successSize;

    setSuccessCount(successSize);
    setFailCount(failedSize);
  };

  // Reset counts
  const resetCounts = () => {
    submittedCount.current = 0;
    duplicatesCount.current = 0;
    executedCount.current = 0;
    setSuccessCount(0);
    setFailCount(0);
  };

  // Handle input error
  const handleError = (err) => setErrorMessage(err);

  return (
    <>
      <Row className='center-container'>
        <CSVReader
          onFileLoaded={handleCSVInput}
          accept='.csv, text/csv'
          strict={true}
          label='Select CSV with keywords'
          cssClass='react-csv-input'
          parserOptions={papaparseOptions}
          onError={(err) => handleError(err.message)}
        />
      </Row>
      <Row>
        {errorMessage && (
          <span className='error-message'>* {errorMessage}</span>
        )}
      </Row>
    </>
  );
};

export default CSVInput;

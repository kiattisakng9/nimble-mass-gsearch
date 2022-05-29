import React, { useState } from "react";
import { Row } from "react-bootstrap";
import CSVReader from "react-csv-reader";

const CSVInput = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const papaparseOptions = {
    header: false,
    dynamicTyping: true,
    skipEmptyLines: true,
  };

  // Handle contents of CSV file input
  const handleCSVInput = (data, fileInfo, originalFile) => {
    // Reset error message
    setErrorMessage("");

    // CSV file exceeds 1 MB in size
    if (fileInfo.size > 1000000) return handleError("File size exceed 1MB");

    // Validate and get unique keywords from CSV file
    const uniqueKeywords = validateKeywords(data);
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

    /**
     * Remove duplicated keywords (case-insensitive)
     * to avoid making unnecessary requests
     */
    const uniqueKeywords = removeDuplicatesCaseInsensitive(trimmedKeywords);

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

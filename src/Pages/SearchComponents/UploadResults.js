import React from "react";

const UploadResults = (props) => {
  // Result counts
  const submitted = props.submitted;
  const duplicates = props.duplicates;
  const executed = props.executed;
  const success = props.success;
  const fail = props.fail;

  return (
    <div className='center-container result-preview'>
      <h4>Upload Results</h4>
      <p>
        The uploaded file contains <b>{submitted}</b> keywords,{" "}
        <b>{duplicates}</b> duplicated keywords.
      </p>

      <ul>
        <li>
          Total keywords executed: <b>{executed}</b>
        </li>
        <li>
          Successful insertion: <b>{success}</b>
        </li>
        <li>
          Failed insertions: <b>{fail}</b>
        </li>
      </ul>
    </div>
  );
};

export default UploadResults;

import React from "react";
import { ListGroup } from "react-bootstrap";
import KeywordsItem from "./KeywordsItem";
import EmptyKeywordsList from "./EmptyKeywordsList";

const KeywordsList = (props) => {
  const keywords = props.keywords;
  const setSelectedID = props.setSelectedID;

  // Build keywords list
  const buildList = (keywords) => {
    const keywordItems = keywords.map((keywordObj) => {
      const keywordID = keywordObj.id;
      const title = keywordObj.keyword;

      return (
        <>
          <KeywordsItem
            key={keywordID}
            keywordID={keywordID}
            title={title}
            setSelectedID={setSelectedID}
          />
        </>
      );
    });

    return keywordItems;
  };

  return (
    <div className='keywords-list-container'>
      {keywords.length > 0 ? (
        <ListGroup>{buildList(keywords)}</ListGroup>
      ) : (
        <EmptyKeywordsList />
      )}
    </div>
  );
};

export default KeywordsList;

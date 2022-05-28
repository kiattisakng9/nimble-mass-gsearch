import React, { useRef } from "react";
import { ListGroup } from "react-bootstrap";

const KeywordsItem = (props) => {
  const setSelectedID = props.setSelectedID;
  const ID = useRef(props.keywordID);
  const title = useRef(props.title);

  // Set selected keywords ID
  const handleItemClick = () => {
    const currentID = ID.current;
    setSelectedID(currentID);
  };

  return (
    <ListGroup.Item action onClick={handleItemClick}>
      {title.current}
    </ListGroup.Item>
  );
};

export default KeywordsItem;

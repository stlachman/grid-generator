import React from "react";
import styled from "@emotion/styled";

const Button = styled.button`
  background: #f6ad55;
  color: #f9f9f9;
  padding: 0.8em 1.25em;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  border: 0.25rem #f6ad55 solid;
  border-radius: 0.25rem;
  margin: ${({ margin }) => (margin ? margin : "0 1em")};
  box-shadow: 0 6px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.09);
`;

export default ({ handleClick, text, margin }) => {
  return (
    <Button margin={margin} onClick={handleClick}>
      {text}
    </Button>
  );
};

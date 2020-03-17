import React from "react";
import styled from "@emotion/styled";

const Pre = styled.pre`
  overflow: auto;
  margin: 0;
  padding: 2em 0;
  word-spacing: normal;
  word-wrap: normal;
  word-break: normal;
`;

const Code = styled.code`
  font-weight: 500;
  background-color: #eee;
  padding: 2em 1em;
  display: block;
`;

export default function({ gridStyles, codeRef }) {
  return (
    <Pre>
      <Code ref={codeRef}>
        <span>display: grid;</span>
        <br />
        <span>grid-template-rows: {gridStyles.gridTemplateRows};</span>
        <br />
        <span>grid-template-columns: {gridStyles.gridTemplateColumns};</span>
        <br />
        <span>row-gap:{gridStyles.rowGap};</span>
        <br />
        <span>column-gap: {gridStyles.columnGap};</span>
      </Code>
    </Pre>
  );
}

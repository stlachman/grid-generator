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
`;

export default function({ gridStyles, codeRef }) {
  return (
    <Pre>
      <Code ref={codeRef}>
        display: grid; grid-template-rows: {gridStyles.gridTemplateRows};
        grid-template-columns: {gridStyles.gridTemplateColumns}; row-gap:
        {gridStyles.rowGap}; column-gap: {gridStyles.columnGap};
      </Code>
    </Pre>
  );
}

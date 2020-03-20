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
  font-weight: 600;
  background-color: #e2e8f0;
  padding: 2em 1em;
  display: block;
`;

const Styles = styled.span`
  display: inline-block;
  margin-top: 0.25rem;
  font-size: 0.9rem;
`;

export default function({ gridStyles, codeRef }) {
  return (
    <Pre>
      <Code ref={codeRef}>
        <Styles>display: grid;</Styles>
        <br />
        <Styles>grid-template-rows: {gridStyles.gridTemplateRows};</Styles>
        <br />
        <Styles>
          grid-template-columns: {gridStyles.gridTemplateColumns};
        </Styles>
        <br />
        <Styles>row-gap:{gridStyles.rowGap};</Styles>
        <br />
        <Styles>column-gap: {gridStyles.columnGap};</Styles>
      </Code>
    </Pre>
  );
}

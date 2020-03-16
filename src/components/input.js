import React from "react";
import styled from "@emotion/styled";

const InputContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: ${({ type }) => (type === "row" ? "column" : "row")};
`;

export default function({ updateValue, index, type }) {
  return (
    <InputContainer type={type}>
      <input
        style={{ maxWidth: 20 }}
        type="text"
        onBlur={e => updateValue(e, index)}
        name="column-value"
        id="column-value"
        defaultValue={"1fr"}
      />
    </InputContainer>
  );
}

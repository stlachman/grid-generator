import React from "react";
import styled from "@emotion/styled";

const InputContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: ${({ type }) => (type === "row" ? "column" : "row")};
`;

const Input = styled.input`
  border: 2px solid #f6ad55;
  background-color: #fff;
  border-radius: 0.25rem;
  padding: 0.75em;
  color: #000;
  font-weight: bold;
`;

export default function({ updateValue, index, type }) {
  return (
    <InputContainer type={type}>
      <Input
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

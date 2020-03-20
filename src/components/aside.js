import React from "react";
import styled from "@emotion/styled";
import Button from "../components/button";

const Aside = styled.aside`
  background: #e2e8f0;
  flex: 0 0 50%;
  margin-top: 50px;
  @media (min-width: 900px) {
    flex: none;
  }
`;

const Fieldset = styled.fieldset`
  display: flex;
  flex-direction: column;
  border: 0;
`;

const Label = styled.label`
  display: inline-block;
  margin-top: 1em;
  color: #000;
`;

const Input = styled.input`
  margin-top: 0.5em;
  padding: 0.65em 0.5em 0.65em 0.45em;
  font-size: 0.75rem;
  border: 2px solid #f6ad55;
  background-color: #fff;
  border-radius: 0.25rem;
`;

export default function({
  changeRows,
  rowNumber,
  changeColumns,
  columnNumber,
  updateRowGap,
  updateColumnGap,
  columnGap,
  rowGap,
  showModal
}) {
  return (
    <Aside>
      <Fieldset>
        <Label htmlFor="rows">Rows</Label>
        <Input
          type="number"
          name="rows"
          onChange={changeRows}
          value={rowNumber}
          id="rows"
          min="1"
          max="12"
        />
        <Label htmlFor="columns">Columns</Label>
        <Input
          type="number"
          name="columns"
          onChange={changeColumns}
          value={columnNumber}
          id="columns"
          min="1"
          max="12"
        />
        <Label htmlFor="column-gap">Column Gap (px)</Label>
        <Input
          type="number"
          name="column-gap"
          onChange={updateColumnGap}
          value={columnGap}
          id="column-gap"
          min="0"
          max="15"
        />
        <Label htmlFor="row-gap">Row Gap (px)</Label>
        <Input
          type="number"
          name="row-gap"
          onChange={updateRowGap}
          value={rowGap}
          id="row-gap"
          min="0"
          max="15"
        />

        <Button margin="1em 0 0 0" handleClick={showModal} text={"Grab Code"} />
      </Fieldset>
    </Aside>
  );
}

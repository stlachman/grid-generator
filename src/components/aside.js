import React from "react";
import styled from "@emotion/styled";
import Button from "../components/button";

const Aside = styled.aside`
  background: #eee;
`;

const Fieldset = styled.fieldset`
  display: flex;
  flex-direction: column;
  border: 0;
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
        <label htmlFor="rows">Rows</label>
        <input
          type="number"
          name="rows"
          onChange={changeRows}
          value={rowNumber}
          id="rows"
          min="1"
          max="12"
        />
        <label htmlFor="columns">Columns</label>
        <input
          type="number"
          name="columns"
          onChange={changeColumns}
          value={columnNumber}
          id="columns"
          min="1"
          max="12"
        />
        <label htmlFor="column-gap">Column Gap (px)</label>
        <input
          type="number"
          name="column-gap"
          onChange={updateColumnGap}
          value={columnGap}
          id="column-gap"
          min="0"
          max="15"
        />
        <label htmlFor="row-gap">Row Gap (px)</label>
        <input
          type="number"
          name="row-gap"
          onChange={updateRowGap}
          value={rowGap}
          id="row-gap"
          min="0"
          max="15"
        />
        <Button handleClick={showModal} text={"Grid Code"} />
      </Fieldset>
    </Aside>
  );
}

import React, { useState } from "react";
import styled from "@emotion/styled";
import Column from "../components/column";

const Container = styled.div`
  display: flex;
  justify-content: space-around;
`;
const Main = styled.main`
  width: calc(65vw - 40px);
  height: calc(65vh - 40px);
`;

const GridContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const Grid = styled.section`
  display: grid;
  border: 1px solid;
  width: 100%;
  height: 100%;
  position: absolute;
`;

const Aside = styled.aside`
  background: #eee;
  display: flex;
  flex-direction: column;
`;

function expandArray(len) {
  let arr = [];
  for (let i = 0; i < 5; i++) {
    arr.push(len + i + 1);
  }
  return arr;
}

const IndexPage = () => {
  const [grid, setGrid] = useState([...Array(25).keys()]);
  const [rows, setRows] = useState(5);
  const [columns, setColumns] = useState(5);
  const [columnGap, setColumnGap] = useState(0);
  const [rowGap, setRowGap] = useState(0);

  const changeColumns = e => {
    let num = Number(e.target.value);
    if (num > columns) {
      // add 5
      let arr = expandArray(grid.length);

      setGrid(grid.slice().concat(arr));
    } else {
      // substract 5
      let newGrid = grid.slice(0, grid.length - 5);
      setGrid(newGrid);
    }
    setColumns(num);
  };

  const changeRows = e => {
    let num = Number(e.target.value);
    if (num > rows) {
      let arr = expandArray(grid.length);
      setGrid(grid.slice().concat(arr));
    } else {
      setGrid(grid.slice(0, grid.length - 5));
    }
    setRows(num);
  };

  return (
    <>
      <Container>
        <Main>
          <GridContainer>
            <Grid
              style={{
                gridTemplateColumns: `repeat(${columns}, 1fr)`,
                gridTemplateRows: `repeat(${rows}, 1fr)`,
                columnGap: `${columnGap}px`,
                rowGap: `${rowGap}px`
              }}
            >
              {grid.map((_, rowIdx) => {
                return <Column key={rowIdx} />;
              })}
            </Grid>
          </GridContainer>
        </Main>
        <Aside>
          <label htmlFor="rows">Rows</label>
          <input
            type="number"
            name="rows"
            onChange={changeRows}
            value={rows}
            id="rows"
            max="12"
          />
          <label htmlFor="columns">Columns</label>
          <input
            type="number"
            name="columns"
            onChange={changeColumns}
            value={columns}
            id="columns"
            max="12"
          />
          <label htmlFor="column-gap">Column Gap (px)</label>
          <input
            type="number"
            name="column-gap"
            onChange={e => setColumnGap(Number(e.target.value))}
            value={columnGap}
            id="column-gap"
            min="0"
            max="15"
          />
          <label htmlFor="row-gap">Row Gap (px)</label>
          <input
            type="number"
            name="row-gap"
            onChange={e => setRowGap(Number(e.target.value))}
            value={rowGap}
            id="row-gap"
            min="0"
            max="15"
          />
        </Aside>
      </Container>
    </>
  );
};

export default IndexPage;

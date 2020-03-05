import React, { useState, useRef, useEffect } from "react";
import styled from "@emotion/styled";
import Column from "../components/column";
import Button from "../components/button";
import Modal from "../components/modal";
import Code from "../components/code";

const Container = styled.div`
  display: flex;
  justify-content: space-around;
`;

const Flex = styled.div`
  display: flex;
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
`;

const Fieldset = styled.fieldset`
  display: flex;
  flex-direction: column;
  border: 0;
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
  const [show, setShow] = useState(false);
  const [copyStatus, setCopyStatus] = useState("");
  const codeRef = useRef(null);

  const changeColumns = e => {
    let num = Number(e.target.value);
    if (num > columns) {
      let arr = expandArray(grid.length);
      setGrid(grid.slice().concat(arr));
    } else {
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

  const showModal = () => {
    setShow(true);
  };

  const hideModal = () => {
    setShow(false);
  };

  function copyToClipboard() {
    let text = codeRef.current.textContent;
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopyStatus("Copied 👍");
      })
      .catch(() => {
        setCopyStatus("Failed 💩");
      });
  }

  useEffect(() => {
    setTimeout(() => {
      setCopyStatus("");
    }, 750);
  }, [copyStatus]);

  let gridStyles = {
    gridTemplateColumns: `repeat(${columns}, 1fr)`,
    gridTemplateRows: `repeat(${rows}, 1fr)`,
    columnGap: `${columnGap}px`,
    rowGap: `${rowGap}px`
  };

  return (
    <>
      <Modal show={show} setCopyStatus={setCopyStatus} handleClose={hideModal}>
        {copyStatus ? (
          <Flex>
            <h4>{copyStatus}</h4>
          </Flex>
        ) : (
          <Code codeRef={codeRef} gridStyles={gridStyles} />
        )}
        <Flex>
          <Button small text={"Copy Code"} handleClick={copyToClipboard} />
        </Flex>
      </Modal>
      <Container>
        <Main>
          <GridContainer>
            <Grid style={gridStyles}>
              {grid.map((_, rowIdx) => {
                return <Column key={rowIdx} />;
              })}
            </Grid>
          </GridContainer>
        </Main>
        <Aside>
          <Fieldset>
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

            <Button handleClick={showModal} text={"Generate Code"} />
          </Fieldset>
        </Aside>
      </Container>
    </>
  );
};

export default IndexPage;

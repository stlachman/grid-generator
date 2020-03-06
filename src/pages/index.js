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

const InputGrid = styled.section`
  display: grid;
`;

const InputRow = styled.section`
  display: grid;
  height: 100%;
  position: relative;
  left: -30px;
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
  const [rows, setRows] = useState(["1fr", "1fr", "1fr", "1fr", "1fr"]);
  const [columns, setColumns] = useState(["1fr", "1fr", "1fr", "1fr", "1fr"]);
  const [columnGap, setColumnGap] = useState(0);
  const [rowGap, setRowGap] = useState(0);
  const [show, setShow] = useState(false);
  const [copyStatus, setCopyStatus] = useState("");
  const codeRef = useRef(null);

  const changeColumns = e => {
    let num = Number(e.target.value);
    if (num > columns.length) {
      let arr = expandArray(grid.length);
      setGrid(grid.slice().concat(arr));
      setColumns([...columns, "1fr"]);
    } else {
      setGrid(grid.slice(0, grid.length - 5));
      setColumns(columns.slice(0, -1));
    }
  };

  const changeRows = e => {
    let num = Number(e.target.value);
    if (num > rows.length) {
      let arr = expandArray(grid.length);
      setGrid(grid.slice().concat(arr));
      setRows([...rows, "1fr"]);
    } else {
      setGrid(grid.slice(0, grid.length - 5));
      setRows(rows.slice(0, -1));
    }
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

  function determineGrid(item) {
    let styles = [];
    let hash = {};
    for (let style of item) {
      if (hash[style]) {
        hash[style]++;
      } else {
        hash[style] = 1;
      }
    }
    for (let key in hash) {
      if (hash[key] > 1) {
        styles.push(`repeat(${hash[key]}, ${key})`);
      } else {
        styles.push(hash[key]);
      }
    }
    return styles.join(" ");
  }

  const updateColumnValue = (e, i) => {
    setColumns(
      columns.map((column, idx) => {
        if (idx === i) {
          return e.target.value;
        } else {
          return column;
        }
      })
    );
  };

  const updateRowValue = (e, i) => {
    setRows(
      rows.map((row, idx) => {
        if (idx === i) {
          return e.target.value;
        } else {
          return row;
        }
      })
    );
  };

  let gridStyles = {
    gridTemplateColumns: determineGrid(columns),
    gridTemplateRows: determineGrid(rows),
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
          <InputGrid
            style={{ gridTemplateColumns: gridStyles.gridTemplateColumns }}
          >
            {columns.map((column, i) => (
              <input
                key={i}
                style={{ maxWidth: 20 }}
                type="text"
                onChange={e => updateColumnValue(e, i)}
                name="column-value"
                id="column-value"
                value={column}
              />
            ))}
          </InputGrid>
          <GridContainer>
            <Grid style={gridStyles}>
              {grid.map((_, rowIdx) => {
                return <Column key={rowIdx} />;
              })}
            </Grid>
            <InputRow style={{ gridTemplateRows: gridStyles.gridTemplateRows }}>
              {rows.map((row, i) => (
                <input
                  key={i}
                  style={{ maxWidth: 20 }}
                  type="text"
                  onChange={e => updateRowValue(e, i)}
                  name="row-value"
                  id="row-value"
                  value={row}
                />
              ))}
            </InputRow>
          </GridContainer>
        </Main>
        <Aside>
          <Fieldset>
            <label htmlFor="rows">Rows</label>
            <input
              type="number"
              name="rows"
              onChange={changeRows}
              value={Number(rows.length)}
              id="rows"
              min="1"
              max="12"
            />
            <label htmlFor="columns">Columns</label>
            <input
              type="number"
              name="columns"
              onChange={changeColumns}
              value={Number(columns.length)}
              id="columns"
              min="1"
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

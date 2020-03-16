import React, { useState, useRef, useEffect, useReducer } from "react";
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
  margin-bottom: 10px;
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

const initialState = {
  rows: [
    { unit: "1fr" },
    { unit: "1fr" },
    { unit: "1fr" },
    { unit: "1fr" },
    { unit: "1fr" }
  ],
  columns: [
    { unit: "1fr" },
    { unit: "1fr" },
    { unit: "1fr" },
    { unit: "1fr" },
    { unit: "1fr" }
  ],
  columnNumber: 5,
  rowNumber: 5,
  grid: [...Array(25).keys()],
  columnGap: 0,
  rowGap: 0
};

function reducer(state, action) {
  switch (action.type) {
    case "updateRowGap":
      return { ...state, rowGap: action.payload };
    case "updateColumnGap":
      return { ...state, columnGap: action.payload };
    case "addColumn":
      return {
        ...state,
        columnNumber: state.columnNumber + 1,
        columns: [...state.columns, { unit: "1fr" }],
        grid: [...state.grid, ...expandArray(state.grid.length)]
      };
    case "removeColumn":
      return {
        ...state,
        columnNumber: state.columnNumber - 1,
        columns: state.columns.slice(0, -1),
        grid: state.grid.slice(0, -5)
      };
    case "addRow":
      return {
        ...state,
        rowNumber: state.rowNumber + 1,
        rows: [...state.rows, { unit: "1fr" }],
        grid: [...state.grid, ...expandArray(state.grid.length)]
      };
    case "removeRow":
      return {
        ...state,
        rowNumber: state.rowNumber - 1,
        rows: state.rows.slice(0, -1),
        grid: state.grid.slice(0, -5)
      };
    case "updateColumnValue":
      return {
        ...state,
        columns: state.columns.map((column, idx) => {
          if (idx === action.payload.index) {
            return { unit: action.payload.unit };
          } else {
            return column;
          }
        })
      };
    case "updateRowValue":
      return {
        ...state,
        rows: state.rows.map((row, idx) => {
          if (idx === action.payload.index) {
            return { unit: action.payload.unit };
          } else {
            return row;
          }
        })
      };
    default:
      return state;
  }
}

const IndexPage = () => {
  const [show, setShow] = useState(false);
  const [copyStatus, setCopyStatus] = useState("");
  const codeRef = useRef(null);

  const [state, dispatch] = useReducer(reducer, initialState);
  console.log(state.columns);
  const {
    grid,
    rowNumber,
    columnNumber,
    columns,
    rows,
    columnGap,
    rowGap
  } = state;

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

  const changeColumns = e => {
    let num = Number(e.target.value);
    if (num > columns.length) {
      dispatch({ type: "addColumn" });
    } else {
      dispatch({ type: "removeColumn" });
    }
  };

  const changeRows = e => {
    let num = Number(e.target.value);
    if (num > rows.length) {
      dispatch({ type: "addRow" });
    } else {
      dispatch({ type: "removeRow" });
    }
  };

  const updateColumnValue = (e, i) => {
    dispatch({
      type: "updateColumnValue",
      payload: { unit: e.target.value, index: i }
    });
  };

  const updateRowValue = (e, i) => {
    dispatch({
      type: "updateRowValue",
      payload: { unit: e.target.value, index: i }
    });
  };

  function determineGrid(item) {
    let styles = [];
    for (let { unit } of item) {
      if (unit.trim().length > 0) {
        styles.push(unit);
      }
    }
    return styles.join(" ");
  }

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
            {columns.map(({ unit }, i) => {
              return (
                <div
                  key={i}
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <input
                    style={{ maxWidth: 20 }}
                    type="text"
                    onBlur={e => updateColumnValue(e, i)}
                    name="column-value"
                    id="column-value"
                    defaultValue={"1fr"}
                  />
                </div>
              );
            })}
          </InputGrid>
          <GridContainer>
            <Grid style={gridStyles}>
              {grid.map((_, rowIdx) => {
                return <Column key={rowIdx} />;
              })}
            </Grid>
            <InputRow style={{ gridTemplateRows: gridStyles.gridTemplateRows }}>
              {rows.map(({ unit }, i) => (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center"
                  }}
                  key={i}
                >
                  <input
                    style={{ maxWidth: 20 }}
                    type="text"
                    onChange={e => updateRowValue(e, i)}
                    name="row-value"
                    id="row-value"
                    value={unit}
                  />
                </div>
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
              onChange={e =>
                dispatch({
                  type: "updateColumnGap",
                  payload: Number(e.target.value)
                })
              }
              value={columnGap}
              id="column-gap"
              min="0"
              max="15"
            />
            <label htmlFor="row-gap">Row Gap (px)</label>
            <input
              type="number"
              name="row-gap"
              onChange={e =>
                dispatch({
                  type: "updateRowGap",
                  payload: Number(e.target.value)
                })
              }
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

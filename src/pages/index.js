import React, { useState, useRef, useEffect, useReducer } from "react";
import { expandArray, determineGrid } from "../utils/index";
import styled from "@emotion/styled";
import Layout from "../components/layout";
import Column from "../components/column";
import Button from "../components/button";
import Modal from "../components/modal";
import Code from "../components/code";
import Aside from "../components/aside";
import Input from "../components/input";

const FlexContainer = styled.div`
  display: flex;
  justify-content: ${({ justifyContent }) =>
    justifyContent ? justifyContent : "flex-start"};
  margin: ${({ margin }) => (margin ? margin : "0")};
`;

const InputGrid = styled.section`
  display: grid;
  margin-bottom: 10px;
`;

const Title = styled.h1`
  font-size: 2rem;
`;

const InputRow = styled.section`
  display: grid;
  height: 100%;
  position: relative;
  left: -50px;
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
  border: 1px dashed #1a202c;
  width: 100%;
  height: 100%;
  position: absolute;
`;

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
        grid: [...Array((state.columnNumber + 1) * state.rowNumber).keys()]
      };
    case "removeColumn":
      return {
        ...state,
        columnNumber: state.columnNumber - 1,
        columns: state.columns.slice(0, -1),
        grid: [...Array((state.columnNumber - 1) * state.rowNumber).keys()]
      };
    case "addRow":
      return {
        ...state,
        rowNumber: state.rowNumber + 1,
        rows: [...state.rows, { unit: "1fr" }],
        grid: [...Array(state.columnNumber * (state.rowNumber + 1)).keys()]
      };
    case "removeRow":
      return {
        ...state,
        rowNumber: state.rowNumber - 1,
        rows: state.rows.slice(0, -1),
        grid: [...Array(state.columnNumber * (state.rowNumber - 1)).keys()]
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
  const {
    grid,
    rowNumber,
    columnNumber,
    columns,
    rows,
    columnGap,
    rowGap
  } = state;
  console.log(grid);

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
    let currentColumns = Number(e.target.value);
    if (currentColumns > columns.length) {
      dispatch({ type: "addColumn" });
    } else {
      dispatch({ type: "removeColumn" });
    }
  };

  const changeRows = e => {
    let currentRows = Number(e.target.value);
    if (currentRows > rows.length) {
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

  const updateRowGap = e => {
    dispatch({
      type: "updateRowGap",
      payload: Number(e.target.value)
    });
  };

  const updateColumnGap = e => {
    dispatch({
      type: "updateColumnGap",
      payload: Number(e.target.value)
    });
  };

  let gridStyles = {
    gridTemplateColumns: determineGrid(columns),
    gridTemplateRows: determineGrid(rows),
    columnGap: `${columnGap}px`,
    rowGap: `${rowGap}px`
  };

  return (
    <Layout>
      <Modal show={show} setCopyStatus={setCopyStatus} handleClose={hideModal}>
        {copyStatus ? (
          <FlexContainer justifyContent="center">
            <h4>{copyStatus}</h4>
          </FlexContainer>
        ) : (
          <Code codeRef={codeRef} gridStyles={gridStyles} />
        )}
        <FlexContainer>
          <Button small text={"Copy Code"} handleClick={copyToClipboard} />
        </FlexContainer>
      </Modal>
      <FlexContainer justifyContent="center" margin="0 0 2rem 0">
        <Title>CSS Grid Generator</Title>
      </FlexContainer>
      <FlexContainer justifyContent={"space-around"}>
        <Main>
          <InputGrid
            style={{ gridTemplateColumns: gridStyles.gridTemplateColumns }}
          >
            {columns.map((_, i) => {
              return (
                <Input
                  key={i}
                  type={"column"}
                  updateValue={updateColumnValue}
                  index={i}
                />
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
              {rows.map((_, i) => (
                <Input
                  key={i}
                  type="row"
                  updateValue={updateRowValue}
                  index={i}
                />
              ))}
            </InputRow>
          </GridContainer>
        </Main>

        <Aside
          changeRows={changeRows}
          rowNumber={rowNumber}
          changeColumns={changeColumns}
          columnNumber={columnNumber}
          columnGap={columnGap}
          rowGap={rowGap}
          updateColumnGap={updateColumnGap}
          updateRowGap={updateRowGap}
          showModal={showModal}
        />
      </FlexContainer>
    </Layout>
  );
};

export default IndexPage;

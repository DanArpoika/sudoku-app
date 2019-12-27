import React, { useState, useEffect, useRef } from 'react';
import styled, { css } from 'styled-components';
import { position, size, rem, rgba } from 'polished';

const DOWN = 40;
const UP = 38;
const LEFT = 37;
const RIGHT = 39;

const BoardWrap = styled.div`
  position: relative;
  max-width: 66vh;
  margin: 40px auto;

  &::before {
    ${position('absolute', -11, null, null, -11)};
    z-index: -1;
    content: "";
    opacity: .25;
    width: calc(100% + 22px);
    height: calc(100% + 22px);
    border: 4px solid ${props => props.theme.mainAccent};
  }
`;

const BoardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(9, 1fr);
  grid-template-rows: repeat(9, 1fr);
  grid-gap: 10px;
  height: 66vh;
`;

const Cell = styled.input`
  ${size('100%')}
  border: 0;
  appearance: none;
  background-color: ${props => props.isValid ? props.theme.secondaryAccent : 'red'};
  opacity: ${props => props.hasValue ? 1 : 0.2};
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-weight: 800;
  font-size: ${rem(30)};
  color: ${props => props.theme.white};

  ${props => props.isIncorrect && css`
    background-color: red;
  `}

  &:hover {
    box-shadow: 0px 0px 10px 5px ${props => rgba(props.theme.mainAccent, .16)};
  }
`;

const Board = ({
  isActive,
  isPaused,
  show,
  isLoading,
  game = {},
  onWin = () => {},
}) => {

  const boardRef = useRef();
  const [rows, setRows] = useState([]);
  const [focused, setFocus] = useState([0, 0]);

  const generateArray = (matrix) => {
    if (!matrix || matrix.length < 1) return [];

    const rows = [];
    let count = 0;
    // 00 01 02 03 04 05 06 07 08 09
    // 10 11 12 13 14 15 16 17 18 19
    // 20 21 22 23 24 25 26 27 28 29

    for (let i = 0; i < 9; i++) {
      rows[i] = [];

      for (let j = 0; j < 9; j++) {
        rows[i].push({
          pos: [i, j],
          value: matrix[count],
          isDisabled: matrix[count] !== 0,
          isValid: true,
        });

        count += 1;
      }
    }

    setRows(rows);
  }

  /**
   *
   * @param {object} e
   */
  const handleArrows = (e) => {
    if (!e.keyCode) return;
    if (e.keyCode < LEFT || e.keyCode > DOWN) return;

    const current = [...focused];
    let x = current[0];
    let y = current[1];

    switch (e.keyCode) {
      case DOWN:
        y += 1;
        if (y === 9) y = 0;
        break;
      case LEFT:
        x -= 1;
        if (x < 0) x = 8;
        break;
      case RIGHT:
        x += 1;
        if (x === 9) x = 0;
        break;
      case UP:
        y -= 1;
        if (y < 0) y = 8;
        break;
      default:
    }

    const index = (x) + (y * 9);
    const cellToFocus = boardRef.current.childNodes[index];

    if (!cellToFocus) return;

    cellToFocus.focus();
    setFocus([x, y]);
  };

  useEffect (() => {
    if (!game) return;

    if (rows.length < 1) {
      generateArray(game.matrix);
    }

    window.addEventListener('keydown', handleArrows);

    return (() => {
      window.removeEventListener('keydown', handleArrows);
    });
  })

  useEffect (() => {
    if (!game) return;

    generateArray(game.matrix);
  }, [game])

  const checkWin = (rows) => {
    // const matrix = [];

    // for (let i = 0; i < rows.length; i++) {
    //   for (let j = 0; j < rows[i].length; j++) {
    //     matrix.push(rows[i][j].value);
    //   }
    // }

    if (game.gameFinished()) {
      onWin();
    }
  }

  /**
   * Handle the input change for a sudoku cell.
   *
   * @param {integer} x X coordinate
   * @param {integer} y Y coordinate
   * @param {object} e The on change event.
   */
  const handleInput = (x, y, e) => {
    if (!e.target) return;

    const { value } = e.target;

    if (value.length > 1) return;

    if (value !== '' && !/^[1-9]/g.test(value)) {
      return;
    }

    const copyRows = [...rows];

    copyRows[x][y].value = value;
    copyRows[x][y].isIncorrect = !game.checkVal(x, y, value);

    if (value === '') copyRows[x][y].isIncorrect = false;

    if (game.level === 0) {
      const matrixValue = game.save[(y) + (x * 9)];

      if (value != matrixValue) {
        copyRows[x][y].isIncorrect = true;
      }
    }

    if (game.level > 0) copyRows[x][y].isIncorrect = false;

    game.setVal(x, y, parseInt(value, 10));
    console.log(game)
    setRows(copyRows);

    checkWin(copyRows);
  }

  if (!show || !game || game.matrix.length < 1) return null;

  return (
    <BoardWrap>
      <BoardGrid ref={boardRef}>
        {rows.map((row, rowIndex) => (
          row.map((cell, cellIndex) => (
            <Cell
              onFocus={() => setFocus([cellIndex, rowIndex])}
              onChange={(e) => handleInput(rowIndex, cellIndex, e)}
              hasValue={cell.value !== 0}
              value={cell.value === 0 || isPaused ? '' : cell.value}
              isValid={cell.isValid}
              disabled={isPaused || (isActive || cell.isDisabled)}
              isIncorrect={cell.isIncorrect}
              isPaused={isPaused}
            />
          ))
        ))}
      </BoardGrid>
    </BoardWrap>
  )
};

export default Board;

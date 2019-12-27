import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Button from './Button';
import sec2time from '../util/sec2time';

const Wrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  * {
    margin-right: 12px;
  }
`;

const Controls = ({
  show,
  seconds = 0,
  onNewGame = () => {},
}) => {
  if (!show) return null;

  return (
    <Wrap>
      <div>
        <Button onClick={onNewGame}>New Game</Button>
      </div>

      <time>{sec2time(seconds)}</time>
    </Wrap>
  );
};

export default Controls;
